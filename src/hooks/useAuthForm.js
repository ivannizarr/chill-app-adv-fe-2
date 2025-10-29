import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@context/AuthContext';

export const useAuthForm = (type = 'login') => {
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ...(type === 'register' && { confirmPassword: '' })
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createUserData = (username) => ({
    id: Date.now(),
    name: username,
    username: username,
    email: `${username}@chill.com`
  });

  const handleSubmit = (e, onNavigate) => {
    e.preventDefault();

    const requiredFields = type === 'login'
      ? ['username', 'password']
      : ['username', 'password', 'confirmPassword'];

    const missingFields = requiredFields.some(field => !formData[field]);
    if (missingFields) {
      toast.error(type === 'login' ? 'Username dan kata sandi harus diisi' : 'Semua field harus diisi');
      return;
    }

    if (type === 'register') {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Password dan konfirmasi password tidak sama');
        return;
      }

      if (formData.password.length < 6) {
        toast.error('Password minimal 6 karakter');
        return;
      }
    }

    const userData = createUserData(formData.username);
    const authAction = type === 'login' ? login : register;
    authAction(userData);

    const successMessage = type === 'login'
      ? 'Selamat datang kembali!'
      : 'Akun berhasil dibuat! Selamat datang di CHILL!';

    toast.success(successMessage);
    onNavigate('home');
  };

  const handleGoogleAuth = (onNavigate) => {
    const googleUser = {
      id: Date.now(),
      name: 'Google User',
      username: 'googleuser',
      email: 'user@gmail.com'
    };

    const authAction = type === 'login' ? login : register;
    authAction(googleUser);

    const successMessage = type === 'login'
      ? 'Login dengan Google berhasil!'
      : 'Daftar dengan Google berhasil!';

    toast.success(successMessage);
    onNavigate('home');
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
    handleGoogleAuth
  };
};