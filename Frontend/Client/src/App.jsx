import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/common/ScrollToTop";
import Footer from "./components/layout/Footer";

// Preload critical components
const Home = lazy(() => import(/* webpackPrefetch: true */ "./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Trips = lazy(() => import("./pages/Trips"));

// Auth Pages
const Register = lazy(() => import("./pages/auth/Register"));
const OtpVerify = lazy(() => import("./pages/auth/OtpVerify"));
const SetPassword = lazy(() => import("./pages/auth/SetPassword"));
const Login = lazy(() => import("./pages/auth/Login"));

// Protected Pages
const Bookmarks = lazy(() => import("./pages/Bookmarks"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner fullPage />}>
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
      </Suspense>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;