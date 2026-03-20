import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; // New import
import Login from './pages/Login';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Ranking from './pages/Ranking';
import History from './pages/History';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import FindSkill from './pages/FindSkill';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
        <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
        <Route path="/find-skill" element={<ProtectedRoute><FindSkill /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
