import React from "react";
import { FaDatabase, FaBug, FaProjectDiagram, FaChartBar, FaCogs, FaNetworkWired, FaRandom, FaCheckCircle, FaRobot } from "react-icons/fa";
import { GiProcessor, GiArtificialIntelligence, GiMeshNetwork } from "react-icons/gi";
import { MdOutlineDataThresholding, MdOutlineModelTraining, MdPrecisionManufacturing } from "react-icons/md";
import { SiScikitlearn } from "react-icons/si";
import {Link} from 'react-router-dom';
const workflowSteps = [
  {
    icon: <FaDatabase className="text-red-500 text-5xl" />,
    title: "Network Intrusion Dataset",
    description: "The dataset consists of a wide variety of intrusions simulated in a military network environment, labeled as either Normal or Anomalous.",
  },
  {
    icon: <FaBug className="text-red-500 text-5xl" />,
    title: "Handling Missing Values",
    description: "We handle missing values by replacing them with mean/median values or dropping highly missing columns to maintain data integrity.",
  },
  {
    icon: <MdOutlineDataThresholding className="text-red-500 text-5xl" />,
    title: "Encoding Categorical Values",
    description: "Using Label Encoding & One-Hot Encoding, we convert categorical features into numeric values to be used by machine learning models.",
  },
  {
    icon: <GiProcessor className="text-red-500 text-5xl" />,
    title: "Feature Scaling",
    description: "We apply Standardization, MinMax Scaling, and Robust Scaling to normalize the dataset, ensuring models perform optimally.",
  },
  {
    icon: <FaProjectDiagram className="text-red-500 text-5xl" />,
    title: "Feature Selection (Decision Tree)",
    description: "Using Decision Tree, we identify the Top 10 best features contributing most to the intrusion classification.",
  },
  {
    icon: <GiMeshNetwork className="text-red-500 text-5xl" />,
    title: "Feature Extraction",
    description: "Selected Features: ['src_bytes', 'srv_count', 'dst_host_srv_count', 'dst_bytes', 'dst_host_same_src_port_rate', 'hot', 'dst_host_count', 'duration', 'dst_host_srv_rerror_rate', 'dst_host_rerror_rate']. Target: Class (Normal/Anomalous).",
  },
  {
    icon: <FaRandom className="text-red-500 text-5xl" />,
    title: "Train-Test Split (80:20)",
    description: "The dataset is split into 80% training and 20% testing using a fixed random state for reproducibility.",
  },
  {
    icon: <SiScikitlearn className="text-red-500 text-5xl" />,
    title: "Hyperparameter Tuning",
    description: "We apply RandomSearchCV & GridSearchCV to get the best hyperparameters for models (KNN, AdaBoost, XGBoost, GradientBoosting, Random Forest, Decision Tree).",
  },
  {
    icon: <MdOutlineModelTraining className="text-red-500 text-5xl" />,
    title: "Model Training",
    description: "Each model is trained using the best estimators obtained from hyperparameter tuning.",
  },
  {
    icon: <GiArtificialIntelligence className="text-red-500 text-5xl" />,
    title: "Prediction & Classification",
    description: "The trained models predict if a connection is Normal or Anomalous based on the given input features.",
  },
];

const Workflow = () => {
  return (
    <div className="min-h-screen bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-6 glow-text flex items-center justify-center">
          <FaNetworkWired className="mr-3 text-5xl" />
          Network Intrusion Detection Workflow
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          This workflow outlines the steps taken to preprocess data, train models, and detect intrusions effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {workflowSteps.map((step, index) => (
            <div key={index} className="bg-black border border-red-500 p-6 rounded-lg shadow-lg transition transform hover:scale-105 glow-card">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h2 className="text-xl font-bold text-red-400 text-center mb-2">{step.title}</h2>
              <p className="text-gray-300 text-center">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Final Prediction */}
        <div className="mt-12 p-6 bg-black border border-red-500 rounded-lg text-center shadow-lg glow-card">
          <h2 className="text-3xl font-bold text-red-400 flex items-center justify-center">
            <MdPrecisionManufacturing className="mr-3 text-5xl" />
            Final Prediction
          </h2>
          <p className="text-gray-300 text-lg mt-4">
            The trained models predict whether a network connection is <span className="text-green-400 font-bold">Normal</span> or <span className="text-red-400 font-bold">Anomalous</span>.
          </p>
          <button className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition transform hover:scale-105">
            <Link to="/prediction">Get Prediction</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
