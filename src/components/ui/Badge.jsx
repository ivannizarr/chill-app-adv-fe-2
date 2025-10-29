const Badge = ({ 
  children,
  variant = 'default',
  size = 'sm',
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-500 text-white',
    premium: 'bg-yellow-600 text-white',
    top10: 'bg-red-600 text-white',
    new: 'bg-blue-600 text-white'
  };

  const sizes = {
    xs: 'px-2 py-1 text-[10px] sm:text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`
      inline-flex items-center font-bold rounded-md shadow-md
      ${variants[variant] || variants.default}
      ${sizes[size] || sizes.sm}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;