import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Trips from "./pages/Trips";

// Auth Pages
import Register from "./pages/auth/Register";
import OtpVerify from "./pages/auth/OtpVerify";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/auth/Login";

// Protected Pages
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trips" element={<Trips />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
