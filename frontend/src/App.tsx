// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import Home from './pages/Dashboard/Home'; 
import AddUser from './pages/Dashboard/Add-User';
import UsersManagement from './pages/Dashboard/Users';
import DashboardLayout from './components/DashboardLayout';
import EditUser from './pages/Dashboard/Edit-User';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;