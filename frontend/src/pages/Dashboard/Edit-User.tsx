"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { CameraIcon } from 'lucide-react'
import api from "@/api/axios"

export default function EditUser() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    full_name: "",
    phone_number: "",
    role: "",
    status: "active",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    time_format: "12h",
    time_zone: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}/`)
        const userData = response.data
        
        // Handle both full_name and separate first/last name cases
        let firstName = ""
        let lastName = ""
        let fullName = userData.full_name || ""

        if (fullName) {
          const nameParts = fullName.split(' ')
          firstName = nameParts[0] || ""
          lastName = nameParts.slice(1).join(' ') || ""
        } else {
          fullName = `${userData.first_name || ""} ${userData.last_name || ""}`.trim()
          firstName = userData.first_name || ""
          lastName = userData.last_name || ""
        }

        setFormData({
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          phone_number: userData.phone_number || "",
          role: userData.role || "",
          status: userData.status || "active",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          zipcode: userData.zipcode || "",
          country: userData.country || "",
          time_format: userData.time_format || "12h",
          time_zone: userData.time_zone || "",
          email: userData.email || "",
          password: ""
        })

        if (userData.groups_assigned) {
          setSelectedGroups(userData.groups_assigned)
        }
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to fetch user data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const addGroup = (group: string) => {
    if (group && !selectedGroups.includes(group)) {
      setSelectedGroups([...selectedGroups, group])
    }
  }

  const removeGroup = (group: string) => {
    setSelectedGroups(selectedGroups.filter((g) => g !== group))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value }
      // Update full_name when first or last name changes
      if (name === 'first_name' || name === 'last_name') {
        updatedData.full_name = `${updatedData.first_name} ${updatedData.last_name}`.trim()
      }
      return updatedData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        groups_assigned: selectedGroups,
        // Ensure full_name is included in the payload
        full_name: formData.full_name || `${formData.first_name} ${formData.last_name}`.trim()
      }
      
      await api.put(`/users/${id}/`, payload)
      navigate('/users')
    } catch (err) {
      console.error("Error updating user:", err)
      setError("Failed to update user. Please try again.")
    }
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-[#F5F5F5]">
        <main className="flex-1 overflow-auto p-8 flex justify-center items-start pt-18">
          <div className="w-[1180px] bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800">Error</h1>
            <p className="text-red-500 mt-4">{error}</p>
            <Button onClick={() => navigate('/users')} className="mt-4">
              Back to Users
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
      <main className="flex-1 overflow-auto p-8 flex justify-center items-start pt-18">
        <div className="w-[1180px] bg-white rounded-lg shadow">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                {/* Profile Picture */}
                <div className="relative mr-4 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex flex-col items-center justify-center">
                    <CameraIcon className="text-gray-600 mb-1" size={24} />
                    <span className="text-[11px] font-medium text-gray-600">
                      Upload photo
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{formData.first_name} {formData.last_name}</h2>
                  <Badge variant="outline" className="mt-2 bg-green-100 text-green-800">
                    {formData.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                    <Input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                    <Input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                  </div> */}
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
                      <Select
                        onValueChange={(value) => setFormData({...formData, role: value})}
                        value={formData.role}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="hiring_manager">Manager</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <Select
                        onValueChange={(value) => setFormData({...formData, status: value})}
                        value={formData.status}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem value="inactive">
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                              Inactive
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Groups Assigned</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedGroups.map((group) => (
                        <Badge key={group} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                          {group}
                          <button
                            onClick={() => removeGroup(group)}
                            className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                            type="button"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={addGroup} defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Add group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HR Internal">HR Internal</SelectItem>
                        <SelectItem value="Recruitment RPA">Recruitment RPA</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                      <Input
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        placeholder="Enter zip code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                      <Select
                        onValueChange={(value) => setFormData({...formData, time_format: value})}
                        value={formData.time_format}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hours</SelectItem>
                          <SelectItem value="24h">24 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                      <Input
                        name="time_zone"
                        value={formData.time_zone}
                        onChange={handleChange}
                        placeholder="Enter time zone"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => navigate('/users')} type="button">
                  CANCEL
                </Button>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  SAVE USER
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}