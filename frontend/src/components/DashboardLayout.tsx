import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar'; // adjust the import path as needed
// import Sidebar from '../components/Sidebar'; // adjust the import path as needed
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="flex flex-1 pt-1.5 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Outlet /> {/* This is where child routes will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;