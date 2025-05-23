"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"
import FilterPanel from "./FilterPanel"
import type { User } from "./types"
import InviteUsersModal from "./invite-users-modal"

interface SearchBarProps {
  users: User[]
  setFilteredUsers: (users: User[]) => void
}

export default function SearchBar({ users, setFilteredUsers }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  // Add useEffect to trigger search when searchQuery or filters change
  useEffect(() => {
    filterUsers()
  }, [searchQuery, selectedRoles, selectedGroup, users])

  const filterUsers = () => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(user.role)
      const matchesGroup = selectedGroup.length === 0 || 
        (user.groupsAssigned && user.groupsAssigned.some(group => selectedGroup.includes(group)))

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

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const removeRole = (role: string) => {
    setSelectedRoles(selectedRoles.filter((r: string) => r !== role))
  }

  const removeGroup = (group: string) => {
    setSelectedGroup(selectedGroup.filter((g: string) => g !== group))
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-12 relative">
      <div className="relative w-full md:w-1/3 left-120">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="absolute inset-y-0 right-2 flex items-center px-2" onClick={toggleFilters}>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
        onClick={() => setInviteModalOpen(true)}
      >
        INVITE USERS
      </button>

      <InviteUsersModal open={inviteModalOpen} onOpenChange={setInviteModalOpen} />

      {showFilters && (
        <FilterPanel
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          removeRole={removeRole}
          removeGroup={removeGroup}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      )}
    </div>
  )
}