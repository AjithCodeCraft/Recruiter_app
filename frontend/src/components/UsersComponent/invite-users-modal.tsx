"use client"

import { useState, useRef, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"
import api from "@/api/axios"
import { getCookie } from "@/lib/cookies"

interface EmailEntry {
  id: string
  email: string
  role: string
  error?: string
}

export default function InviteUsersModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [emailEntries, setEmailEntries] = useState<EmailEntry[]>([{ id: "1", email: "", role: "" }])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const handleEmailChange = (id: string, value: string) => {
    setEmailEntries(emailEntries.map((entry) => {
      if (entry.id === id) {
        const emails = value.split(",")
        const invalidEmails = emails.filter(e => e.trim() && !validateEmail(e.trim()))
        return {
          ...entry,
          email: value,
          error: invalidEmails.length > 0 ? `Invalid emails: ${invalidEmails.join(', ')}` : undefined
        }
      }
      return entry
    }))
  }

  const handleRoleChange = (id: string, value: string) => {
    setEmailEntries(emailEntries.map((entry) => (entry.id === id ? { ...entry, role: value } : entry)))
  }

  const addNewEmailEntry = () => {
    const newId = Date.now().toString()
    setEmailEntries([...emailEntries, { id: newId, email: "", role: "" }])
    setTimeout(() => {
      const lastInput = inputRefs.current[inputRefs.current.length - 1]
      if (lastInput) lastInput.focus()
    }, 0)
  }

  const removeEmailEntry = (id: string) => {
    if (emailEntries.length > 1) {
      setEmailEntries(emailEntries.filter((entry) => entry.id !== id))
    }
  }

  const removeEmail = (id: string, email: string) => {
    const entry = emailEntries.find((e) => e.id === id)
    if (entry) {
      const emails = entry.email.split(",").filter((e) => e.trim() !== email)
      handleEmailChange(id, emails.join(","))
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string, currentEmails: string) => {
    const input = e.currentTarget
    const value = input.value.trim()

    if (e.key === "Enter" && value) {
      e.preventDefault()
      if (!validateEmail(value)) {
        const updatedEmails = currentEmails ? `${currentEmails},${value}` : value
        handleEmailChange(id, updatedEmails)
        input.value = ""
        return
      }
      const updatedEmails = currentEmails ? `${currentEmails},${value}` : value
      handleEmailChange(id, updatedEmails)
      input.value = ""
    } else if (e.key === "," || e.key === " ") {
      e.preventDefault()
      if (value) {
        if (!validateEmail(value)) {
          const updatedEmails = currentEmails ? `${currentEmails},${value}` : value
          handleEmailChange(id, updatedEmails)
          input.value = ""
          return
        }
        const updatedEmails = currentEmails ? `${currentEmails},${value}` : value
        handleEmailChange(id, updatedEmails)
        input.value = ""
      }
    } else if (e.key === "Backspace" && !value && currentEmails) {
      const emails = currentEmails.split(",")
      if (emails.length > 0) {
        const newEmails = emails.slice(0, -1).join(",")
        handleEmailChange(id, newEmails)
      }
    }
  }

  const handleSendInvite = async () => {
    const entriesWithValidation = emailEntries.map(entry => {
      const emails = entry.email.split(",").filter(e => e.trim())
      const invalidEmails = emails.filter(e => !validateEmail(e.trim()))
      return {
        ...entry,
        error: invalidEmails.length > 0 ? `Invalid emails: ${invalidEmails.join(', ')}` : undefined
      }
    })

    setEmailEntries(entriesWithValidation)

    const hasInvalidEmails = entriesWithValidation.some(entry => entry.error)
    if (hasInvalidEmails) {
      toast.error("Please fix invalid email addresses before sending")
      return
    }

    const validEntries = entriesWithValidation.filter(entry => {
      const emails = entry.email.split(",").filter(e => e.trim())
      return emails.length > 0 && entry.role
    })

    if (validEntries.length === 0) {
      toast.error("Please add at least one valid email and select a role")
      return
    }

    setIsLoading(true)
    const token = getCookie('access_token')

    if (!token) {
      toast.error("Please login to send invites")
      setIsLoading(false)
      return
    }

    try {
   
      const allEmails = validEntries.flatMap(entry => 
        entry.email.split(",")
          .filter(e => e.trim())
          .map(email => ({
            email: email.trim(),
            role: entry.role
          }))
      )

      if (allEmails.length === 1) {
        // Single invite
        const { email, role } = allEmails[0]
        await api.post('/invitations/invite', { email, role }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        toast.success(`Invitation sent to ${email}`)
      } else {
        // Bulk invite
        await api.post('/invitations/invite/bulk', { invitations: allEmails }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        toast.success(`${allEmails.length} invitations have been sent`)
      }

      onOpenChange(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send invites")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!open) {
      setEmailEntries([{ id: "1", email: "", role: "" }])
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Invite Users</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-grow">
          <div className="space-y-6">
            {emailEntries.map((entry, index) => (
              <div key={entry.id} className="space-y-4">
                <div className="grid grid-cols-[3fr_1fr] gap-6 items-start">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <div className={`flex flex-wrap gap-2 p-2 border rounded-md bg-white min-h-[44px] ${entry.error ? 'border-red-500' : ''}`}>
                        {entry.email
                          .split(",")
                          .filter(Boolean)
                          .map((email, i) => (
                            <Badge
                              key={i}
                              variant={validateEmail(email.trim()) ? "secondary" : "destructive"}
                              className="flex items-center gap-1 pr-1"
                            >
                              {email.trim()}
                              <button
                                onClick={() => removeEmail(entry.id, email)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        <input
                          ref={el => {
                            inputRefs.current[index] = el
                          }}
                          className="flex-1 min-w-[150px] outline-none text-sm h-8 px-1"
                          placeholder={index === 0 ? "Enter email addresses..." : ""}
                          onKeyDown={(e) => handleInputKeyDown(e, entry.id, entry.email)}
                          onBlur={(e) => {
                            const value = e.target.value.trim()
                            if (value) {
                              const updatedEmails = entry.email ? `${entry.email},${value}` : value
                              handleEmailChange(entry.id, updatedEmails)
                              e.target.value = ""
                            }
                          }}
                        />
                      </div>
                      {entry.error && (
                        <p className="text-red-500 text-xs mt-1">{entry.error}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select value={entry.role} onValueChange={(value) => handleRoleChange(entry.id, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                    {emailEntries.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 mt-2"
                        onClick={() => removeEmailEntry(entry.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          className="text-blue-600 justify-start px-0 hover:bg-transparent hover:text-blue-700 mt-4"
          onClick={addNewEmailEntry}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add another user
        </Button>

        <DialogFooter className="border-t pt-4 mt-auto">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
            Cancel
          </Button>
          <Button 
            onClick={handleSendInvite} 
            className="bg-blue-600 hover:bg-blue-700 px-6"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Invites"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}