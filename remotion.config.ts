/**
 * CLI-only Remotion settings. Node APIs ignore this file.
 * https://www.remotion.dev/docs/config
 */
import {Config} from '@remotion/cli/config';

Config.setEntryPoint('./video-engine/src/index.ts');
Config.setPublicDir('./public');
Config.setRspack(true);
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setAudioCodec('aac');
Config.setAudioBitrate('320k');
