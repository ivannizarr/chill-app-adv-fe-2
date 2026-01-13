const Skeleton = ({
  width = 'w-full',
  height = 'h-full',
  aspectRatio,
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-neutral-800',
    card: 'bg-neutral-800 rounded-xl',
    text: 'bg-neutral-700 rounded',
    circle: 'bg-neutral-800 rounded-full'
  };

  return (
    <div
      className={`
        ${variants[variant]}
        ${width}
        ${height}
        ${aspectRatio || ''}
        ${className}
        animate-pulse
      `}
    />
  );
};

export const MovieCardSkeleton = ({
  isHorizontal = false,
  className = ''
}) => {
  const cardWidth = isHorizontal
    ? 'w-[240px] sm:w-[270px] md:w-[290px] lg:w-[310px]'
    : 'w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] xl:w-[234px]';

  const aspectRatio = isHorizontal ? 'aspect-video' : 'aspect-[2/3]';

  return (
    <div className={`relative flex-shrink-0 snap-start ${cardWidth} ${className}`}>
      <Skeleton
        variant="card"
        aspectRatio={aspectRatio}
        className="overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Skeleton variant="text" width="w-3/4" height="h-4" className="mb-2" />
          <Skeleton variant="text" width="w-1/2" height="h-3" />
        </div>
      </Skeleton>
    </div>
  );
};

export default Skeleton;
