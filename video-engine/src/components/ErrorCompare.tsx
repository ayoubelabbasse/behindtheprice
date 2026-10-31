import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme/tokens';
import {fonts} from '../theme/fonts';

const Panel: React.FC<{side:'left'|'right'; title:string; body:string; result:string; delay:number}> = ({title,body,result,delay}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const enter=spring({fps, frame:frame-delay, config:{damping:16,mass:.75}});
  return <div style={{
    flex:1,padding:'38px 40px',borderRadius:22,background:colors.inkLift,
    border:`1px solid ${colors.line}`,opacity:enter,transform:`translateY(${(1-enter)*24}px)`,
    display:'flex',flexDirection:'column',gap:20,minHeight:360
  }}>
    <div style={{fontFamily:fonts.sans,fontSize:17,letterSpacing:3,textTransform:'uppercase',color:colors.gold,fontWeight:700}}>{title}</div>
    <div style={{fontFamily:fonts.serif,fontSize:38,lineHeight:1.15,color:colors.paper}}>{body}</div>
    <div style={{marginTop:'auto',fontFamily:fonts.sans,fontSize:25,lineHeight:1.3,color:colors.paperMuted,borderTop:`1px solid ${colors.line}`,paddingTop:18}}>{result}</div>
  </div>;
};

export const ErrorCompare: React.FC<{
  title?: string;
  left:{title:string;body:string;result:string};
  right:{title:string;body:string;result:string};
}> = ({title,left,right}) => (
  <div style={{display:'flex',flexDirection:'column',gap:32,width:'100%'}}>
    {title ? <div style={{fontFamily:fonts.serif,fontSize:56,fontWeight:650,color:colors.paper}}>{title}</div> : null}
    <div style={{display:'flex',gap:28,width:'100%'}}>
      <Panel side="left" {...left} delay={2}/>
      <Panel side="right" {...right} delay={10}/>
    </div>
  </div>
);
