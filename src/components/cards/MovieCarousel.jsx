import { useState } from 'react';
import { Plus, X, Play } from 'lucide-react';
import MovieCard from './MovieCard';
import Badge from '@ui/Badge';

const MovieCarousel = ({
  item,
  variant = 'default',
  rank,
  trendingPosition,
  onPlay,
  onInfo,
  isInMyList = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isHorizontal = variant === 'continue-watching';

  const cardWidth = isHorizontal
    ? 'w-[240px] sm:w-[270px] md:w-[290px] lg:w-[310px]'
    : 'w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] xl:w-[234px]';

  const aspectRatio = isHorizontal ? 'aspect-video' : 'aspect-[2/3]';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <MovieCard
        item={item}
        aspectRatio={aspectRatio}
        width={cardWidth}
        className="group"
        onClick={onPlay ? () => onPlay(item) : undefined}
      >
      {() => (
        <>
          {isHorizontal && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${item.progress || 0}%` }}
              />
            </div>
          )}

          {!isHorizontal && (
            <>
              {/* Premium Badge */}
              {item.isPremium && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant="premium" size="xs">Premium</Badge>
                </div>
              )}

              {/* Centered Action Button - Show on Hover */}
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  {/* Add to List / Remove from List Button */}
                  {variant !== 'continue-watching' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onInfo) onInfo(item);
                      }}
                      className="w-12 h-12 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                      aria-label={isInMyList || variant === 'my-list' ? 'Remove from My List' : 'Add to My List'}
                    >
                      {isInMyList || variant === 'my-list' ? (
                        <X className="w-6 h-6 text-red-400" />
                      ) : (
                        <Plus className="w-6 h-6 text-white" />
                      )}
                    </button>
                  )}

                  {/* Remove from Continue Watching Button */}
                  {variant === 'continue-watching' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onInfo) onInfo(item);
                      }}
                      className="w-12 h-12 bg-black/80 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
                      aria-label="Remove from Continue Watching"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {isHorizontal ? (
            <div className="absolute bottom-2 left-4 right-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm truncate flex-1 mr-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  {/* Remove from Continue Watching Button */}
                  {isHovered && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onInfo) onInfo(item);
                      }}
                      className="w-6 h-6 bg-black/70 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20"
                      aria-label="Remove from Continue Watching"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  )}
                  <div className="flex items-center gap-1 text-xs text-white/70 flex-shrink-0">
                    <span>⭐</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-xs mt-1">
                    {variant === 'trending' ? 'Trending' : `${item.genre} • ${item.year}`}
                  </p>
                </div>

                {/* Play Button - Show on Hover */}
                {isHovered && onPlay && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(item);
                    }}
                    className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 ml-2"
                    aria-label={`Play ${item.title}`}
                  >
                    <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
      </MovieCard>
    </div>
  );
};

export default MovieCarousel;