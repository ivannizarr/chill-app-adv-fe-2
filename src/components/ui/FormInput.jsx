import { Eye, EyeOff } from 'lucide-react';

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  required = false,
  className = ''
}) => {
  const isPasswordField = type === 'password' || (type === 'text' && onTogglePassword);

  return (
    <div className={className}>
      <label className="block text-white text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 ${isPasswordField ? 'pr-12' : ''} bg-transparent border border-gray-400 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent`}
          required={required}
        />
        {isPasswordField && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;