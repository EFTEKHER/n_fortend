import React, { useState } from 'react';
import axios from 'axios';
import { IoAlertCircleOutline, IoCheckmarkCircle, IoReloadOutline, IoFlameOutline, IoShieldCheckmark, IoAnalyticsOutline } from 'react-icons/io5';

const FEATURES = [
  'src_bytes',
  'srv_count',
  'dst_host_srv_count',
  'dst_bytes',
  'dst_host_same_src_port_rate',
  'hot',
  'dst_host_count',
  'duration',
  'dst_host_srv_rerror_rate',
  'dst_host_rerror_rate'
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
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto bg-black p-8 rounded-lg shadow-lg border border-red-500">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-500 glow-text flex items-center justify-center">
          <IoShieldCheckmark className="mr-2 text-5xl" />
          Predict Intrusion Detection
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-red-400 glow-text mb-2 flex items-center">
            <IoAnalyticsOutline className="mr-2 text-xl" />
            Select Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-black border border-red-500 text-red-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 glow-input"
          >
            {MODELS.map((modelName) => (
              <option key={modelName} value={modelName}>
                {modelName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {FEATURES.map((feature) => (
            <div key={feature}>
              <label className="block text-sm font-medium text-red-400 glow-text mb-1">
                {feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
              <input
                type="number"
                onChange={(e) => handleInputChange(feature, e.target.value)}
                className="w-full bg-black border border-red-500 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 glow-input"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed glow-button"
        >
          {loading ? (
            <>
              <IoReloadOutline className="animate-spin mr-2 text-xl" />
              Processing...
            </>
          ) : (
            'Predict'
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-md flex items-center">
            <IoAlertCircleOutline className="text-red-400 mr-2 text-xl" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {prediction && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-md flex items-center ${
              prediction === 'normal' ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'
            }`}>
              <IoCheckmarkCircle className={`mr-2 text-xl ${
                prediction === 'normal' ? 'text-green-400' : 'text-red-400'
              }`} />
              <p className={prediction === 'normal' ? 'text-green-400' : 'text-red-400'}>
                Prediction: <span className="font-bold">{prediction.toUpperCase()}</span>
              </p>
            </div>

            {explanation && (
              <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-red-400">Explanation</h3>
                <p className="text-gray-300">{explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Prediction;
