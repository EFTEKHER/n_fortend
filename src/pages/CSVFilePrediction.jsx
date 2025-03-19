import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  IoArrowForward,
  IoDocumentText,
  IoCloseCircle,
  IoRefresh
} from 'react-icons/io5';
import { savePrediction } from '../services/predictionService.js';

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

function CSVFilePrediction() {
  const [model, setModel] = useState('random_forest');
  const [inputData, setInputData] = useState({});
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        if (results.data && results.data.length > 0) {
          const row = results.data[0];
          let data = {};
          FEATURES.forEach(feature => {
            data[feature.name] = parseFloat(row[feature.name]) || 0;
          });
          setInputData(data);
          toast.success('CSV file parsed successfully!');
        } else {
          toast.error('No data found in CSV file');
        }
      },
      error: function(err) {
        toast.error('Error parsing CSV file');
        console.error(err);
      }
    });
  };

  const handleReset = () => {
    setFileName('');
    setInputData({});
    setPrediction(null);
    setExplanation('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('System reset. Ready for new analysis.');
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setError('');
      setPrediction(null);

      if (Object.keys(inputData).length === 0) {
        toast.error('Please upload a valid CSV file with the required data');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${BASE_URL}/predict`, {
        model,
        input: inputData
      });

      setPrediction(response.data.prediction);
      setExplanation(response.data.explanation);

      await savePrediction({
        model,
        input: inputData,
        prediction: response.data.prediction,
        explanation: response.data.explanation
      });

      toast.success('Prediction saved successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to get prediction. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden border border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-red-500/10 pointer-events-none" />
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-500/5 to-transparent animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-500/5 to-transparent animate-pulse-slow" />

        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-600 p-3 rounded-2xl mb-4 animate-fade-in-down">
            <IoShieldCheckmark className="text-white text-4xl mr-3 animate-bounce-slow" />
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-300">
              Intrusion Detection System
            </h1>
          </div>
          <p className="text-gray-400 mt-2 animate-fade-in">AI-powered network security analysis</p>
        </header>

        <div className="space-y-8">
          {/* Model Selection */}
          <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg animate-fade-in-up">
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

          {/* Enhanced File Upload Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-300 flex items-center">
                <IoRocket className="mr-2 text-red-400 text-xl" />
                Upload CSV File
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center text-gray-400 hover:text-purple-400 transition-colors group"
              >
                <IoRefresh className="mr-2 group-hover:animate-spin" />
                Reset System
              </button>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`w-full cursor-pointer group flex flex-col items-center justify-center border-2 
                    border-dashed ${fileName ? 'border-purple-500' : 'border-gray-600'} rounded-xl p-8 
                    transition-all duration-300 hover:border-purple-400 hover:bg-gray-700/20`}
                >
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center bg-purple-500/20 p-4 rounded-full animate-pulse">
                      <IoDocumentText className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-300 font-medium">
                        {fileName ? fileName : 'Choose a CSV file'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {fileName ? 'Click to change file' : 'or drag and drop here'}
                      </p>
                    </div>
                  </div>
                </label>
                {fileName && (
                  <button
                    onClick={handleReset}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <IoCloseCircle className="text-xl" />
                  </button>
                )}
              </div>

              {inputData && Object.keys(inputData).length > 0 && (
                <div className="w-full mt-4 animate-slide-in-right">
                  <h3 className="text-gray-300 mb-4 flex items-center">
                    <IoDocumentText className="mr-2 text-purple-400" />
                    Parsed Data Overview
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FEATURES.map(({ name, icon }, index) => (
                      <div
                        key={name}
                        className="bg-gray-700/30 p-4 rounded-lg border border-gray-600 hover:border-purple-400 transition-colors
                          animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-500/20 p-2 rounded-lg">
                            {React.cloneElement(icon, { className: 'text-purple-400 text-xl' })}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-300">
                              {name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </p>
                            <p className="text-lg text-gray-100 font-mono">
                              {inputData[name]}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prediction Button */}
          <button
            onClick={handlePredict}
            disabled={loading || !fileName}
            className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 
              text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2
              shadow-lg hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden animate-fade-in-up"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            {loading ? (
              <>
                <IoReloadOutline className="animate-spin text-xl" />
                <span>Analyzing Network...</span>
              </>
            ) : (
              <>
                <span>Detect Intrusion</span>
                <IoArrowForward className="text-lg group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Results Section */}
          {error && (
            <div className="animate-fade-in-up bg-red-900/30 border border-red-800 rounded-xl p-4 flex items-center">
              <IoAlertCircleOutline className="text-red-400 mr-2 text-xl" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {prediction && (
            <div className="space-y-4 animate-slide-in-bottom">
              <div className={`p-6 rounded-xl flex items-center space-x-4 ${
                prediction === 'normal' 
                  ? 'bg-green-900/30 border border-green-800' 
                  : 'bg-red-900/30 border border-red-800'
              }`}>
                <div className={`p-3 rounded-lg animate-pop-in ${prediction === 'normal' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {prediction === 'normal' ? (
                    <IoCheckmarkCircle className="text-green-400 text-3xl" />
                  ) : (
                    <IoAlertCircleOutline className="text-red-400 text-3xl" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400">Security Status</p>
                  <p className={`text-2xl font-bold ${prediction === 'normal' ? 'text-green-400' : 'text-red-400'}`}>
                    {prediction.toUpperCase()}
                  </p>
                </div>
              </div>

              {explanation && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 animate-fade-in">
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
      <ToastContainer
        position="top-right"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default CSVFilePrediction;