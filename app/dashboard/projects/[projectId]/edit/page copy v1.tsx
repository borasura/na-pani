"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, ChevronsUpDown, Loader2, Plus, Save, Search, Trash2, X } from "lucide-react"
import { format } from "date-fns"
import { debounce } from "lodash"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
// Assuming CommandLoading might be a custom component you have, similar to page.tsx
// If not, you can replicate its simple loading display or remove it.
// For this example, let's assume it's available or create a simple version if needed.
// import { CommandLoading } from "./command"; // Or appropriate path

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Assuming these functions are available and work similarly to page.tsx
// You'll need to implement/adjust these in your TaskDAOAlt.ts or equivalent
import { getProjectById, getUsers, updateProject, updateProjectPermissions, updateProjectPermissionsDelta, deleteProject, getProjectTeamMembers } from "@/lib/dao/TaskDAOAlt"
//import { getProjectById, getUsers, updateProject} from "@/lib/dao/TaskDAOAlt"

// Types from page.tsx (or a shared types file)
type TeamMember = {
  id: string
  name: string // Assuming 'username' from getUsers maps to 'name' here or adjust as needed
  email: string
  role: string // This might be a general role, not project-specific permission
  avatar: string
}

type TeamMemberWithPermission = TeamMember & {
  permission: "editor" | "commenter" | "viewer" | "owner"
}

// Color options (can be shared or redefined)
const colorOptions = [
  { name: "Indigo", value: "#4f46e5" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
  // Add a fallback color if project.color_code is not in this list
  { name: "Default", value: "#71717a" }, // Example fallback (zinc)
]

// Mock API function similar to page.tsx, using getUsers
const fetchTeamMembersApi = async (query = "", page = 1, limit = 10): Promise<TeamMember[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay
  const users = await getUsers(query) // Assuming getUsers returns users in the expected format

  // Map API response to TeamMember type if necessary
  return users.map(user => ({
    id: user.id,
    name: user.username, // Adjust if field names differ
    email: user.email,
    role: user.role, // General role
    avatar: user.avatar || `/placeholder.svg?height=32&width=32` // Fallback avatar
  })).slice((page - 1) * limit, page * limit);
}


export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    status: "Planning",
    priority: "Medium",
    color: colorOptions[0].value,
    selectedTeamMembers: [] as TeamMemberWithPermission[],
    owner: "", // Owner ID
    ownerDetails: null as TeamMember | null,
  })

  const [teamMembersForSelection, setTeamMembersForSelection] = useState<TeamMember[]>([])
  const [isLoadingTeamMembers, setIsLoadingTeamMembers] = useState(false)
  const [teamMembersSearch, setTeamMembersSearch] = useState("")

  // Add this state near your other useState calls
  const [initialTeamMembers, setInitialTeamMembers] = useState<TeamMemberWithPermission[]>([]);

  const [potentialOwners, setPotentialOwners] = useState<TeamMember[]>([])
  const [isLoadingOwners, setIsLoadingOwners] = useState(false)
  const [ownerSearch, setOwnerSearch] = useState("")

  const [selectedMemberId, setSelectedMemberId] = useState("")
  const [selectedMemberPermission, setSelectedMemberPermission] = useState<"editor" | "commenter" | "viewer">("editor")
  const [selectedMemberDetails, setSelectedMemberDetails] = useState<TeamMember | null>(null)

  // Add this state near your other useState calls
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Debounced search for team members (for adding new members)
  const debouncedTeamMemberSearch = useCallback(
    debounce(async (query: string) => {
      setIsLoadingTeamMembers(true)
      try {
        const members = await fetchTeamMembersApi(query)
        setTeamMembersForSelection(members)
      } catch (error) {
        console.error("Error searching team members:", error)
      } finally {
        setIsLoadingTeamMembers(false)
      }
    }, 300),
    [],
  )

  // Debounced search for owners
  const debouncedOwnerSearch = useCallback(
    debounce(async (query: string) => {
      setIsLoadingOwners(true)
      try {
        const owners = await fetchTeamMembersApi(query)
        setPotentialOwners(owners)
      } catch (error) {
        console.error("Error searching owners:", error)
      } finally {
        setIsLoadingOwners(false)
      }
    }, 300),
    [],
  )

  useEffect(() => {
    if (teamMembersSearch) {
      debouncedTeamMemberSearch(teamMembersSearch)
    } else { // Load initial/empty search
        debouncedTeamMemberSearch("");
    }
    return () => {
      debouncedTeamMemberSearch.cancel()
    }
  }, [teamMembersSearch, debouncedTeamMemberSearch])

  useEffect(() => {
    if (ownerSearch) {
      debouncedOwnerSearch(ownerSearch)
    } else { // Load initial/empty search
        debouncedOwnerSearch("");
    }
    return () => {
      debouncedOwnerSearch.cancel()
    }
  }, [ownerSearch, debouncedOwnerSearch])


  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      setIsLoadingPage(true);
      try {
        const projectData = await getProjectById(projectId);
        if (!projectData) {
          setErrors({ form: "Project not found." });
          setIsLoadingPage(false);
          return;
        }

        // Fetch existing team members with permissions for this project
        const currentProjectTeam = await getProjectTeamMembers(projectId) as TeamMemberWithPermission[]; // Casting as example

        // Fetch details for the owner
        let ownerDetails = null;
        if (projectData.owner_id) { // Assuming owner_id is available
            const ownerUser = await getUsers(projectData.owner_id); // Assuming getUsers can fetch by ID or you have a getUserById
            if (ownerUser && ownerUser.length > 0) {
                 ownerDetails = {
                    id: ownerUser[0].id,
                    name: ownerUser[0].username,
                    email: ownerUser[0].email,
                    role: ownerUser[0].role,
                    avatar: ownerUser[0].avatar || `/placeholder.svg?height=32&width=32`
                };
            }
        }


        setFormData({
          name: projectData.name,
          description: projectData.description,
          startDate: new Date(projectData.start_date),
          endDate: new Date(projectData.end_date),
          status: projectData.status,
          priority: projectData.priority,
          color: projectData.color_code || colorOptions[0].value,
          selectedTeamMembers: currentProjectTeam || [],
          owner: projectData.owner_id || "",
          ownerDetails: ownerDetails,
        });

        // Pre-populate search lists
        const initialUsers = await fetchTeamMembersApi("");
        setTeamMembersForSelection(initialUsers);
        // Store the initial team members
        setInitialTeamMembers(currentProjectTeam || []); // 
        setPotentialOwners(initialUsers);

      } catch (error) {
        console.error("Error loading project:", error)
        setErrors({ form: "There was an error loading the project. Please try again." })
      } finally {
        setIsLoadingPage(false)
      }
    }
    loadProject()
  }, [projectId])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Project name is required"
    if (!formData.description.trim()) newErrors.description = "Project description is required"
    if (formData.endDate < formData.startDate) newErrors.endDate = "End date must be after start date"
    if (!formData.owner) newErrors.owner = "Project owner is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await updateProject(projectId, {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        color_code: formData.color,
        owner_id: formData.owner, // Ensure this is owner_id
        start_date: formData.startDate,
        end_date: formData.endDate,
      });

        // --- Calculate Team Member Changes ---
      const initialMemberMap = new Map(initialTeamMembers.map(member => [member.id, member]));
      const currentMemberMap = new Map(formData.selectedTeamMembers.map(member => [member.id, member]));

      const changes: { userId: string; action: 'add' | 'delete' | 'update'; role?: string }[] = [];

      // Find deleted members
      initialTeamMembers.forEach(initialMember => {
        if (!currentMemberMap.has(initialMember.id)) {
          changes.push({ userId: initialMember.id, action: 'delete' });
        }
      });

      // Find added and updated members
      formData.selectedTeamMembers.forEach(currentMember => {
        const initialMember = initialMemberMap.get(currentMember.id);

        if (!initialMember) {
          // Member was added
          changes.push({ userId: currentMember.id, action: 'add', role: currentMember.permission });
        } else if (initialMember.permission !== currentMember.permission) {
          // Member role was updated
          changes.push({ userId: currentMember.id, action: 'update', role: currentMember.permission });
        }
      });
      // --- End Calculate Team Member Changes ---

      // const memberPermissions = formData.selectedTeamMembers.map((member) => ({
      //   project_id: projectId,
      //   user_id: member.id,
      //   role: member.permission, // This is the permission (editor, viewer)
      // }));
      // await updateProjectPermissions(projectId, memberPermissions); // You might need a way to add/remove/update specific permissions

      // Send only the changes to the backend
    // You will need to update your backend's updateProjectPermissions function
    // to accept this new 'changes' array format.
      await updateProjectPermissionsDelta(projectId, changes);

      router.push(`/dashboard/projects/${projectId}/tasks`); // Or to project overview
    } catch (error) {
      console.error("Error updating project:", error)
      setErrors({ form: "There was an error updating the project." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteProject(projectId);
      router.push("/dashboard/projects"); // Redirect to projects list
    } catch (error) {
      console.error("Error deleting project:", error)
      setErrors({ form: "There was an error deleting the project." })
      setIsDeleting(false) // Keep dialog open on error
    }
    // No finally here, as we only want to stop spinning if there's an error or navigation happens
  }

  const handleOwnerSelect = (memberId: string) => {
    const member = potentialOwners.find((m) => m.id === memberId)
    if (member) {
      setFormData({ ...formData, owner: memberId, ownerDetails: member });
    }
  }

  const handleTeamMemberSelectForAddition = (memberId: string) => {
    const member = teamMembersForSelection.find((m) => m.id === memberId)
    if (member) {
      setSelectedMemberId(memberId)
      setSelectedMemberDetails(member)
    }
  }

  const handleRoleChange = (memberId: string, newPermission: "editor" | "commenter" | "viewer" | "owner") => {
    setFormData((prev) => ({
      ...prev,
      selectedTeamMembers: prev.selectedTeamMembers.map((member) =>
        member.id === memberId ? { ...member, permission: newPermission } : member
      ),
    }));
  };

  const addTeamMemberToList = () => {
    if (selectedMemberId && selectedMemberDetails) {
      if (formData.selectedTeamMembers.some((m) => m.id === selectedMemberId) || selectedMemberId === formData.owner) {
        return // Already added or is the owner
      }
      setFormData((prev) => ({
        ...prev,
        selectedTeamMembers: [
          ...prev.selectedTeamMembers,
          { ...selectedMemberDetails, permission: selectedMemberPermission },
        ],
      }))
      setSelectedMemberId("")
      setSelectedMemberDetails(null)
      setSelectedMemberPermission("editor") // Reset permission
    }
  }

  const removeTeamMemberFromList = (memberId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTeamMembers: prev.selectedTeamMembers.filter((m) => m.id !== memberId),
    }))
  }

  const getPermissionColor = (permission: string) => {
    // Copied from page.tsx
    switch (permission) {
      case "editor":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "commenter":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "viewer":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
      default:
        return ""
    }
  }

  // Simple CommandLoading component if not imported
  const CommandLoading = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 text-sm text-center text-muted-foreground">{children}</div>
  );


  if (isLoadingPage) {
    return (
      <div className="container mx-auto p-4 max-w-4xl flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading project data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          {/* Adjust link as per your routing for project overview */}
          <Link href={`/dashboard/projects/${projectId}/tasks`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">Back to Project</div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground mt-1">Update project details and team members</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the project and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Deleting...</>) : "Delete Project"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {errors.form && <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Project Name <span className="text-destructive">*</span></Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={errors.name ? "border-destructive" : ""} />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className={errors.description ? "border-destructive" : ""} />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>
              {/* Status & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Execution">Execution</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Start & End Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />{format(new Date(formData.startDate), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={new Date(formData.startDate)} onSelect={(date) => date && setFormData({ ...formData, startDate: date })} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date {errors.endDate && <span className="text-destructive ml-1">*</span>}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={`w-full justify-start text-left font-normal ${errors.endDate ? "border-destructive" : ""}`}>
                        <Calendar className="mr-2 h-4 w-4" />{format(new Date(formData.endDate), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={new Date(formData.endDate)} onSelect={(date) => date && setFormData({ ...formData, endDate: date })} initialFocus disabled={(date) => date < new Date(formData.startDate)} />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
                </div>
              </div>
              {/* Color */}
              <div className="space-y-2">
                <Label>Project Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button key={color.value} type="button" className={`h-8 w-8 rounded-full border-2 ${formData.color === color.value ? "border-primary ring-2 ring-primary" : "border-transparent"}`} style={{ backgroundColor: color.value }} onClick={() => setFormData({ ...formData, color: color.value })} title={color.name}>
                      {formData.color === color.value && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>Manage team members and project owner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Project Owner */}
              <div className="space-y-2">
                <Label htmlFor="owner">Project Owner <span className="text-destructive">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className={`w-full justify-between ${errors.owner ? "border-destructive" : ""}`}>
                      {formData.ownerDetails ? (
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2"><AvatarImage src={formData.ownerDetails.avatar} alt={formData.ownerDetails.name} /><AvatarFallback>{formData.ownerDetails.name?.charAt(0)}</AvatarFallback></Avatar>
                          {formData.ownerDetails.name}
                        </div>
                      ) : "Select project owner"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandInput placeholder="Search users..." className="h-9 border-0 focus:ring-0" value={ownerSearch} onValueChange={setOwnerSearch} />
                      </div>
                      <CommandList>
                        {isLoadingOwners ? (
                          <CommandLoading><Loader2 className="h-4 w-4 animate-spin mr-2 inline" />Loading users...</CommandLoading>
                        ) : (
                          <>
                            <CommandEmpty>No user found.</CommandEmpty>
                            <CommandGroup>
                              {potentialOwners.map((member) => (
                                <CommandItem key={member.id} value={member.name} onSelect={() => handleOwnerSelect(member.id)}>
                                  <Avatar className="h-6 w-6 mr-2"><AvatarImage src={member.avatar} alt={member.name} /><AvatarFallback>{member.name?.charAt(0)}</AvatarFallback></Avatar>
                                  <div className="flex-1"><p>{member.name}</p><p className="text-xs text-muted-foreground">{member.email}</p></div>
                                  {formData.owner === member.id && <Check className="ml-2 h-4 w-4" />}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.owner && <p className="text-sm text-destructive">{errors.owner}</p>}
              </div>

              {/* Team Members */}
              <div className="space-y-2">
                <Label>Team Members</Label>
                <div className="border rounded-md">
                  <div className="p-2 flex flex-wrap gap-1 min-h-[40px]">
                  {formData.selectedTeamMembers.length > 0 ? (
  formData.selectedTeamMembers.map((member) => (
    <div key={member.id} className="flex items-center gap-1 bg-muted rounded-md pl-1 pr-2 py-1">
      <Avatar className="h-5 w-5"><AvatarImage src={member.avatar} alt={member.name} /><AvatarFallback>{member.name?.charAt(0)}</AvatarFallback></Avatar>
      <span className="text-sm">{member.name}</span>

      {/* Role selection */}
      {editingMemberId === member.id ? (
        <Select
          value={member.permission}
          onValueChange={(value: "editor" | "commenter" | "viewer" | "owner") => { // Added 'owner' though likely handled separately
            handleRoleChange(member.id, value);
            setEditingMemberId(null); // Close select after change
          }}
          open={true} // Keep open when editing
          onOpenChange={(open) => !open && setEditingMemberId(null)} // Close when clicking outside
        >
          <SelectTrigger className="w-[120px] h-6 text-xs">
             <SelectValue placeholder="Permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="commenter">Commenter</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
             {/* Optionally add 'owner' if applicable, but typically owner is selected separately */}
             {/* <SelectItem value="owner">Owner</SelectItem> */}
          </SelectContent>
        </Select>
      ) : (
         <Badge
           variant="secondary"
           className={`text-xs ml-1 cursor-pointer ${getPermissionColor(member.permission)}`}
           onClick={() => setEditingMemberId(member.id)}
         >
           {member.permission.charAt(0).toUpperCase() + member.permission.slice(1)}
         </Badge>
      )}
      {/* End Role Selection */}

      <button type="button" onClick={() => removeTeamMemberFromList(member.id)} className="h-4 w-4 rounded-full ml-1 hover:bg-destructive/20 flex items-center justify-center"> <X className="h-3 w-3" /></button>
    </div>
  ))
) : (<div className="text-sm text-muted-foreground p-1">No team members assigned.</div>)}
                  </div>
                  <Separator />
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-full justify-between">
                              {selectedMemberDetails ? (
                                <div className="flex items-center"><Avatar className="h-6 w-6 mr-2"><AvatarImage src={selectedMemberDetails.avatar} alt={selectedMemberDetails.name} /><AvatarFallback>{selectedMemberDetails.name?.charAt(0)}</AvatarFallback></Avatar>{selectedMemberDetails.name}</div>
                              ) : "Select team member to add"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <div className="flex items-center border-b px-3">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <CommandInput placeholder="Search users..." className="h-9 border-0 focus:ring-0" value={teamMembersSearch} onValueChange={setTeamMembersSearch}/>
                              </div>
                              <CommandList>
                                {isLoadingTeamMembers ? (
                                  <CommandLoading><Loader2 className="h-4 w-4 animate-spin mr-2 inline" />Loading users...</CommandLoading>
                                ) : (
                                  <>
                                    <CommandEmpty>No user found.</CommandEmpty>
                                    <CommandGroup>
                                      {teamMembersForSelection
                                        .filter(member => member.id !== formData.owner && !formData.selectedTeamMembers.some(m => m.id === member.id))
                                        .map((member) => (
                                        <CommandItem key={member.id} value={member.name} onSelect={() => handleTeamMemberSelectForAddition(member.id)}>
                                          <Avatar className="h-6 w-6 mr-2"><AvatarImage src={member.avatar} alt={member.name} /><AvatarFallback>{member.name?.charAt(0)}</AvatarFallback></Avatar>
                                          <div className="flex-1"><p>{member.name}</p><p className="text-xs text-muted-foreground">{member.email}</p></div>
                                          {selectedMemberId === member.id && <Check className="ml-2 h-4 w-4" />}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </>
                                )}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Select value={selectedMemberPermission} onValueChange={(value: "editor" | "commenter" | "viewer") => setSelectedMemberPermission(value)}>
                        <SelectTrigger className="w-[120px]"><SelectValue placeholder="Permission" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="commenter">Commenter</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="button" size="sm" onClick={addTeamMemberToList} disabled={!selectedMemberId}><Plus className="h-4 w-4" /></Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <ul className="mt-1 space-y-1 pl-4 list-disc">
                        <li><span className="font-medium">Editor:</span> Can edit project details and tasks</li>
                        <li><span className="font-medium">Commenter:</span> Can add comments but not edit</li>
                        <li><span className="font-medium">Viewer:</span> Can only view project content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : (<><Save className="mr-2 h-4 w-4" />Save Changes</>)}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}