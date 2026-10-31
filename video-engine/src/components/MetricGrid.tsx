import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme/tokens';
import {fonts} from '../theme/fonts';

export const MetricGrid: React.FC<{
  title?: string;
  metrics:Array<{value:string;label:string;detail?:string}>;
}> = ({title,metrics}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  return <div style={{display:'flex',flexDirection:'column',gap:30,width:'100%'}}>
    {title ? <div style={{fontFamily:fonts.serif,fontSize:54,fontWeight:650,color:colors.paper}}>{title}</div> : null}
    <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:18}}>
      {metrics.map((m,i)=>{
        const enter=spring({fps,frame:frame-i*7,config:{damping:17,mass:.7}});
        return <div key={m.label} style={{
          background: i===0 ? 'rgba(22,242,139,.08)' : colors.inkLift,
          border:`1px solid ${i===0 ? 'rgba(22,242,139,.38)' : colors.line}`,
          borderRadius:20,padding:'28px 32px',minHeight:180,
          opacity:enter,transform:`translateY(${(1-enter)*18}px)`
        }}>
          <div style={{fontFamily:fonts.serif,fontSize:58,fontWeight:700,color:i===0?colors.gold:colors.paper,lineHeight:1}}>{m.value}</div>
          <div style={{fontFamily:fonts.sans,fontSize:23,color:colors.paper,marginTop:12,fontWeight:600}}>{m.label}</div>
          {m.detail ? <div style={{fontFamily:fonts.sans,fontSize:18,color:colors.paperMuted,marginTop:8,lineHeight:1.35}}>{m.detail}</div> : null}
        </div>
      })}
    </div>
  </div>;
};
