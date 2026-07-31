import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl p-8">

        {/* My UrlForm to create shortenUrl */}
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;
