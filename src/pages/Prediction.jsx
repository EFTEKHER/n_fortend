import React, { useState } from 'react';
import axios from 'axios';
import { 
  IoAlertCircleOutline, 
  IoCheckmarkCircle,
  IoReloadOutline,
  IoShieldCheckmark,
  IoAnalyticsOutline,
  IoSwapHorizontal,
  IoServer,
  IoCloudDownload,
  IoSpeedometer,
  IoPulse,
  IoTime,
  IoStatsChart,
  IoInformationCircleOutline,
  IoRocket,
  IoArrowForward
} from 'react-icons/io5';

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

const MODELS = [
  'random_forest',
  'decision_tree',
  'xgboost',
  'knn',
  'gradient_boosting'
];

const BASE_URL = 'http://localhost:5000/';

function Prediction() {
  const [model, setModel] = useState('random_forest');
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (feature, value) => {
    setInputData(prev => ({
      ...prev,
      [feature]: parseFloat(value) || 0
    }));
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setError('');
      setPrediction(null);

      const response = await axios.post(`${BASE_URL}/predict`, {
        model,
        input: inputData
      });

      setPrediction(response.data.prediction);
      setExplanation(response.data.explanation);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden border border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-red-500/10 pointer-events-none" />
        
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-600 p-3 rounded-2xl mb-4">
            <IoShieldCheckmark className="text-white text-4xl mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-300">
              Intrusion Detection System
            </h1>
          </div>
          <p className="text-gray-400 mt-2">AI-powered network security analysis</p>
        </header>

        <div className="space-y-8">
          <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-4 flex items-center">
                  <IoAnalyticsOutline className="mr-2 text-purple-400 text-xl" />
                  Machine Learning Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 text-gray-200 rounded-lg px-4 py-3 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                >
                  {MODELS.map((modelName) => (
                    <option key={modelName} value={modelName} className="bg-gray-800">
                      {modelName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-300 mb-6 flex items-center">
              <IoRocket className="mr-2 text-red-400 text-xl" />
              Network Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map(({ name, icon }) => (
                <div key={name} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-400 flex items-center">
                    <span className="text-red-400 mr-2">{icon}</span>
                    {name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </label>
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(name, e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 
                      focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 
              text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <IoReloadOutline className="animate-spin text-xl" />
                <span>Analyzing Network...</span>
              </>
            ) : (
              <>
                <span>Detect Intrusion</span>
                <IoArrowForward className="text-lg" />
              </>
            )}
          </button>

          {error && (
            <div className="animate-fade-in-up bg-red-900/30 border border-red-800 rounded-xl p-4 flex items-center">
              <IoAlertCircleOutline className="text-red-400 mr-2 text-xl" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {prediction && (
            <div className="space-y-4 animate-fade-in">
              <div className={`p-6 rounded-xl flex items-center space-x-4 ${
                prediction === 'normal' 
                  ? 'bg-green-900/30 border border-green-800' 
                  : 'bg-red-900/30 border border-red-800'
              }`}>
                <div className={`p-3 rounded-lg ${prediction === 'normal' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {prediction === 'normal' ? (
                    <IoCheckmarkCircle className="text-green-400 text-3xl" />
                  ) : (
                    <IoAlertCircleOutline className="text-red-400 text-3xl" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Security Status</p>
                  <p className={`text-2xl font-bold ${
                    prediction === 'normal' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {prediction.toUpperCase()}
                  </p>
                </div>
              </div>

              {explanation && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center mb-3 space-x-2">
                    <IoInformationCircleOutline className="text-purple-400 text-xl" />
                    <h3 className="text-lg font-semibold text-gray-300">Analysis Explanation</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prediction;