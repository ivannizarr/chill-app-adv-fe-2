import { FcGoogle } from 'react-icons/fc';
import Button from '@ui/Button';
import FormInput from '@ui/FormInput';
import { useAuthForm } from '@hooks/useAuthForm';

const AuthForm = ({ type = 'login', onNavigate }) => {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
    handleGoogleAuth
  } = useAuthForm(type);

  const isLogin = type === 'login';
  const isRegister = type === 'register';

  return (
    <form onSubmit={(e) => handleSubmit(e, onNavigate)} className="space-y-6">
      {/* Username */}
      <FormInput
        label="Username"
        name="username"
        type="text"
        placeholder="Masukkan username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <FormInput
        label="Kata Sandi"
        name="password"
        type="password"
        placeholder="Masukkan kata sandi"
        value={formData.password}
        onChange={handleChange}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        required
      />

      {/* Confirm Password */}
      {isRegister && (
        <FormInput
          label="Konfirmasi Kata Sandi"
          name="confirmPassword"
          type="password"
          placeholder="Masukkan kata sandi"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          required
        />
      )}

      {/* Navigation Links */}
      <div className="flex justify-between items-center text-sm font-light -mt-1">
        <span className="text-gray-300">
          {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
          <button
            type="button"
            onClick={() => onNavigate(isLogin ? 'register' : 'login')}
            className="font-semibold text-white ml-1 hover:underline"
          >
            {isLogin ? 'Daftar' : 'Masuk'}
          </button>
        </span>
        {isLogin ? (
          <button
            type="button"
            onClick={() => onNavigate('forgot')}
            className="text-gray-300 hover:text-white"
          >
            Lupa kata sandi?
          </button>
        ) : (
          <span></span>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="space-y-2">
        <Button
          type="submit"
          variant={isLogin ? "primary" : "ghost"}
          size="md"
          className={`w-full text-white text-sm ${
            isLogin
              ? '!bg-[#3D4142] hover:!bg-gray-800'
              : 'bg-[#3D4142] hover:bg-gray-800'
          }`}
        >
          {isLogin ? 'Masuk' : 'Daftar'}
        </Button>

        <div className="text-center">
          <span className="text-gray-400 text-xs">Atau</span>
        </div>

        <Button
          type="button"
          onClick={() => handleGoogleAuth(onNavigate)}
          variant="ghost"
          size="md"
          className="w-full flex items-center justify-center !bg-transparent border-[0.5px] border-gray-300 text-white hover:!bg-transparent text-sm font-light"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          {isLogin ? 'Masuk' : 'Daftar'} dengan Google
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;