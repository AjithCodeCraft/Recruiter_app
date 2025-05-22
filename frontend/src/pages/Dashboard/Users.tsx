"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, MoreVertical, X, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react"

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState("Users")
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  interface User {
    id: number
    name: string
    email: string
    phone: string
    role: string
    status: string
    lastActive: string
  }

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Lola Barr",
      email: "lolabarr@microsoft.ai",
      phone: "+1-212-456-7890",
      role: "Admin",
      status: "Active",
      lastActive: "10-12-2024",
    },
    {
      id: 2,
      name: "Everest Glenn",
      email: "everestglenn@microsoft.ai",
      phone: "+1-212-456-7890",
      role: "Manager",
      status: "Active",
      lastActive: "10-12-2024",
    },
    {
      id: 3,
      name: "Rosie Hendrix",
      email: "rhendrix@microsoft.ai",
      phone: "+1-212-456-7890",
      role: "Recruiter",
      status: "Inactive",
      lastActive: "10-12-2024",
    },
  ])

  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    filterUsers()
  }, [searchQuery, selectedRoles, selectedGroup])

  const removeRole = (role: string) => {
    setSelectedRoles(selectedRoles.filter((r: string) => r !== role))
  }

  const removeGroup = (group: string) => {
    setSelectedGroup(selectedGroup.filter((g: string) => g !== group))
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(user.role)
      const matchesGroup = selectedGroup.length === 0 || selectedGroup.includes(user.role) // Assuming groups are roles for simplicity

      return matchesSearch && matchesRole && matchesGroup
    })

    setFilteredUsers(filtered)
  }

  const handleSearch = () => {
    setShowFilters(false)
    filterUsers()
  }

  const handleReset = () => {
    setSelectedRoles([])
    setSelectedGroup([])
    setSearchQuery("")
    setFilteredUsers(users)
  }

  const toggleDropdown = (userId: number) => {
    setActiveDropdown(activeDropdown === userId ? null : userId)
  }

  const editUser = (userId: number) => {
    console.log("Edit user", userId)
    setActiveDropdown(null)
  }

  const deleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
    setFilteredUsers(filteredUsers.filter((user) => user.id !== userId))
    setActiveDropdown(null)
  }

  const toggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        }
        return user
      })
    )

    setFilteredUsers(
      filteredUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        }
        return user
      })
    )
    setActiveDropdown(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-10 px-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Users</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 font-medium text-sm ${
                activeTab === "Users"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("Users")}
            >
              Users
            </button>
            <button
              className={`pb-4 px-1 font-medium text-sm ${
                activeTab === "Pending"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("Pending")}
            >
              Pending
            </button>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-12 relative ">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-2 flex items-center px-2"
              onClick={toggleFilters}
            >
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap">
            INVITE USERS
          </button>

          {/* Filter Panel */}
          {showFilters && (
            <div className="absolute top-full left-0 mt-2 border border-gray-200 rounded-md p-4 bg-white shadow-lg z-10 w-full md:w-72">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full appearance-none pr-8 text-sm"
                    onChange={(e) => setSelectedRoles([...selectedRoles, e.target.value])}
                  >
                    <option value="">Select roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Recruiter">Recruiter</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="p-2 border border-gray-300 rounded-md min-h-10 flex flex-wrap gap-2 mt-2">
                  {selectedRoles.length === 0 && (
                    <span className="text-gray-400 text-sm">No roles selected</span>
                  )}
                  {selectedRoles.map((role) => (
                    <div key={role} className="bg-gray-100 rounded-md px-2 py-1 flex items-center text-sm">
                      {role}
                      <button
                        onClick={() => removeRole(role)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                <div className="relative">
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full appearance-none pr-8 text-sm"
                    onChange={(e) => setSelectedGroup([...selectedGroup, e.target.value])}
                  >
                    <option value="">Select groups</option>
                    <option value="HR Internal">HR Internal</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="p-2 border border-gray-300 rounded-md min-h-10 flex flex-wrap gap-2 mt-2">
                  {selectedGroup.length === 0 && (
                    <span className="text-gray-400 text-sm">No groups selected</span>
                  )}
                  {selectedGroup.map((group) => (
                    <div key={group} className="bg-gray-100 rounded-md px-2 py-1 flex items-center text-sm">
                      {group}
                      <button
                        onClick={() => removeGroup(group)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex-1"
                  onClick={handleSearch}
                >
                  SEARCH
                </button>
                <button
                  className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium flex-1"
                  onClick={handleReset}
                >
                  RESET
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === user.id && (
                      <div
                        ref={dropdownRef}
                        className="origin-top-right absolute right-6 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                        style={{ overflow: 'visible' }}
                      >
                        <div className="py-1" style={{ overflow: 'hidden' }}>
                          <button
                            onClick={() => editUser(user.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {user.status === "Active" ? (
                              <>
                                <ToggleLeft className="h-4 w-4 mr-2" />
                                Set Inactive
                              </>
                            ) : (
                              <>
                                <ToggleRight className="h-4 w-4 mr-2" />
                                Set Active
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
