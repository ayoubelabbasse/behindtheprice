import {execFileSync} from 'node:child_process';
import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root=process.cwd();
const out=resolve(root,'public/generated/costco-short');
mkdirSync(out,{recursive:true});

const narrationPath=resolve(root,'episodes/001-costco-receipt/short-narration.txt');

const exteriorPath=resolve(out,'costco-exterior.jpg');
const exteriorUrl='https://upload.wikimedia.org/wikipedia/commons/5/57/Costco_Exterior.jpg';
const imageResponse=await fetch(exteriorUrl);
if(!imageResponse.ok) throw new Error(`Failed to download Costco exterior: ${imageResponse.status}`);
writeFileSync(exteriorPath,Buffer.from(await imageResponse.arrayBuffer()));
const aiff=resolve(out,'narration.aiff');
const m4a=resolve(out,'narration.m4a');

const voices=execFileSync('say',['-v','?'],{encoding:'utf8'});
const voice=['Ava','Samantha','Daniel'].find((v)=>voices.includes(v)) ?? 'Samantha';

console.log(`Generating narration with macOS voice: ${voice}`);
execFileSync('say',['-v',voice,'-r','176','-o',aiff,'-f',narrationPath],{stdio:'inherit'});
execFileSync('afconvert',[aiff,m4a,'-f','m4af','-d','aac'],{stdio:'inherit'});
rmSync(aiff,{force:true});

const SR=44100;
const clamp=(n)=>Math.max(-1,Math.min(1,n));
const wav=(samples,path)=>{
  const dataSize=samples.length*2;
  const b=Buffer.alloc(44+dataSize);
  b.write('RIFF',0); b.writeUInt32LE(36+dataSize,4); b.write('WAVE',8);
  b.write('fmt ',12); b.writeUInt32LE(16,16); b.writeUInt16LE(1,20);
  b.writeUInt16LE(1,22); b.writeUInt32LE(SR,24); b.writeUInt32LE(SR*2,28);
  b.writeUInt16LE(2,32); b.writeUInt16LE(16,34); b.write('data',36);
  b.writeUInt32LE(dataSize,40);
  samples.forEach((v,i)=>b.writeInt16LE(Math.round(clamp(v)*32767),44+i*2));
  writeFileSync(path,b);
};

let seed=123456789;
const rand=()=>{seed=(1664525*seed+1013904223)>>>0; return seed/4294967296;};

const duration=62;
const bed=new Array(SR*duration);
for(let i=0;i<bed.length;i++){
  const t=i/SR;
  const breathe=0.55+0.45*Math.sin(2*Math.PI*t/8);
  const bass=Math.sin(2*Math.PI*55*t)*0.018 + Math.sin(2*Math.PI*82.5*t)*0.011;
  const air=(rand()*2-1)*0.0025*breathe;
  const tickPhase=t%2.0;
  const pulse=Math.exp(-tickPhase*7)*Math.sin(2*Math.PI*95*t)*0.012;
  bed[i]=bass+air+pulse;
}
wav(bed,resolve(out,'bed.wav'));

const makeFx=(seconds,fn,name)=>{
  const arr=new Array(Math.floor(SR*seconds));
  for(let i=0;i<arr.length;i++) arr[i]=fn(i/SR,seconds);
  wav(arr,resolve(out,name));
};
makeFx(.42,(t,d)=>{
  const e=Math.exp(-t*9);
  return Math.sin(2*Math.PI*(78-22*t/d)*t)*0.38*e + (rand()*2-1)*0.03*e;
},'impact.wav');
makeFx(.55,(t,d)=>{
  const x=t/d;
  const env=Math.sin(Math.PI*x);
  return (rand()*2-1)*0.12*env*(0.25+0.75*x);
},'whoosh.wav');
makeFx(.16,(t)=>{
  const e=Math.exp(-t*24);
  return Math.sin(2*Math.PI*1100*t)*0.15*e + Math.sin(2*Math.PI*180*t)*0.11*e;
},'click.wav');

console.log('Generated: costco-exterior.jpg, narration.m4a, bed.wav, impact.wav, whoosh.wav, click.wav');
