import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaShieldAlt, FaDatabase, FaChartLine, FaCommentDots, 
  FaLock, FaRobot, FaNetworkWired, FaBug, FaRocket,
  FaList, FaTable 
} from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";

const Home = () => {
  const features = [
    { icon: FaShieldAlt, title: 'Real-time Detection', description: 'AI-powered network monitoring' },
    { icon: FaDatabase, title: 'Comprehensive Data', description: 'Analyze traffic patterns' },
    { icon: FaChartLine, title: 'Advanced Analytics', description: 'ML-driven insights' },
    { icon: GiArtificialIntelligence, title: 'AI Assistant', description: '24/7 cybersecurity support' },
    { icon: FaLock, title: 'Threat Prevention', description: 'Proactive defense system' },
    { icon: FaRobot, title: 'ML Models', description: 'RF, XGBoost, KNN algorithms' },
    { icon: FaNetworkWired, title: 'Traffic Analysis', description: 'Anomaly detection' },
    { icon: FaBug, title: 'Intrusion Reports', description: 'Detailed security analytics' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaRocket className="text-4xl text-red-500 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              CyberShield AI
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Next-generation network security powered by artificial intelligence and machine learning
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/prediction" 
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-red-500/30 transition-all"
              >
                <FaChartLine />
                Start Detection
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/chatbot" 
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <GiArtificialIntelligence />
                AI Assistant
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/all-predictions" 
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <FaList />
                All Predictions
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/data-table" 
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/30 transition-all"
              >
                <FaTable />
                Data Table
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 20px rgba(239, 68, 68, 0.1)"
              }}
              className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-red-500 transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <feature.icon className="h-12 w-12 text-red-500 mb-4 animate-float" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;