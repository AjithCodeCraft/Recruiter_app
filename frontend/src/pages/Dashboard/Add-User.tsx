"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { X } from "lucide-react"
import { CameraIcon } from 'lucide-react'; // If you're using lucide-react (or use any SVG)


export default function AddUser() {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    timeFormat: "12 Hours",
    timeZone: ""
  })

  const addGroup = (group: string) => {
    if (!selectedGroups.includes(group)) {
      setSelectedGroups([...selectedGroups, group])
    }
  }

  const removeGroup = (group: string) => {
    setSelectedGroups(selectedGroups.filter((g) => g !== group))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
   
    
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-8 flex justify-center items-start pt-18">
          <div className="w-[1180px] bg-white rounded-lg shadow">
            {/* Form Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800">Add User</h1>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                    {/* Profile Picture */}
                 <div className="relative mr-4 flex flex-col items-center">
      {/* Circle with camera icon */}
      <div className="w-20 h-20 rounded-full bg-gray-200 flex flex-col items-center justify-center">
        <CameraIcon className="text-gray-600 mb-1" size={24} />
        {/* Upload photo text inside the circle, below camera icon */}
        <span className="text-[11px] font-medium text-gray-600">
          Upload photo
        </span>
      </div>
    </div>
         <div>
                    <h2 className="text-xl font-semibold">New User</h2>
                    {/* <Badge variant="outline" className="mt-2 bg-green-100 text-green-800">
                      Active
                    </Badge> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <Input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name*</label>
                    <Input 
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      placeholder="Enter display name" 
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
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number" 
                    />
                  </div>
                </div>
                
                {/* Right Column */}
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
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Recruiter">Recruiter</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
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
                      <Select 
                        onValueChange={(value) => setFormData({...formData, state: value})}
                        value={formData.state}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                      <Input 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Enter zip code" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <Select 
                        onValueChange={(value) => setFormData({...formData, country: value})}
                        value={formData.country}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                      <Select 
                        onValueChange={(value) => setFormData({...formData, timeFormat: value})}
                        value={formData.timeFormat}
                      >
                        <SelectTrigger  className="w-full">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12 Hours">12 Hours</SelectItem>
                          <SelectItem value="24 Hours">24 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                      <Select 
                        onValueChange={(value) => setFormData({...formData, timeZone: value})}
                        value={formData.timeZone}
                      >
                        <SelectTrigger  className="w-full">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EST">(GMT-5:00) Eastern Time</SelectItem>
                          <SelectItem value="CST">(GMT-6:00) Central Time</SelectItem>
                          <SelectItem value="MST">(GMT-7:00) Mountain Time</SelectItem>
                          <SelectItem value="PST">(GMT-8:00) Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <Button variant="outline">CANCEL</Button>
                <Button className="bg-blue-500 hover:bg-blue-600">SAVE USER</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
 
  )
}