"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// Import the server action
import { getUsers } from "@/lib/dao/TaskDAOAlt"

export function UserSelectCombobox({ initialUsers = [] }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [users, setUsers] = React.useState(initialUsers || [])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  // Selected user display name
  const selectedUser = users.find(user => user.id === value)?.name || ""

  // Function to search users
  const searchUsers = React.useCallback(async (query) => {
    setLoading(true)
    setError(null)
    
    try {
      // Call the server action
      const results = await getUsers(query)
      
      if (Array.isArray(results)) {
        setUsers(results)
      } else {
        console.error("fetchUsers did not return an array:", results)
        setUsers([])
        setError("Invalid response format")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      setUsers([])
      setError("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }, [])

  // Handle search input changes
  const handleSearchChange = (search) => {
    setSearchQuery(search)
    
    if (search.length >= 2 || search === "") {
      searchUsers(search)
    }
  }

  // Load initial users if needed
  React.useEffect(() => {
    if (!initialUsers || initialUsers.length === 0) {
      searchUsers("")
    }
  }, [searchUsers, initialUsers])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUser || "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Search users..." 
            value={searchQuery}
            onValueChange={handleSearchChange}
          />
          {loading && <div className="py-6 text-center text-sm">Loading...</div>}
          {error && <div className="py-6 text-center text-sm text-red-500">{error}</div>}
          {!loading && !error && (
            <>
              {users.length === 0 && <CommandEmpty>No users found.</CommandEmpty>}
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      const selectedUser = users.find(u => u.id === currentValue)
                      onSelect?.(currentValue === value ? null : selectedUser)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}