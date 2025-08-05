import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const { token, logout } = useAuthStore();

  return (
    <nav className="flex justify-between p-4 shadow-md bg-white">
      <div className="font-bold text-xl">
        <Link to="/">TravelSite</Link>
      </div>
      <div className="space-x-4">
        <Link to="/trips">Trips</Link>
        {token && <Link to="/bookmarks">Bookmarks</Link>}
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {!token ? (
          <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
        ) : (
          <button onClick={logout} className="text-red-600 font-semibold">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
