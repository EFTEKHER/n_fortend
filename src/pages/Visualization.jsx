import React from 'react';
import { FaChartBar, FaTree, FaCogs, FaRobot, FaCog } from 'react-icons/fa';
import Output from '../assets/output.png';
import AdaBoostConfusionMatrix from '../assets/AdaBoost_confusion_matrix.png';
import DecisionTreeConfusionMatrix from '../assets/DecisionTree_confusion_matrix.png';
import GradientBoostingConfusionMatrix from '../assets/Gradient_Boosting_confusion_matrix.png';
import KNNConfusionMatrix from '../assets//KNN_confusion_matrix.png';
import XGBoostConfusionMatrix from '../assets/XGBoost_confusion_matrix.png';
import RandomForestFeatureImportance from '../assets/RandomForest_confusion_matrix.png';
import dstBytesCountplot from '../assets/dst_bytes_countplot.png';
import dstBytesHistplot from '../assets/dst_bytes_histplot.png';
import dstBytesKdeplot from '../assets/dst_bytes_kdeplot.png';
import dstHostCountCountplot from '../assets/dst_host_count_countplot.png';
import dstHostCountHistplot from '../assets/dst_host_count_histplot.png';
import dstHostRerrorRateKdeplot from '../assets/dst_host_rerror_rate_kdeplot.png';
import dstHostSrvCountKdeplot from '../assets/dst_host_srv_count_kdeplot.png';
import srvCountKdeplot from '../assets/srv_count_kdeplot.png';

const Visualization = () => {
  return (
    <div className="bg-black p-6 text-white">
      <h1 className="text-center text-4xl glow-text mb-8">Model Performance & Data Insights</h1>
      <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border h-[25%]">
      <img src={Output} alt="Gradient Boosting Confusion Matrix" className="w-full rounded-lg" />
      <p className="text-center mt-2 text-xl flex items-center justify-center">
        <FaCog className="mr-2" /> Testing Accuracy on different models
      </p>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={AdaBoostConfusionMatrix} alt="AdaBoost Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> AdaBoost Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={DecisionTreeConfusionMatrix} alt="Decision Tree Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaTree className="mr-2" /> Decision Tree Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={GradientBoostingConfusionMatrix} alt="Gradient Boosting Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaCog className="mr-2" /> Gradient Boosting Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={KNNConfusionMatrix} alt="KNN Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaRobot className="mr-2" /> KNN Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={XGBoostConfusionMatrix} alt="XGBoost Confusion Matrix" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaCogs className="mr-2" /> XGBoost Confusion Matrix
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={RandomForestFeatureImportance} alt="Random Forest Feature Importance" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaTree className="mr-2" /> Random Forest Feature Importance
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={dstBytesCountplot} alt="Dst Bytes Countplot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Dst Bytes Countplot
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={dstBytesHistplot} alt="Dst Bytes Histplot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Dst Bytes Histplot
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={dstBytesKdeplot} alt="Dst Bytes KDE Plot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Dst Bytes KDE Plot
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={dstHostCountCountplot} alt="Dst Host Count Countplot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Dst Host Count Countplot
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={dstHostCountHistplot} alt="Dst Host Count Histplot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Dst Host Count Histplot
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={dstHostRerrorRateKdeplot} alt="Dst Host Rerror Rate KDE Plot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Dst Host Rerror Rate KDE Plot
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={dstHostSrvCountKdeplot} alt="Dst Host Srv Count KDE Plot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Dst Host Srv Count KDE Plot
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg p-4 glow-border">
          <img src={srvCountKdeplot} alt="Srv Count KDE Plot" className="w-full rounded-lg" />
          <p className="text-center mt-2 text-xl flex items-center justify-center">
            <FaChartBar className="mr-2" /> Srv Count KDE Plot
          </p>
        </div>
      </div>
    </div>
  );
}

export default Visualization;
