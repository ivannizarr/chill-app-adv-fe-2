const Button = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-600 hover:bg-gray-700 text-white',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    ghost: 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold rounded-full
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;