// components/Navbar.tsx
import { BellRing, Info } from 'lucide-react';

export function Navbar() {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-10">
      {/* Left side - Logo */}
      <div className="flex items-center">
  <img
    src="/Vector1.png"
    alt="Recruiter Logo"
    className="h-5 w-auto object-contain"  // Reduced height to h-6 and added object-contain
  />
</div>

      {/* Right side - Icons */}
      <div className="flex items-center space-x-4">
        {/* (i) Info icon */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Info className="h-5 w-5 text-gray-600" />
        </button>

        {/* Bell icon */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <BellRing className="h-5 w-5 text-black fill-current" /> 
           <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
      4
    </span>
        </button>

        {/* Profile avatar */}
   <div className="flex items-center space-x-2">
  <img
   src="https://randomuser.me/api/portraits/lego/3.jpg"  // lego, men, women available

    alt="Profile"
    className="h-8 w-8 rounded-full object-cover border border-gray-200"
  />
</div>
      </div>
    </header>
  );
}