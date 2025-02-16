import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaDatabase, FaChartLine, FaCommentDots, FaLock, FaRobot, FaNetworkWired, FaBug, FaRocket } from 'react-icons/fa';

const Home = () => {
  const features = [
    { icon: FaShieldAlt, title: 'Real-time Detection', description: 'Monitor and detect network intrusions in real-time using AI-powered analytics.' },
    { icon: FaDatabase, title: 'Comprehensive Dataset', description: 'Analyze extensive network traffic data to identify patterns of malicious activities.' },
    { icon: FaChartLine, title: 'Advanced Analytics', description: 'Visualize and interpret network behavior using machine learning models.' },
    { icon: FaCommentDots, title: 'AI Assistant', description: 'Get instant help and insights from our AI chatbot trained in cybersecurity.' },
    { icon: FaLock, title: 'Threat Prevention', description: 'Predict and prevent cyber threats before they infiltrate your network.' },
    { icon: FaRobot, title: 'Machine Learning Models', description: 'Utilize powerful ML algorithms like Random Forest, XGBoost, and KNN for accurate predictions.' },
    { icon: FaNetworkWired, title: 'Network Traffic Analysis', description: 'Analyze traffic data from different sources to detect anomalies and security breaches.' },
    { icon: FaBug, title: 'Intrusion Reporting', description: 'Generate detailed reports of detected intrusions and suspicious activities.' }
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-red-500 glow-text mb-6 flex justify-center items-center">
            <FaRocket className="mr-2 text-5xl" />
            Next-Gen Network Security
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Protect your network with AI-powered intrusion detection and real-time monitoring.
          </p>
          
          {/* 🚀 Missing Buttons Added Here */}
          <div className="flex justify-center gap-6 mt-6">
            <Link to="/prediction" className="btn-cyber bg-red-900 text-[white] rounded-2xl p-4 font-extrabold">
              🔥 Start Detection
            </Link>
            <Link to="/chatbot" className="btn-cyber  bg-red-900 text-[white] rounded-2xl p-4 font-extrabold">
              🤖 AI Chatbot
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {features.map((feature, index) => (
            <div key={index} className="cyber-bg p-6 rounded-lg cyber-border text-center shadow-lg">
              <feature.icon className="h-14 w-14 text-red-500 mb-4 glow-icon" />
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
