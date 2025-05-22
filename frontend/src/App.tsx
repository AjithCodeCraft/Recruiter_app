import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import Home from './pages/Dashboard/Home'; 
import AddUser from './pages/Dashboard/Add-User';
import UsersManagement from './pages/Dashboard/Users';
// import DashboardLayout from './layouts/DashboardLayout'; // adjust the import path
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Routes that use the dashboard layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
           <Route path="/users" element={<UsersManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;