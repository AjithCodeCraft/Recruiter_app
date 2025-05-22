import type { Dispatch, SetStateAction } from "react"

interface TabsProps {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8 overflow-x-auto">
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
  )
}