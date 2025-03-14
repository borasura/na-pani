'use client';

import { AutoComplete, type Option } from "./autocomplete";
import { useState, useEffect } from "react";
//import { getUsers } from "./server-actions"; // Import the server action
import { getUsers } from "@/lib/dao/TaskDAOAlt";



export function UserSearchAutocomplete() {

  //const DEFAULT_USERS = initialUsers

  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState<Option>();
  const [searchTerm, setSearchTerm] = useState("");
  const [userOptions, setUserOptions] = useState<Option[]>([]);

  // Convert users to options format expected by AutoComplete
  const convertUsersToOptions = (users: any[]): Option[] => {
    return users.map(user => ({
      value: user.id,
      label: user.username,
      email: user.email
    }));
  };

  // Load default users on initial mount
  useEffect(() => {
    const loadDefaultUsers = async () => {
      setLoading(true);
      try {
        // For initial load, we can either:
        // 1. Use the DEFAULT_USERS directly
        //setUserOptions(convertUsersToOptions(DEFAULT_USERS));
        
        // 2. Or fetch from server with empty query (uncomment below)
        console.log("Loading users intially")
        const initialUsers = await getUsers("");
        setUserOptions(convertUsersToOptions(initialUsers));
      } catch (error) {
        console.error("Failed to load default users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultUsers();
  }, []);

  // Handle search input changes
  const handleSearchInput = async (input: string) => {
    setSearchTerm(input);
    
    if (input.length === 0) {
      // If search is cleared, reset to default users
      const initialUsers = await getUsers("");
        setUserOptions(convertUsersToOptions(initialUsers));
      //setUserOptions(convertUsersToOptions(DEFAULT_USERS));
      return;
    }
    
    setLoading(true);
    try {
      const users = await getUsers(input);
      setUserOptions(convertUsersToOptions(users));
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce function to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== "") {
        handleSearchInput(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="not-prose mt-8 flex flex-col gap-4">
      <AutoComplete
        options={userOptions}
        emptyMessage="No users found."
        placeholder="Search for users..."
        isLoading={isLoading}
        onValueChange={(option) => {
          setValue(option);
          // You can perform additional actions when a user is selected
        }}
        value={value}
        disabled={false}
        onInputChange={setSearchTerm}
      />
      <span className="text-sm">
        Selected user: {value ? value?.label : "No user selected"}
      </span>
      {value && (
        <span className="text-sm">
          User email: {value.email}
        </span>
      )}
    </div>
  )
}
