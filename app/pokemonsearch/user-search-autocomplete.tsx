'use client';

import { useState, useRef, useCallback, type KeyboardEvent, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUsers } from "@/lib/dao/TaskDAOAlt";

import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Skeleton } from "@/components/ui/skeleton";

export type UserOption = {
  value: string;
  label: string;
  email: string;
};

// Define the type for the props, including the userSelected function
// interface ClientComponentProps {
//   userSelected: (username: string, id: string) => void; // Specify the function type
// }

export function UserSearchAutocomplete({ initValue, onChange }) {
  console.log(">> value is ", initValue)
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState<UserOption | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<UserOption[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Convert users to options format
  const convertUsersToOptions = (users: any[]): UserOption[] => {
    return users.map(user => ({
      value: user.id,
      label: user.username,
      email: user.email
    }));
  };

  // Load users based on search term
  const loadUsers = async (searchTerm: string) => {
    setLoading(true);
    try {
      const users = await getUsers(searchTerm);
      setOptions(convertUsersToOptions(users));
    } catch (error) {
      console.error("Error searching users:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }

    // if (initValue && initValue !== "") {
    //   console.log(">> Finding options to select")
    //   console.log(options)
    //   const optionToSelect = options.find(
    //     (option) => option.label === initValue
    //   );
    //   if (optionToSelect) {
    //     console.log(">> Option selected")
    //     setSelected(optionToSelect);
    //     //console.log("user selected ", optionToSelect.label, ", ", optionToSelect.value)
    //   }
    // }
  };

  // Handle input value changes with debouncing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      loadUsers(inputValue);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [inputValue]);

  // Load initial users on mount
  useEffect(() => {
    console.log(">>> Inside INITIAL use effect with value as ", initValue)
    loadUsers(initValue);
    
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // Handle enter key
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          //console.log("user selected ", optionToSelect.label, ", ", optionToSelect.value)
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label || inputValue);
  }, [selected, inputValue]);

  const handleSelectOption = useCallback((selectedOption: UserOption) => {
    setInputValue(selectedOption.label);
    setSelected(selectedOption);
    console.log("user selected in CC ", selectedOption.label, ", ", selectedOption.value)
    //userSelected(selectedOption.label, selectedOption.value)
    onChange(selectedOption.value)

    // Close the dropdown after selection
    setTimeout(() => {
      inputRef?.current?.blur();
    }, 0);
  }, []);

  return (
    <div className="not-prose mt-8 flex flex-col gap-4">
      <CommandPrimitive onKeyDown={handleKeyDown}>
        <div>
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={isLoading ? undefined : setInputValue}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={initValue}
            disabled={false}
            className="text-base"
          />
        </div>
        <div className="relative mt-1">
          <div
            className={cn(
              "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
              isOpen ? "block" : "hidden"
            )}
          >
            <CommandList className="rounded-lg ring-1 ring-slate-200">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selected?.value === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => handleSelectOption(option)}
                        className={cn(
                          "flex w-full items-center gap-2",
                          !isSelected ? "pl-8" : null
                        )}
                      >
                        {isSelected ? <Check className="w-4" /> : null}
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {!isLoading && options.length === 0 ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                  No users found.
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        </div>
      </CommandPrimitive>

      {/* <span className="text-sm">
        Selected user: {selected ? selected.label : "No user selected"}
      </span>
      {selected && (
        <span className="text-sm">
          User email: {selected.email}
        </span>
      )} */}
    </div>
  );
}