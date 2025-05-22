// components/Sidebar.tsx
import { Menu, Home, Briefcase, Users, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div >  
    <div className={`flex flex-col h-screen bg-white shadow-md transition-all duration-300 pt-15  ${isOpen ? 'w-64' : 'w-20'}`}>
      {/* Header with hamburger */}
      <div className="flex items-center p-4 border-b border-gray-200">
        {isOpen ? (
          <h1 className=" font-bold text-gray-500">Menu</h1>
        ) : (
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-800"></span>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100 ml-auto"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <NavItem 
          icon={<Home size={20} /> }
          text="Home"
          to="/home"
          isOpen={isOpen}
        />
        <NavItem 
          icon={<Briefcase size={20} /> }
          text="Jobs" 
          to="/jobs"
          isOpen={isOpen}
        />
        <NavItem 
          icon={<Users size={20} /> }
          text="Clients" 
          to="/clients"
          isOpen={isOpen}
        />
        
        {/* Users section */}
        <NavItem 
          icon={<UserCheck size={20} /> }
          text="Users" 
          to="/users"
          isOpen={isOpen}
        />
      </nav>
    </div>
    </div>
    
  )
}

function NavItem({ 
  icon, 
  text, 
  to,
  isOpen
}: {
  icon: React.ReactNode
  text: string
  to: string
  isOpen: boolean
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center p-3 rounded-md transition-colors ${
          isActive ? 'bg-[#DDE4EC] text-gray-800' : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {isOpen && <span>{text}</span>}
    </NavLink>
  )
}