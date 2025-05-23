// components/Sidebar.tsx
import { Menu, Home, Briefcase, Users, UserCheck, LogOut, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { deleteCookie } from '@/lib/cookies'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    deleteCookie('access_token')
    navigate('/login')
    window.location.reload()
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile toggle button (only shows on mobile) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed z-30 left-4 top-4 p-2 rounded-md bg-white shadow-md text-gray-500 md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-20 flex flex-col h-screen bg-white shadow-md transition-all duration-300 mt-14 ${
          isOpen ? 'w-64' : 'w-20'
        } ${isMobile ? (isOpen ? 'left-0' : '-left-20') : ''}`}
      >
        {/* Header with hamburger (hidden on mobile) */}
        {!isMobile && (
          <div className="flex items-center p-4 border-b border-gray-200">
            {isOpen ? (
              <h1 className="font-bold text-gray-500">Menu</h1>
            ) : (
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800"></span>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 hover:bg-gray-100 ml-auto"
            >
              <Menu size={20} />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem 
            icon={<Home size={20} />}
            text="Home"
            to="/home"
            isOpen={isOpen}
          />
          <NavItem 
            icon={<Briefcase size={20} />}
            text="Jobs" 
            to="/jobs"
            isOpen={isOpen}
          />
          <NavItem 
            icon={<Users size={20} />}
            text="Clients" 
            to="/clients"
            isOpen={isOpen}
          />
          <NavItem 
            icon={<UserCheck size={20} />}
            text="Users" 
            to="/users"
            isOpen={isOpen}
          />
        </nav>

        {/* Logout Button */}
<div className="p-4 border-t border-gray-200 mb-15"> {/* Added mt-auto to push it up */}
  <button
    onClick={handleLogout}
    className={`flex items-center w-full p-3 rounded-md text-gray-600 hover:bg-gray-100 transition-colors ${
      !isOpen ? 'justify-center' : ''
    }`}
  >
    <LogOut size={20} className="mr-3" />
    {isOpen && <span>Logout</span>}
  </button>
</div>
      </div>
    </>
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