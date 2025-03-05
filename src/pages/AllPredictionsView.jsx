import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoCheckmarkCircle,
  IoAlertCircleOutline,
  IoTime,
  IoAnalyticsOutline,
  IoArrowBack,
  IoReloadOutline,
  IoInformationCircleOutline,
  IoSwapHorizontal,
  IoServer,
  IoCloudDownload,
  IoSpeedometer,
  IoPulse,
  IoStatsChart
} from 'react-icons/io5';
import { getPredictions } from '../services/predictionService';
import { Link } from 'react-router-dom';

const FEATURES = [
  { name: 'src_bytes', icon: <IoSwapHorizontal /> },
  { name: 'srv_count', icon: <IoServer /> },
  { name: 'dst_host_srv_count', icon: <IoServer className="transform rotate-180" /> },
  { name: 'dst_bytes', icon: <IoCloudDownload /> },
  { name: 'dst_host_same_src_port_rate', icon: <IoSpeedometer /> },
  { name: 'hot', icon: <IoPulse /> },
  { name: 'dst_host_count', icon: <IoStatsChart /> },
  { name: 'duration', icon: <IoTime /> },
  { name: 'dst_host_srv_rerror_rate', icon: <IoAlertCircleOutline /> },
  { name: 'dst_host_rerror_rate', icon: <IoAlertCircleOutline className="transform rotate-45" /> }
];

const AllPredictionsView = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const unsubscribe = getPredictions(
      (data) => {
        setPredictions(data);
        setLoading(false);
      },
      (error) => {
        setError('Failed to fetch predictions');
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors">
            <IoArrowBack className="mr-2" />
            Back to Detection
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden border border-gray-700"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-red-500/10 pointer-events-none" />

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-300">
              Prediction History
            </h1>
            <p className="text-gray-400 mt-2">Recent security analysis results with full input details</p>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <IoReloadOutline className="animate-spin text-4xl text-purple-400" />
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 flex items-center">
              <IoAlertCircleOutline className="text-red-400 mr-2 text-xl" />
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {predictions.map((prediction) => (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl border ${
                      prediction.prediction === 'normal'
                        ? 'border-green-800/50 bg-green-900/10'
                        : 'border-red-800/50 bg-red-900/10'
                    } hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-red-500/5 transition-all`}
                  >
                    <div className="p-6 cursor-pointer" onClick={() => toggleExpand(prediction.id)}>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${
                            prediction.prediction === 'normal'
                              ? 'bg-green-500/20'
                              : 'bg-red-500/20'
                          }`}>
                            {prediction.prediction === 'normal' ? (
                              <IoCheckmarkCircle className="text-green-400 text-2xl" />
                            ) : (
                              <IoAlertCircleOutline className="text-red-400 text-2xl" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-200">
                              {prediction.prediction.toUpperCase()}
                            </h3>
                            <p className="text-sm text-gray-400 flex items-center">
                              <IoTime className="mr-2" />
                              {formatTimestamp(prediction.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-400 flex items-center">
                            <IoAnalyticsOutline className="mr-2" />
                            {prediction.model.split('_').join(' ').toUpperCase()}
                          </div>
                          <IoInformationCircleOutline className={`text-purple-400 transform transition-transform ${
                            expandedId === prediction.id ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === prediction.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-700/50 p-6 bg-gray-800/20">
                            <h4 className="text-sm font-semibold text-gray-400 mb-4">Input Parameters</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {FEATURES.map(({ name, icon }) => (
                                <div key={name} className="space-y-1">
                                  <label className="block text-sm font-medium text-gray-400 flex items-center">
                                    <span className="text-purple-400 mr-2">{icon}</span>
                                    {name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                  </label>
                                  <div className="w-full bg-gray-700/50 text-gray-200 rounded-lg px-4 py-2">
                                    {prediction.input[name] || 0}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              {predictions.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500">
                  No predictions found in history
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AllPredictionsView;