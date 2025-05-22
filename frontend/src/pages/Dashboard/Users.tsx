"use client"

import { useState, useEffect } from "react"
import Tabs from "@/components/UsersComponent/Tabs"
import SearchBar from "@/components/UsersComponent/SearchBar"
import UsersTable from "@/components/UsersComponent/UsersTable"
import type { User } from "@/components/UsersComponent/types"

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState("Users")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUsers = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Dummy data
        const dummyUsers: User[] = [
          {
            id: 1,
            name: "Lola Barr",
            fullName: "Lola Barr",
            displayName: "Lola",
            email: "lolabarr@microsoft.ai",
            phone: "+1-212-456-7890",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            country: "USA",
            zipCode: "10001",
            role: "Admin",
            status: "Active",
            lastActive: "10-12-2024",
            timeFormat: "",
            timeZone: ""
          },
          {
            id: 2,
            name: "John Doe",
            fullName: "John Doe",
            displayName: "John",
            email: "johndoe@example.com",
            phone: "+1-212-555-7890",
            address: "456 Elm St",
            city: "Los Angeles",
            state: "CA",
            country: "USA",
            zipCode: "90001",
            role: "User",
            status: "Active",
            lastActive: "10-12-2024",
            timeFormat: "",
            timeZone: ""
          },
          {
            id: 3,
            name: "Jane Smith",
            fullName: "Jane Smith",
            displayName: "Jane",
            email: "janesmith@example.com",
            phone: "+1-212-555-1234",
            address: "789 Oak St",
            city: "Chicago",
            state: "IL",
            country: "USA",
            zipCode: "60601",
            role: "Guest",
            status: "Inactive",
            lastActive: "10-12-2024",
            timeFormat: "",
            timeZone: ""
          },
        ]

        setUsers(dummyUsers)
        setFilteredUsers(dummyUsers)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-18 px-4">
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
