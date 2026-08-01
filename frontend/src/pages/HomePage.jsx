import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          URL Shortener
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your long URL and generate a secure short link.
        </p>
        {/* My UrlForm to create shortenUrl */}
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
