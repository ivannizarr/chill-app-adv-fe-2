import { useState, useEffect, useRef } from 'react';
import { Plus, X, Play, ChevronDown, Star } from 'lucide-react';
import Badge from '@ui/Badge';

const MovieCarousel = ({
  item,
  variant = 'default',
  onPlay,
  onInfo,
  isInMyList = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const timeoutRef = useRef(null);
  const isHorizontal = variant === 'continue-watching';

  // Delay sebelum show expanded (Netflix-style)
  useEffect(() => {
    if (isHovered && !isHorizontal) {
      timeoutRef.current = setTimeout(() => {
        setShowExpanded(true);
      }, 300);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowExpanded(false);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered, isHorizontal]);

  // Normal card dimensions
  const normalWidth = isHorizontal ? 310 : 234;
  const normalHeight = isHorizontal ? 174 : 351;

  // Expanded dimensions (melebar + tinggi)
  const expandedWidth = isHorizontal ? 380 : 300;
  const expandedHeight = isHorizontal ? 220 : 390;

  return (
    <div
      className="relative"
      style={{
        width: `${normalWidth}px`,
        height: `${normalHeight}px`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card wrapper - melebar + tinggi */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2
          transition-all duration-300 ease-out
          ${showExpanded ? 'z-50' : 'z-0'}
        `}
        style={{
          width: showExpanded ? `${expandedWidth}px` : `${normalWidth}px`,
          height: showExpanded ? `${expandedHeight}px` : `${normalHeight}px`,
          top: showExpanded ? `${(normalHeight - expandedHeight) / 2}px` : '0px',
        }}
      >
        {/* Card */}
        <div
          className={`
            relative w-full h-full overflow-hidden cursor-pointer
            bg-neutral-900 transition-all duration-300
            ${showExpanded ? 'rounded-xl shadow-2xl shadow-black/80' : 'rounded-lg'}
          `}
          onClick={() => onPlay && onPlay(item)}
        >
          {/* Image */}
          <img
            src={item.img}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Overlay - hanya bagian bawah saat expanded */}
          {showExpanded ? (
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#181A1C] transition-all duration-300" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-300" />
          )}

          {/* Premium Badge */}
          {item.isPremium && !isHorizontal && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="premium" size="xs">Premium</Badge>
            </div>
          )}

          {/* Progress bar untuk continue watching */}
          {isHorizontal && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 z-10">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${item.progress || 0}%` }}
              />
            </div>
          )}

          {/* Normal state content */}
          {!showExpanded && (
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-semibold text-sm line-clamp-2">
                {item.title}
              </h3>
              {!isHorizontal && (
                <p className="text-white/60 text-xs mt-1">
                  {item.genre} • {item.year}
                </p>
              )}
            </div>
          )}

          {/* Expanded state content - dalam area overlay bawah */}
          {showExpanded && !isHorizontal && (
            <div className="absolute bottom-0 left-0 right-0 h-1/3 py-4 px-6 flex flex-col justify-between">
              {/* Top row - Buttons */}
              <div className="flex items-center justify-between">
                {/* Left - Play, Add */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onPlay) onPlay(item);
                    }}
                    className="w-9 h-9 bg-white hover:bg-white/90 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Play"
                  >
                    <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onInfo) onInfo(item);
                    }}
                    className="w-8 h-8 bg-neutral-800/80 border-2 border-neutral-400 hover:border-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                    aria-label={isInMyList ? 'Remove from list' : 'Add to list'}
                  >
                    {isInMyList ? (
                      <X className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>

                {/* Right - Chevron */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onPlay) onPlay(item);
                  }}
                  className="w-8 h-8 bg-neutral-800/80 border-2 border-neutral-400 hover:border-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="More info"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Bottom row - Title & Info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold text-sm line-clamp-1">
                    {item.title}
                  </h3>
                  {item.duration && (
                    <span className="text-neutral-400 text-xs">{item.duration}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {item.rating && !isNaN(item.rating) && (
                    <span className="text-green-500 font-semibold">
                      {Math.round(item.rating * 10)}%
                    </span>
                  )}
                  <span className="text-neutral-400">{item.year}</span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-300">{item.genre}</span>
                </div>
              </div>
            </div>
          )}

          {/* Horizontal card - rating */}
          {isHorizontal && (
            <div className="absolute bottom-4 right-3 z-10">
              <div className="flex items-center gap-1 text-xs text-white/80">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{item.rating || '-'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
