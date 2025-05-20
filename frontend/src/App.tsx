import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes as needed */}
        <Route path="/register" element={<RegisterPage />} />
     
      </Routes>
    </Router>
  )
}

export default App
