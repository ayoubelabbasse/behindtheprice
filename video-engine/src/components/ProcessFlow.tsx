import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme/tokens';
import {fonts} from '../theme/fonts';

export const ProcessFlow: React.FC<{
  title?: string;
  nodes: Array<{label: string; detail?: string}>;
}> = ({title, nodes}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display:'flex', flexDirection:'column', gap:42, width:'100%'}}>
      {title ? <div style={{
        fontFamily: fonts.serif,
        color: colors.paper,
        fontSize: 54,
        fontWeight: 650,
      }}>{title}</div> : null}
      <div style={{display:'flex', alignItems:'stretch', width:'100%', gap:18}}>
        {nodes.map((node,index)=>{
          const enter=spring({fps, frame: frame-index*9, config:{damping:16,mass:.7}});
          return (
            <div key={node.label} style={{display:'contents'}}>
              <div style={{
                flex:1,
                minHeight:190,
                padding:'28px 24px',
                borderRadius:18,
                border:`1px solid ${index === nodes.length-1 ? colors.gold : colors.line}`,
                background:index === nodes.length-1 ? 'rgba(22,242,139,.09)' : colors.inkLift,
                opacity:enter,
                transform:`translateY(${(1-enter)*22}px)`,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                gap:12,
              }}>
                <div style={{fontFamily:fonts.sans,fontSize:17,letterSpacing:3,color:colors.gold,fontWeight:700}}>
                  {String(index+1).padStart(2,'0')}
                </div>
                <div style={{fontFamily:fonts.serif,fontSize:36,lineHeight:1.05,color:colors.paper,fontWeight:620}}>
                  {node.label}
                </div>
                {node.detail ? <div style={{fontFamily:fonts.sans,fontSize:20,lineHeight:1.35,color:colors.paperMuted}}>
                  {node.detail}
                </div> : null}
              </div>
              {index < nodes.length-1 ? <div style={{
                width:34,display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:fonts.sans,fontSize:38,color:colors.gold,opacity:interpolate(frame,[index*9+10,index*9+22],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})
              }}>→</div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
