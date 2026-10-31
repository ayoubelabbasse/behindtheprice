import {execFile, spawn} from 'node:child_process';
import {promisify} from 'node:util';
import {access} from 'node:fs/promises';
import {constants} from 'node:fs';

const execFileAsync = promisify(execFile);

const runWithStdin = (file: string, args: string[], input: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args);
    child.stdin.write(input);
    child.stdin.end();
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${file} exited with code ${code}`));
    });
  });
};

export type TtsProvider = 'macos-say' | 'piper';

export type TtsRequest = {
  text: string;
  outPath: string;
  voice?: string;
  rate?: number;
};

export type TtsResult = {
  path: string;
  provider: TtsProvider;
};

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const which = async (binary: string): Promise<string | null> => {
  try {
    const {stdout} = await execFileAsync('which', [binary]);
    const found = stdout.trim();
    return found.length > 0 ? found : null;
  } catch {
    return null;
  }
};

export const detectTtsProvider = async (): Promise<TtsProvider> => {
  if (process.platform === 'darwin' && (await which('say'))) {
    return 'macos-say';
  }

  if (await which('piper')) {
    return 'piper';
  }

  throw new Error(
    'No local TTS provider found. Install macOS `say` (default on macOS) or Piper.',
  );
};

const synthesizeWithSay = async (request: TtsRequest): Promise<TtsResult> => {
  const args = ['-o', request.outPath];

  if (request.voice) {
    args.push('-v', request.voice);
  }

  if (request.rate) {
    args.push('-r', String(request.rate));
  }

  args.push(request.text);
  await execFileAsync('say', args);

  return {path: request.outPath, provider: 'macos-say'};
};

const synthesizeWithPiper = async (request: TtsRequest): Promise<TtsResult> => {
  const piper = await which('piper');
  if (!piper) {
    throw new Error('Piper is not installed on PATH.');
  }

  await runWithStdin(piper, ['--output_file', request.outPath], request.text);

  return {path: request.outPath, provider: 'piper'};
};

export const synthesizeSpeech = async (
  request: TtsRequest,
  provider?: TtsProvider,
): Promise<TtsResult> => {
  if (!request.text.trim()) {
    throw new Error('TTS text is empty.');
  }

  const selected = provider ?? (await detectTtsProvider());
  const result =
    selected === 'macos-say'
      ? await synthesizeWithSay(request)
      : await synthesizeWithPiper(request);

  if (!(await fileExists(result.path))) {
    throw new Error(`TTS finished but the output file is missing: ${result.path}`);
  }

  return result;
};
