import {Audio} from '@remotion/media';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/tokens';

const exterior=staticFile('generated/costco-short/costco-exterior.jpg');

const captionCues = [
  [0, 120, 'You already paid at Costco.'],
  [120, 240, 'The cashier scanned everything. Your card went through.'],
  [240, 360, 'So why are you stopped again at the door?'],
  [360, 480, 'Most people assume theft.'],
  [480, 660, "Costco's own explanation is different."],
  [660, 900, 'The receipt check verifies processing, inventory, and your bill.'],
  [900, 1080, 'Missed item: your bill is low, but inventory is wrong.'],
  [1080, 1260, 'Double scan: inventory may be fine, but you overpaid.'],
  [1260, 1440, 'That tiny checkpoint catches mismatches before both sides leave.'],
  [1440, 1620, "At Costco's scale, accuracy matters."],
  [1620, 1740, 'A tiny control point inside a massive inventory and membership machine.'],
  [1740, 1800, "That's Behind the Price."],
] as const;

const EASE={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

const Grid: React.FC=()=>(
  <AbsoluteFill style={{
    backgroundColor:colors.ink,
    backgroundImage:
      'linear-gradient(rgba(244,245,240,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(244,245,240,.035) 1px, transparent 1px)',
    backgroundSize:'72px 72px',
  }}/>
);

const CaptionTrack:React.FC=()=>{
  const f=useCurrentFrame();
  const cue=captionCues.find(([start,end])=>f>=start&&f<end);
  if(!cue) return null;
  return <div style={{
    position:'absolute',left:34,right:34,bottom:72,zIndex:20,
    display:'flex',justifyContent:'center',pointerEvents:'none'
  }}>
    <div style={{
      maxWidth:930,padding:'14px 20px',borderRadius:16,
      background:'rgba(9,12,11,.72)',backdropFilter:'blur(10px)',
      border:'1px solid rgba(244,245,240,.10)',
      fontFamily:fonts.sans,fontSize:32,lineHeight:1.18,fontWeight:700,
      color:colors.paper,textAlign:'center',textShadow:'0 2px 12px rgba(0,0,0,.35)'
    }}>{cue[2]}</div>
  </div>;
};

const TransitionSweep:React.FC<{frameAt:number}>=({frameAt})=>{
  const f=useCurrentFrame();
  const local=f-frameAt;
  if(local<-10||local>16) return null;
  const x=interpolate(local,[-10,4,16],[-120,0,120],EASE);
  return <AbsoluteFill style={{zIndex:30,pointerEvents:'none',overflow:'hidden'}}>
    <div style={{
      position:'absolute',top:0,bottom:0,left:`${x}%`,width:'38%',
      background:'linear-gradient(90deg,transparent 0%,rgba(22,242,139,.16) 40%,rgba(22,242,139,.72) 50%,rgba(244,245,240,.12) 57%,transparent 100%)',
      transform:'skewX(-12deg)',
      filter:'blur(2px)'
    }}/>
  </AbsoluteFill>;
};

const Flash: React.FC<{frameAt:number}>=({frameAt})=>{
  const f=useCurrentFrame();
  const opacity=interpolate(f,[frameAt-2,frameAt,frameAt+5],[0,.35,0],EASE);
  return <AbsoluteFill style={{background:colors.gold,opacity,mixBlendMode:'screen'}}/>;
};

const BigText:React.FC<{kicker?:string;children:React.ReactNode;sub?:string;center?:boolean}>=({kicker,children,sub,center=false})=>{
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({fps,frame:f,config:{damping:16,mass:.68}});
  return <div style={{
    width:'100%',display:'flex',flexDirection:'column',gap:22,
    alignItems:center?'center':'flex-start',
    transform:`translateY(${(1-p)*28}px)`,opacity:p,
  }}>
    {kicker?<div style={{fontFamily:fonts.sans,fontSize:28,fontWeight:800,letterSpacing:5,color:colors.gold,textTransform:'uppercase'}}>{kicker}</div>:null}
    <div style={{fontFamily:fonts.serif,fontSize:96,lineHeight:.98,fontWeight:700,color:colors.paper,textAlign:center?'center':'left',textShadow:'0 10px 50px rgba(0,0,0,.35)'}}>{children}</div>
    {sub?<div style={{fontFamily:fonts.sans,fontSize:37,lineHeight:1.25,color:colors.paperMuted,fontWeight:500,textAlign:center?'center':'left'}}>{sub}</div>:null}
  </div>;
};

const Hook:React.FC=()=>{
  const f=useCurrentFrame();
  const zoom=interpolate(f,[0,210],[1.04,1.18],EASE);
  const dark=interpolate(f,[0,70],[.18,.63],EASE);
  return <AbsoluteFill style={{overflow:'hidden',background:colors.ink}}>
    <Img src={exterior} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${zoom})`,filter:'saturate(.82) contrast(1.06)'}}/>
    <AbsoluteFill style={{background:`linear-gradient(180deg,rgba(9,12,11,${dark*.35}),rgba(9,12,11,${dark}) 62%,rgba(9,12,11,.92))`}}/>
    <AbsoluteFill style={{padding:'190px 72px 150px',justifyContent:'flex-end'}}>
      <BigText kicker="BEHIND THE PRICE" sub="You paid. The cashier scanned everything. So why another check?">
        WHY DOES<br/><span style={{color:colors.gold}}>COSTCO</span><br/>STOP YOU?
      </BigText>
    </AbsoluteFill>
    <div style={{position:'absolute',right:24,bottom:24,fontFamily:fonts.sans,fontSize:16,color:'rgba(244,245,240,.65)'}}>
      Photo: Ambrosia LaFluer · CC BY 2.0
    </div>
  </AbsoluteFill>;
};

const TheftTurn:React.FC=()=>{
  const f=useCurrentFrame();
  const strike=interpolate(f,[36,60],[0,1],EASE);
  return <AbsoluteFill style={{padding:70,justifyContent:'center'}}>
    <Grid/>
    <div style={{zIndex:2}}>
      <BigText kicker="THE OBVIOUS ANSWER" center>
        <span style={{position:'relative',display:'inline-block'}}>
          THEFT
          <span style={{position:'absolute',left:'-4%',top:'52%',width:`${strike*108}%`,height:12,background:colors.crimson,transform:'rotate(-5deg)',borderRadius:10}}/>
        </span>
      </BigText>
      <div style={{marginTop:42,fontFamily:fonts.sans,fontSize:42,lineHeight:1.25,textAlign:'center',color:colors.paper}}>
        Costco's own explanation is <span style={{color:colors.gold,fontWeight:800}}>different.</span>
      </div>
    </div>
  </AbsoluteFill>;
};

const Official:React.FC=()=>{
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const items=[
    ['01','PROCESSING','Did checkout match the cart?'],
    ['02','INVENTORY','Did the system record what left?'],
    ['03','MEMBER BILL','Were you charged correctly?'],
  ];
  return <AbsoluteFill style={{padding:64,justifyContent:'center'}}>
    <Grid/>
    <div style={{zIndex:1,display:'flex',flexDirection:'column',gap:28}}>
      <div style={{fontFamily:fonts.sans,fontSize:24,letterSpacing:4,color:colors.gold,fontWeight:800}}>COSTCO'S STATED REASON</div>
      <div style={{fontFamily:fonts.serif,fontSize:72,lineHeight:1.02,color:colors.paper,fontWeight:700}}>A second check for<br/>accuracy.</div>
      <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:18}}>
        {items.map(([n,t,d],i)=>{
          const p=spring({fps,frame:f-i*10-8,config:{damping:17,mass:.7}});
          return <div key={t} style={{
            display:'grid',gridTemplateColumns:'86px 1fr',gap:18,alignItems:'center',
            padding:'22px 24px',borderRadius:20,border:`1px solid ${i===2?'rgba(22,242,139,.55)':colors.line}`,
            background:i===2?'rgba(22,242,139,.08)':colors.inkLift,
            transform:`translateX(${(1-p)*45}px)`,opacity:p
          }}>
            <div style={{fontFamily:fonts.serif,fontSize:46,color:colors.gold,fontWeight:700}}>{n}</div>
            <div>
              <div style={{fontFamily:fonts.sans,fontSize:27,color:colors.paper,fontWeight:800,letterSpacing:2}}>{t}</div>
              <div style={{fontFamily:fonts.sans,fontSize:26,color:colors.paperMuted,marginTop:5}}>{d}</div>
            </div>
          </div>;
        })}
      </div>
      <div style={{fontFamily:fonts.sans,fontSize:19,color:colors.paperMuted,marginTop:8}}>Source: Costco Customer Service · 2023</div>
    </div>
  </AbsoluteFill>;
};

const ErrorScene:React.FC=()=>{
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const l=spring({fps,frame:f-4,config:{damping:17,mass:.75}});
  const r=spring({fps,frame:f-14,config:{damping:17,mass:.75}});
  const Card=({p,title,icon,top,bottom,bad}:{p:number;title:string;icon:string;top:string;bottom:string;bad:string})=><div style={{
    flex:1,minHeight:650,padding:'34px 30px',borderRadius:28,background:colors.inkLift,border:`1px solid ${colors.line}`,
    transform:`translateY(${(1-p)*34}px)`,opacity:p,display:'flex',flexDirection:'column',gap:24
  }}>
    <div style={{fontSize:82}}>{icon}</div>
    <div style={{fontFamily:fonts.sans,fontSize:28,fontWeight:800,letterSpacing:2,color:colors.gold}}>{title}</div>
    <div style={{fontFamily:fonts.serif,fontSize:42,lineHeight:1.08,color:colors.paper,fontWeight:650}}>{top}</div>
    <div style={{height:2,background:colors.line}}/>
    <div style={{fontFamily:fonts.sans,fontSize:27,lineHeight:1.28,color:colors.paperMuted}}>{bottom}</div>
    <div style={{marginTop:'auto',padding:'15px 18px',borderRadius:14,background:'rgba(255,94,99,.10)',fontFamily:fonts.sans,fontSize:25,color:'#FFB2B5',fontWeight:700}}>{bad}</div>
  </div>;
  return <AbsoluteFill style={{padding:56,justifyContent:'center'}}>
    <Grid/>
    <div style={{zIndex:1}}>
      <div style={{fontFamily:fonts.serif,fontSize:58,fontWeight:700,color:colors.paper,marginBottom:28}}>One tiny error. Two different problems.</div>
      <div style={{display:'flex',gap:18}}>
        <Card p={l} title="MISSED ITEM" icon="📦" top="Leaves the warehouse." bottom="Your bill is low." bad="Inventory still says: INSIDE"/>
        <Card p={r} title="DOUBLE SCAN" icon="🧾" top="Counted twice at checkout." bottom="Inventory may be fine." bad="Member paid: TOO MUCH"/>
      </div>
    </div>
  </AbsoluteFill>;
};

const Scale:React.FC=()=>{
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const metrics=[
    ['$297.2B','NET SALES'],
    ['84.1M','PAID MEMBERS'],
    ['92.3%','U.S./CANADA RENEWAL'],
  ];
  return <AbsoluteFill style={{padding:58,justifyContent:'center'}}>
    <Grid/>
    <div style={{zIndex:1}}>
      <div style={{fontFamily:fonts.sans,fontSize:26,letterSpacing:4,color:colors.gold,fontWeight:800,marginBottom:18}}>WHY ACCURACY MATTERS</div>
      <div style={{fontFamily:fonts.serif,fontSize:70,lineHeight:1,color:colors.paper,fontWeight:700,marginBottom:34}}>At Costco's scale,<br/>small errors aren't small.</div>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {metrics.map(([v,l],i)=>{
          const p=spring({fps,frame:f-i*11-8,config:{damping:16,mass:.72}});
          return <div key={l} style={{
            display:'flex',justifyContent:'space-between',alignItems:'center',
            padding:'27px 28px',borderRadius:20,
            background:i===0?'rgba(22,242,139,.09)':colors.inkLift,
            border:`1px solid ${i===0?'rgba(22,242,139,.46)':colors.line}`,
            transform:`scale(${.94+.06*p})`,opacity:p
          }}>
            <div style={{fontFamily:fonts.serif,fontSize:60,fontWeight:700,color:i===0?colors.gold:colors.paper}}>{v}</div>
            <div style={{fontFamily:fonts.sans,fontSize:24,fontWeight:800,color:colors.paperMuted,letterSpacing:2,textAlign:'right',maxWidth:380}}>{l}</div>
          </div>;
        })}
      </div>
      <div style={{fontFamily:fonts.sans,fontSize:18,color:colors.paperMuted,marginTop:22}}>Costco FY2026 · Source: SEC Form 10-K</div>
    </div>
  </AbsoluteFill>;
};

const Payoff:React.FC=()=>{
  const f=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=spring({fps,frame:f,config:{damping:17,mass:.7}});
  return <AbsoluteFill style={{padding:64,justifyContent:'center'}}>
    <Grid/>
    <div style={{zIndex:1,transform:`scale(${.93+.07*p})`,opacity:p}}>
      <div style={{fontFamily:fonts.sans,fontSize:24,letterSpacing:5,color:colors.gold,fontWeight:800}}>THE PRICE BEHIND THE RITUAL</div>
      <div style={{fontFamily:fonts.serif,fontSize:82,lineHeight:1.0,color:colors.paper,fontWeight:700,marginTop:22}}>
        Not just a guard.<br/>
        A <span style={{color:colors.gold}}>control point.</span>
      </div>
      <div style={{fontFamily:fonts.sans,fontSize:34,lineHeight:1.32,color:colors.paperMuted,marginTop:30}}>
        Transaction accuracy.<br/>Inventory accuracy.<br/>Member trust.
      </div>
      <div style={{marginTop:70,fontFamily:fonts.sans,fontSize:27,fontWeight:800,letterSpacing:4,color:colors.paper}}>BEHIND THE PRICE</div>
      <div style={{fontFamily:fonts.sans,fontSize:22,color:colors.paperMuted,marginTop:8}}>What it costs. Who pays. Why it works.</div>
    </div>
  </AbsoluteFill>;
};

export const CostcoShort:React.FC=()=>{
  return <AbsoluteFill style={{background:colors.ink}}>
    <Sequence from={0} durationInFrames={210}><Hook/></Sequence>
    <Sequence from={210} durationInFrames={210}><TheftTurn/></Sequence>
    <Sequence from={420} durationInFrames={360}><Official/></Sequence>
    <Sequence from={780} durationInFrames={390}><ErrorScene/></Sequence>
    <Sequence from={1170} durationInFrames={390}><Scale/></Sequence>
    <Sequence from={1560} durationInFrames={240}><Payoff/></Sequence>

    <Audio src={staticFile('generated/costco-short/narration.m4a')} volume={1}/>
    <Audio src={staticFile('generated/costco-short/bed.wav')} volume={0.24} loop/>
    {[0,210,420,780,1170,1560].map((at,i)=>(
      <Sequence key={at} from={at} durationInFrames={20}>
        <Audio src={staticFile(i===0?'generated/costco-short/impact.wav':'generated/costco-short/whoosh.wav')} volume={i===0?.7:.28}/>
      </Sequence>
    ))}
    {[360,730,1120,1515].map((at)=>(
      <Sequence key={at} from={at} durationInFrames={10}>
        <Audio src={staticFile('generated/costco-short/click.wav')} volume={0.32}/>
      </Sequence>
    ))}
    <CaptionTrack/>
    {[210,420,780,1170,1560].map((at)=><TransitionSweep key={at} frameAt={at}/>)}
    <Flash frameAt={210}/><Flash frameAt={420}/><Flash frameAt={780}/><Flash frameAt={1170}/>
  </AbsoluteFill>;
};
