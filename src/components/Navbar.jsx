import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { FaShieldAlt, FaBars, FaTimes } from "react-icons/fa"; // Icons

const Navbar = () => {
  const [user] = useAuthState(auth); // Check user authentication
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  return (
    <nav className="bg-black border-b border-red-500 cyber-bg glow-border">
      <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <FaShieldAlt className="h-6 w-6 text-red-500" />
          <span className="text-white font-bold text-lg">NIDS</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {user && (
            <>
              <Link to="/" className="text-white hover:text-red-500">Home</Link>
              <Link to="/dataset" className="text-white hover:text-red-500">Dataset</Link>
              <Link to="/prediction" className="text-white hover:text-red-500">Prediction</Link>
              <Link to="/visualization" className="text-white hover:text-red-500">Visualization</Link>
              <Link to="/workflow" className="text-white hover:text-red-500">Workflow</Link>
              <Link to="/chatbot" className="text-white hover:text-red-500">Chatbot</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-red-500 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right: Authentication Options */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={() => signOut(auth)}
              className="btn-futuristic text-sm"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-futuristic text-sm">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-6 text-center">
          <button
            className="absolute top-4 right-6 text-red-500 text-2xl focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>

          {user && (
            <>
              <Link to="/" className="text-white hover:text-red-500" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/dataset" className="text-white hover:text-red-500" onClick={() => setMenuOpen(false)}>Dataset</Link>
              <Link to="/prediction" className="text-white hover:text-red-500" onClick={() => setMenuOpen(false)}>Prediction</Link>
              <Link to="/visualization" className="text-white hover:text-red-500" onClick={() => setMenuOpen(false)}>Visualization</Link>
              <Link to="/workflow" className="text-white hover:text-red-500" onClick={() => setMenuOpen(false)}>Workflow</Link>
              <Link to="/chatbot" className="text-white hover:text-red-500" onClick={() => setMenuOpen(false)}>Chatbot</Link>
            </>
          )}

          {user ? (
            <button
              onClick={() => {
                signOut(auth);
                setMenuOpen(false);
              }}
              className="btn-futuristic text-sm"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-futuristic text-sm" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
