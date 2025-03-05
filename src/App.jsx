
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dataset from './pages/Dataset';
import Prediction from './pages/Prediction';
import Visualization from './pages/Visualization';
import Workflow from './pages/Workflow';
import Chatbot from './pages/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';
import AllPredictionsView from './pages/AllPredictionsView';
import DataTable from './pages/DataTable';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/dataset" element={
              <ProtectedRoute>
                <Dataset />
              </ProtectedRoute>
            } />
            <Route path="/prediction" element={
              <ProtectedRoute>
                <Prediction />
              </ProtectedRoute>
            } />
            <Route path="/visualization" element={
              <ProtectedRoute>
                <Visualization />
              </ProtectedRoute>
            } />
            <Route path="/workflow" element={
              <ProtectedRoute>
                <Workflow />
              </ProtectedRoute>
            } />
           <Route path="/all-predictions" element={
              <ProtectedRoute>
                <AllPredictionsView />
              </ProtectedRoute>
            } />
            <Route path="/data-table" element={
              <ProtectedRoute>
                <DataTable />
              </ProtectedRoute>
            } />
            <Route path="/chatbot" element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;