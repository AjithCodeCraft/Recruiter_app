import { ChevronDown, X } from "lucide-react"

interface FilterPanelProps {
  selectedRoles: string[]
  setSelectedRoles: (roles: string[]) => void
  selectedGroup: string[]
  setSelectedGroup: (groups: string[]) => void
  removeRole: (role: string) => void
  removeGroup: (group: string) => void
  handleSearch: () => void
  handleReset: () => void
}

export default function FilterPanel({
  selectedRoles,
  setSelectedRoles,
  selectedGroup,
  setSelectedGroup,
  removeRole,
  removeGroup,
  handleSearch,
  handleReset,
}: FilterPanelProps) {
  return (
  <div className="border border-gray-200 rounded-md p-4 bg-white shadow-lg w-full md:w-86 min-h-[300px]">

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <div className="relative">
          <select
            className="border border-gray-300 rounded-md p-2 w-full appearance-none pr-8 text-sm"
            onChange={(e) => {
              if (e.target.value && !selectedRoles.includes(e.target.value)) {
                setSelectedRoles([...selectedRoles, e.target.value])
              }
            }}
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
            onChange={(e) => {
              if (e.target.value && !selectedGroup.includes(e.target.value)) {
                setSelectedGroup([...selectedGroup, e.target.value])
              }
            }}
          >
            <option value="">Select groups</option>
            <option value="HR Internal">HR Internal</option>
            <option value="Recruitment RPA">Recruitment RPA</option>
            <option value="Executive">Executive</option>
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
  )
}