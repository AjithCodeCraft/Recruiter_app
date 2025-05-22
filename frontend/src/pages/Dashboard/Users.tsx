"use client"

import { useState, useEffect } from "react"
// import Tabs from "./Tabs"
// import SearchBar from "./SearchBar"
// import UsersTable from "./UsersTable"
// import { User } from "./types"
import Tabs from "@/components/UsersComponent/Tabs"
import SearchBar from "@/components/UsersComponent/SearchBar"
import UsersTable from "@/components/UsersComponent/UsersTable"
import type { User } from "@/components/UsersComponent/types" // Use import type for type-only imports


export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState("Users")
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
      id: 1,
      name: "Lola Barr",
      email: "lolabarr@microsoft.ai",
      phone: "+1-212-456-7890",
      role: "Admin",
      status: "Active",
      lastActive: "10-12-2024",
    },
    {
      id: 1,
      name: "Lola Barr",
      email: "lolabarr@microsoft.ai",
      phone: "+1-212-456-7890",
      role: "Admin",
      status: "Active",
      lastActive: "10-12-2024",
    },
  ])
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-10 px-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Users</h1>
        
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <SearchBar 
          users={users} 
          setFilteredUsers={setFilteredUsers} 
        />
        
        <UsersTable 
          users={filteredUsers} 
          setUsers={setUsers}
          setFilteredUsers={setFilteredUsers}
        />
      </div>
    </div>
  )
}