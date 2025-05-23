"use client"

import { useState, useEffect } from "react"
import Tabs from "@/components/UsersComponent/Tabs"
import SearchBar from "@/components/UsersComponent/SearchBar"
import UsersTable from "@/components/UsersComponent/UsersTable"
import type { User } from "@/components/UsersComponent/types"
import api from "@/api/axios"

export default function UsersManagement() {
  const [activeTab, setActiveTab] = useState("Users")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/")
        // Map API response to User type and filter out admin users
        const apiUsers = response.data
          .filter((user: any) => user.role !== "admin") // Filter out admin users
          .map((user: any) => ({
            id: user.id,
            name: user.full_name,
            fullName: user.full_name,
            displayName: user.full_name.split(' ')[0],
            email: user.email || "",
            phone: user.phone_number || "",
            address: user.address || "",
            city: user.city || "",
            state: user.state || "",
            country: user.country || "",
            zipCode: user.zipcode || "",
            role: user.role === "hiring_manager" 
      ? "Manager" 
      : user.role === "recruiter" 
        ? "Recruiter" 
        : user.role,
            status: user.status,
            lastActive: user.updated_at,
            timeFormat: user.time_format,
            timeZone: user.time_zone,
            groupsAssigned: user.groups_assigned || []
          }))
        
        setUsers(apiUsers)
        setFilteredUsers(apiUsers)
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to fetch users. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-18 px-4">
        <div className="bg-white rounded-lg shadow-sm w-full max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Users</h1>
          <p>Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-18 px-4">
        <div className="bg-white rounded-lg shadow-sm w-full max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Users</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

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