import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Helmet } from "react-helmet-async";

const Navbar = () => {
  const { token, logout } = useAuthStore();

  // Refined color palette
  const colors = {
    primary: '#4C6FFF',    // Vibrant royal blue
    secondary: '#F8FAFC',  // Almost white
    accent: '#FFB74D',     // Modern warm orange
    dark: '#1A202C',       // Deep charcoal
    light: '#E2E8F0',      // Soft gray
    error: '#F56565',      // Coral red
    success: '#48BB78'     // Mint green
  };

  const linkClass =
    "relative px-3 py-2 rounded-md text-base font-semibold transition-all duration-200 hover:scale-105";

  const linkHoverEffect = {
    position: "relative",
    color: colors.dark,
    textDecoration: "none",
  };

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <nav
        className="flex justify-between items-center p-6 shadow-sm"
        style={{
          backgroundColor: colors.secondary,
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          fontFamily: "'Nunito', sans-serif",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-2">
          <svg
            width="36"
            height="36"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill={colors.primary} />
            <path
              d="M16 8L20 14H12L16 8ZM16 24L12 18H20L16 24Z"
              fill="white"
            />
            <circle cx="16" cy="16" r="4" fill={colors.accent} />
          </svg>
          <Link
            to="/"
            className="text-3xl font-bold tracking-wide"
            style={{ color: colors.dark }}
          >
            TravelSite
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-10">
          <Link
            to="/trips"
            className={linkClass}
            style={linkHoverEffect}
          >
            Trips
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 hover:w-full"></span>
          </Link>
          {token && (
            <Link
              to="/bookmarks"
              className={linkClass}
              style={linkHoverEffect}
            >
              Bookmarks
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 hover:w-full"></span>
            </Link>
          )}
          <Link
            to="/about"
            className={linkClass}
            style={linkHoverEffect}
          >
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            className={linkClass}
            style={linkHoverEffect}
          >
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 hover:w-full"></span>
          </Link>
        </div>

        {/* Right side - Auth Actions */}
        <div className="flex items-center space-x-4">
          {!token ? (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: colors.primary,
                color: "white",
              }}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: colors.error,
                color: "white",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
