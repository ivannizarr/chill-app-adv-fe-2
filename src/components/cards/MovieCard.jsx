const MovieCard = ({
  children,
  item,
  onClick,
  className = '',
  aspectRatio = 'aspect-[2/3]',
  width = 'w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] xl:w-[234px]'
}) => {

  const handleClick = () => {
    if (onClick) onClick(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={`
        relative flex-shrink-0 snap-start cursor-pointer
        rounded-xl overflow-hidden bg-neutral-900
        transition-all duration-300 transform-gpu
        hover:scale-105 hover:z-20
        ${width} ${aspectRatio} ${className}
      `}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Watch ${item.title}`}
    >
      <figure className="absolute inset-0">
        <img
          src={item.img}
          alt={`${item.title} poster`}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
          loading="lazy"
          onError={(e) => {
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