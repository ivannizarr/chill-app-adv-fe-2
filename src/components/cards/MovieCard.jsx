import { useState } from 'react';
import useLazyLoad from '@hooks/useLazyLoad';

const MovieCardSkeleton = ({ width, aspectRatio }) => (
  <div
    className={`
      relative flex-shrink-0 snap-start
      rounded-xl overflow-hidden bg-neutral-800
      animate-pulse
      ${width} ${aspectRatio}
    `}
  >
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="w-3/4 h-4 bg-neutral-700 rounded mb-2" />
      <div className="w-1/2 h-3 bg-neutral-700 rounded" />
    </div>
  </div>
);

const MovieCard = ({
  children,
  item,
  onClick,
  className = '',
  aspectRatio = 'aspect-[2/3]',
  width = 'w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] xl:w-[234px]',
  lazy = true
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { elementRef, isVisible } = useLazyLoad({
    threshold: 0.1,
    rootMargin: '200px',
    triggerOnce: true
  });

  const handleClick = () => {
    if (onClick) onClick(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  if (lazy && !isVisible) {
    return (
      <div ref={elementRef}>
        <MovieCardSkeleton width={width} aspectRatio={aspectRatio} />
      </div>
    );
  }

  return (
    <article
      ref={lazy ? elementRef : undefined}
      className={`
        relative flex-shrink-0 snap-start cursor-pointer
        overflow-hidden bg-neutral-900
        transition-all duration-300 transform-gpu
        ${width} ${aspectRatio} ${className}
      `}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Watch ${item.title}`}
    >
      <figure className="absolute inset-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
        )}
        <img
          src={item.img}
          alt={`${item.title} poster`}
          className={`
            w-full h-full object-cover transition-all duration-500
            hover:scale-110
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true);
            e.target.style.backgroundColor = '#333';
            e.target.alt = 'Image not found';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
      </figure>
      {typeof children === 'function' ? children({ item }) : children}
    </article>
  );
};

export default MovieCard;