import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.js";
import { FaShieldAlt, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch {
      setError("Failed to create account");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch {
      setError("Google Sign-In failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 px-4">
      <div className="max-w-md w-full p-8 rounded-lg cyber-border bg-slate-900 shadow-lg">
        <FaShieldAlt className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="text-center text-3xl text-white mt-6">Create your account</h2>

        {error && <div className="bg-red-500 text-white p-2 rounded mt-4">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="email" placeholder="Email address" className="input-cyber w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input-cyber w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn-futuristic w-full">Sign up</button>
        </form>

        <button onClick={handleGoogleSignIn} className="btn-futuristic-google w-full mt-4 flex items-center justify-center">
          <FaGoogle className="mr-2" /> Sign up with Google
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-400">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
