const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Main Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              URL Shortener
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Create short URLs quickly and securely.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Home
            </a>

            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Login
            </a>

            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Register
            </a>

            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">

          <p>
            © 2026 URL Shortener. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-gray-300 transition-colors"
            >
              Terms
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

