"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import type { User } from './types' // Use import type for type-only imports

interface UserRowProps {
  user: User
  users: User[] // Add users as a prop
  filteredUsers: User[] // Add filteredUsers as a prop
  setUsers: (users: User[]) => void
  setFilteredUsers: (users: User[]) => void
}

export default function UserRow({ user, users, filteredUsers, setUsers, setFilteredUsers }: UserRowProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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

  const toggleDropdown = (userId: number) => {
    setActiveDropdown(activeDropdown === userId ? null : userId)
  }

  const editUser = (userId: number) => {
    navigate(`/users/edit/${userId}`)
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
  )
}
