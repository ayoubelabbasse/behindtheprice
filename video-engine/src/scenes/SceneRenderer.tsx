import {AbsoluteFill, Sequence} from 'remotion';
import {
  AnimatedNumber,
  BackgroundFootage,
  Chart,
  Comparison,
  ErrorCompare,
  Headline,
  MetricGrid,
  NarrationTrack,
  PhotoStory,
  PriceTag,
  ProcessFlow,
  Receipt,
  SourceCard,
  Subtitles,
  Timeline,
} from '../components';
import {BrandMark} from '../components/BrandMark';
import {spacing} from '../theme/tokens';
import type {Scene} from '../types/episode';

const SceneBody: React.FC<{scene: Scene}> = ({scene}) => {
  switch (scene.kind) {
    case 'headline':
      return <Headline eyebrow={scene.eyebrow} title={scene.title} subtitle={scene.subtitle} />;
    case 'receipt':
      return (
        <Receipt
          merchant={scene.merchant}
          date={scene.date}
          items={scene.items}
          total={scene.total}
          currency={scene.currency}
        />
      );
    case 'price-tag':
      return (
        <PriceTag
          label={scene.label}
          amount={scene.amount}
          compareAt={scene.compareAt}
          currency={scene.currency}
        />
      );
    case 'animated-number':
      return (
        <AnimatedNumber
          value={scene.value}
          prefix={scene.prefix}
          suffix={scene.suffix}
          label={scene.label}
          decimals={scene.decimals}
        />
      );
    case 'chart':
      return (
        <Chart
          chartType={scene.chartType}
          title={scene.title}
          unit={scene.unit}
          series={scene.series}
        />
      );
    case 'comparison':
      return (
        <Comparison
          left={scene.left}
          right={scene.right}
          unit={scene.unit}
          format={scene.format}
        />
      );
    case 'timeline':
      return <Timeline title={scene.title} events={scene.events} />;
    case 'source-card':
      return (
        <SourceCard
          source={scene.source}
          detail={scene.detail}
          year={scene.year}
          url={scene.url}
        />
      );
    case 'b-roll':
      return scene.headline ? <Headline title={scene.headline} /> : null;
    case 'slate':
      return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 28}}>
          <BrandMark />
          <Headline title={scene.title} subtitle={scene.subtitle} />
        </div>
      );
    case 'photo-story':
      return (
        <PhotoStory
          src={scene.src}
          kicker={scene.kicker}
          headline={scene.headline}
          caption={scene.caption}
          attribution={scene.attribution}
          position={scene.position}
        />
      );
    case 'process-flow':
      return <ProcessFlow title={scene.title} nodes={scene.nodes} />;
    case 'error-compare':
      return <ErrorCompare title={scene.title} left={scene.left} right={scene.right} />;
    case 'metric-grid':
      return <MetricGrid title={scene.title} metrics={scene.metrics} />;
    default: {
      const _exhaustive: never = scene;
      return _exhaustive;
    }
  }
};

export const SceneRenderer: React.FC<{scene: Scene}> = ({scene}) => {
  const backgroundSrc = scene.kind === 'b-roll' ? scene.src : scene.background?.src;

  return (
    <Sequence from={scene.startFrame} durationInFrames={scene.durationInFrames} name={scene.id}>
      <AbsoluteFill>
        {scene.kind !== 'photo-story' ? (
          <BackgroundFootage
            src={backgroundSrc}
            dim={scene.background?.dim}
            kenBurns={scene.background?.kenBurns}
          />
        ) : null}
        <AbsoluteFill
          style={{
            padding: scene.kind === 'photo-story' ? 0 : spacing.frame,
            justifyContent: 'center',
          }}
        >
          <SceneBody scene={scene} />
        </AbsoluteFill>
        {scene.captions ? <Subtitles captions={scene.captions} /> : null}
        {scene.narrationSrc ? <NarrationTrack src={scene.narrationSrc} /> : null}
      </AbsoluteFill>
    </Sequence>
  );
};
