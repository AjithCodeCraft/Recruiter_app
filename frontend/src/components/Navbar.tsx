// components/Navbar.tsx
import { BellRing, Info, Menu } from 'lucide-react';
import { useState } from 'react';

export function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 fixed top-0 left-0 right-0 z-10">
      {/* Left side - Logo and Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu button (only shows on small screens) */}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        {/* Logo */}
        <img
          src="/Vector1.png"
          alt="Recruiter Logo"
          className="h-5 w-auto object-contain"
        />
      </div>

      {/* Right side - Icons */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* (i) Info icon */}
        <button 
          className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Information"
        >
          <Info className="h-5 w-5 text-gray-600" />
        </button>

        {/* Bell icon with notification badge */}
        <button 
          className="p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
        >
          <BellRing className="h-5 w-5 text-black fill-current" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
            4
          </span>
        </button>

        {/* Profile avatar - hidden on very small screens if needed */}
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/lego/3.jpg"
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
}