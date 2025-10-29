import AuthLayout from '@layout/AuthLayout';
import AuthForm from '@ui/AuthForm';

const Login = ({ onNavigate }) => {
  return (
    <AuthLayout
      backgroundImage="/Assets/img/masuk.jpg"
      title="Masuk"
      subtitle="Selamat datang kembali!"
    >
      <AuthForm type="login" onNavigate={onNavigate} />
    </AuthLayout>
  );
};

export default Login;