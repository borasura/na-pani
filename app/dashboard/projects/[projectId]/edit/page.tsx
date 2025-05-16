"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, ChevronsUpDown, Loader2, Plus, Save, Search, Trash2, X, AlertCircle, Settings, Folder } from "lucide-react"
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

// Assuming these functions are available and work similarly
import { getProjectById, getUsers, updateProject, updateProjectPermissionsDelta, deleteProject, getProjectTeamMembers, updateProject1 } from "@/lib/dao/TaskDAOAlt"

// Types (assuming these are defined elsewhere or can be inferred)
type ProjectDataType = { // Define a more specific type for project fields being updated
  name?: string;
  description?: string;
  status?: string;
  priority?: string;
  color_code?: string;
  owner?: string;
  start_date?: Date;
  end_date?: Date;
};

type TeamMember = {
  id: string
  name: string
  email: string
  role: string // General role
  avatar: string
}

type TeamMemberWithPermission = TeamMember & {
  permission: "editor" | "commenter" | "viewer" | "owner"
}

const colorOptions = [
  { name: "Indigo", value: "#4f46e5" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Default", value: "#71717a" },
]

const fetchTeamMembersApi = async (query = "", page = 1, limit = 10): Promise<TeamMember[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const users = await getUsers(query)
  return users.map(user => ({
    id: user.id,
    name: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar || `/placeholder.svg?height=32&width=32`
  })).slice((page - 1) * limit, page * limit);
}


export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [savingField, setSavingField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    status: "Planning",
    priority: "Medium",
    color: colorOptions[0].value,
    selectedTeamMembers: [] as TeamMemberWithPermission[],
    owner: "",
    ownerDetails: null as TeamMember | null,
  })

  // NEW: State for tracking focused text field and its original value
  const [activeFieldOriginalValue, setActiveFieldOriginalValue] = useState<string | null>(null);
  const [activeFieldName, setActiveFieldName] = useState<string | null>(null);


  const [teamMembersForSelection, setTeamMembersForSelection] = useState<TeamMember[]>([])
  const [isLoadingTeamMembers, setIsLoadingTeamMembers] = useState(false)
  const [teamMembersSearch, setTeamMembersSearch] = useState("")

  const [potentialOwners, setPotentialOwners] = useState<TeamMember[]>([])
  const [isLoadingOwners, setIsLoadingOwners] = useState(false)
  const [ownerSearch, setOwnerSearch] = useState("")

  const [selectedMemberId, setSelectedMemberId] = useState("")
  const [selectedMemberPermission, setSelectedMemberPermission] = useState<"editor" | "commenter" | "viewer">("editor")
  const [selectedMemberDetails, setSelectedMemberDetails] = useState<TeamMember | null>(null)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [fieldSaveStatus, setFieldSaveStatus] = useState<Record<string, { status: 'success' | 'error', message?: string }>>({});


  // --- Inline Save Helper Functions ---
  const handleFieldSave = async (fieldName: string, dataToSave: Partial<ProjectDataType>) => {
    setSavingField(fieldName);
    setIsProcessing(true);
    setFieldSaveStatus(prev => ({ ...prev, [fieldName]: undefined })); 
    setErrors(prev => ({...prev, [fieldName]: undefined, form: undefined})); 

    try {
      await updateProject1(projectId, dataToSave);
      setFieldSaveStatus(prev => ({ ...prev, [fieldName]: { status: 'success' } }));
      setTimeout(() => setFieldSaveStatus(prev => ({ ...prev, [fieldName]: undefined })), 2000); 
    } catch (error) {
      console.error(`Error saving ${fieldName}:`, error);
      const errorMessage = (error as Error).message || `Failed to save ${fieldName.replace(/_/g, ' ')}.`;
      setErrors(prev => ({ ...prev, [fieldName]: errorMessage, form: "An error occurred while saving." }));
      setFieldSaveStatus(prev => ({ ...prev, [fieldName]: { status: 'error', message: errorMessage } }));
    } finally {
      setSavingField(null);
      setIsProcessing(false);
    }
  };

  const handleTeamPermissionSave = async (
    operation: 'add' | 'delete' | 'update',
    userId: string,
    role?: "editor" | "commenter" | "viewer" | "owner"
  ) => {
    const fieldKey = `team-${userId}-${operation}`;
    setSavingField(fieldKey);
    setIsProcessing(true);
    setFieldSaveStatus(prev => ({ ...prev, [fieldKey]: undefined }));
    setErrors(prev => ({...prev, form: undefined}));


    try {
      await updateProjectPermissionsDelta(projectId, [{ userId, action: operation, role }]);
      setFieldSaveStatus(prev => ({ ...prev, [fieldKey]: { status: 'success' } }));
      setTimeout(() => setFieldSaveStatus(prev => ({ ...prev, [fieldKey]: undefined })), 2000);
    } catch (error) {
      console.error(`Error ${operation}ing team member ${userId}:`, error);
      const errorMessage = (error as Error).message || `Failed to ${operation} team member.`;
      setErrors(prev => ({ ...prev, form: errorMessage }));
      setFieldSaveStatus(prev => ({ ...prev, [fieldKey]: { status: 'error', message: errorMessage } }));
    } finally {
      setSavingField(null);
      setIsProcessing(false);
    }
  };

  // Debounced save for text inputs is no longer used for name/description
  // const debouncedSaveProjectField = useCallback(
  //   debounce(handleFieldSave, 1000), 
  //   [projectId] 
  // );


  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) return;
      setIsLoadingPage(true);
      try {
        const projectData = await getProjectById(projectId);
        console.log("Project Data:", projectData);
        if (!projectData) {
          setErrors({ form: "Project not found." });
          setIsLoadingPage(false);
          return;
        }
        const currentProjectTeam = await getProjectTeamMembers(projectId) as TeamMemberWithPermission[];
        let ownerDetails = null;
        if (projectData.owner) {
            // const ownerUser = await getUsers(projectData.owner_username);
            // if (ownerUser && ownerUser.length > 0) {
            //      ownerDetails = {
            //         id: ownerUser[0].id, name: ownerUser[0].username, email: ownerUser[0].email,
            //         role: ownerUser[0].role, avatar: ownerUser[0].avatar || `/placeholder.svg?height=32&width=32`
            //     };
            // }
                 ownerDetails = {
                    id: projectData.owner, name: projectData.owner_username, email: projectData.owner_email,
                    role: "owner", avatar: `/placeholder.svg?height=32&width=32`
                };
        }
        setFormData({
          name: projectData.name, description: projectData.description,
          startDate: new Date(projectData.start_date), endDate: new Date(projectData.end_date),
          status: projectData.status, priority: projectData.priority,
          color: projectData.color_code || colorOptions[0].value,
          selectedTeamMembers: currentProjectTeam || [],
          owner: projectData.owner_id || "", ownerDetails: ownerDetails,
        });
        const initialUsers = await fetchTeamMembersApi("");
        setTeamMembersForSelection(initialUsers);
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


  // --- Modified Input Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Debounced save is removed for 'name' and 'description'
    // if (id === 'name' || id === 'description') {
    //   debouncedSaveProjectField(id, { [id]: value });
    // }
  };

  // NEW: Event handlers for text fields (name, description)
  const handleTextFieldFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'name' || id === 'description') {
      setActiveFieldName(id);
      setActiveFieldOriginalValue(value);
    }
  };

  const handleTextFieldBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (activeFieldName === id && (id === 'name' || id === 'description') && value !== activeFieldOriginalValue) {
      await handleFieldSave(id, { [id]: value });
    }
    // Clear active field tracking if this was the active field
    if (activeFieldName === id) {
      setActiveFieldName(null);
      setActiveFieldOriginalValue(null);
    }
  };

  const handleTextFieldKeyDown = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { id, value } = target;

    if (activeFieldName === id && (id === 'name' || id === 'description')) {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default form submission if any, or newline in textarea
        if (value !== activeFieldOriginalValue) {
          await handleFieldSave(id, { [id]: value });
        }
        target.blur(); // Triggers handleTextFieldBlur which will clear active states
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (activeFieldOriginalValue !== null) {
          setFormData(prev => ({ ...prev, [id]: activeFieldOriginalValue }));
        }
        target.blur(); // Triggers handleTextFieldBlur which will clear active states
      }
    }
  };


  const handleSelectChange = (fieldName: keyof ProjectDataType, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    handleFieldSave(fieldName, { [fieldName]: value });
  };

  const handleDateChange = (fieldName: 'startDate' | 'endDate', date: Date | undefined) => {
    if (!date) return;
    if (fieldName === 'endDate' && date < formData.startDate) {
        setErrors(prev => ({...prev, endDate: "End date must be after start date"}));
        setFormData(prev => ({ ...prev, endDate: date })); 
        return; 
    } else if (fieldName === 'startDate' && date > formData.endDate) {
        // Future: adjust end date or show error
    }
    
    setErrors(prev => ({...prev, endDate: undefined})); 
    setFormData(prev => ({ ...prev, [fieldName]: date }));
    handleFieldSave(fieldName, { [fieldName === 'startDate' ? 'start_date' : 'end_date']: date });
  };

  const handleColorButtonClick = (colorValue: string) => {
    setFormData(prev => ({ ...prev, color: colorValue }));
    handleFieldSave('color', { color_code: colorValue });
  };

  const handleOwnerSelect = (memberId: string) => {
    const member = potentialOwners.find((m) => m.id === memberId)
    if (member) {
      setFormData({ ...formData, owner: memberId, ownerDetails: member });
      handleFieldSave('owner', { owner: memberId });
    }
  }

  const handleRoleChange = (memberId: string, newPermission: "editor" | "commenter" | "viewer" | "owner") => {
    setFormData((prev) => ({
      ...prev,
      selectedTeamMembers: prev.selectedTeamMembers.map((member) =>
        member.id === memberId ? { ...member, permission: newPermission } : member
      ),
    }));
    setEditingMemberId(null); 
    handleTeamPermissionSave('update', memberId, newPermission);
  };

  const addTeamMemberToList = () => {
    if (selectedMemberId && selectedMemberDetails) {
      if (formData.selectedTeamMembers.some((m) => m.id === selectedMemberId) || selectedMemberId === formData.owner) {
        setErrors(prev => ({...prev, team: "Member already added or is the owner."}));
        setTimeout(() => setErrors(prev => ({...prev, team: undefined})), 3000);
        return;
      }
      const newMemberEntry = { ...selectedMemberDetails, permission: selectedMemberPermission };
      setFormData((prev) => ({
        ...prev,
        selectedTeamMembers: [...prev.selectedTeamMembers, newMemberEntry],
      }));
      handleTeamPermissionSave('add', selectedMemberId, selectedMemberPermission);
      setSelectedMemberId("");
      setSelectedMemberDetails(null);
      setSelectedMemberPermission("editor");
    }
  }

  const removeTeamMemberFromList = (memberId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTeamMembers: prev.selectedTeamMembers.filter((m) => m.id !== memberId),
    }));
    handleTeamPermissionSave('delete', memberId);
  }


  const handleDeleteProject = async () => {
    setIsDeleting(true);
    setIsProcessing(true);
    try {
      await deleteProject(projectId);
      router.push("/dashboard/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      setErrors({ form: "There was an error deleting the project." });
      setIsDeleting(false);
      setIsProcessing(false);
    }
  }
  
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
    debouncedTeamMemberSearch(teamMembersSearch);
    return () => debouncedTeamMemberSearch.cancel();
  }, [teamMembersSearch, debouncedTeamMemberSearch])

  useEffect(() => {
    debouncedOwnerSearch(ownerSearch);
    return () => debouncedOwnerSearch.cancel();
  }, [ownerSearch, debouncedOwnerSearch])


  const handleTeamMemberSelectForAddition = (memberId: string) => {
    const member = teamMembersForSelection.find((m) => m.id === memberId)
    if (member) {
      setSelectedMemberId(memberId)
      setSelectedMemberDetails(member)
    }
  }

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "editor": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "commenter": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "viewer": return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
      default: return "";
    }
  }

  const CommandLoading = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 text-sm text-center text-muted-foreground">{children}</div>
  );

  const FieldStatusIndicator = ({ fieldName }: { fieldName: string }) => {
    if (savingField === fieldName) {
      return <Loader2 className="h-4 w-4 ml-2 animate-spin text-muted-foreground" />;
    }
    if (fieldSaveStatus[fieldName]?.status === 'success') {
      return <Check className="h-4 w-4 ml-2 text-green-500" />;
    }
    if (fieldSaveStatus[fieldName]?.status === 'error') {
      return <AlertCircle className="h-4 w-4 ml-2 text-destructive" title={fieldSaveStatus[fieldName]?.message} />;
    }
    return null;
  };


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

    // const pathname = usePathname();
  
    // // Extract project ID from the URL (e.g., /dashboard/projects/[id]/overview)
    // const projectId = pathname.split('/')[3]; // index 3 = [id]

  return (

    
    <div className="container mx-auto p-4 max-w-4xl">
      {/* <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild disabled={isProcessing}>
          <Link href={`/dashboard/projects/${projectId}/tasks`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">Back to Project</div>
      </div> */}

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground mt-1">Changes to name/description save on Enter or blur. Other fields save instantly.</p>
          </div>
          {/* <Link>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isProcessing}>Back</Button>
          </Link> */}
          <Link href={`/dashboard/projects/${projectId}/overview`}>
          <Button variant="outline" disabled={isProcessing}>
            <Folder className="mr-2 h-4 w-4" />
            Project Overview
          </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isDeleting || isProcessing}>
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
                  onClick={handleDeleteProject}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Deleting...</>) : "Delete Project"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
        </div>

        {errors.form && <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-4">{errors.form}</div>}

        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Project Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">Project Name <span className="text-destructive">*</span> <FieldStatusIndicator fieldName="name" /></Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  onFocus={handleTextFieldFocus}
                  onBlur={handleTextFieldBlur}
                  onKeyDown={handleTextFieldKeyDown}
                  className={errors.name ? "border-destructive" : ""} 
                  disabled={savingField === 'name' || isProcessing}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center">Description <span className="text-destructive">*</span> <FieldStatusIndicator fieldName="description" /></Label>
                <Textarea 
                  id="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  onFocus={handleTextFieldFocus}
                  onBlur={handleTextFieldBlur}
                  onKeyDown={handleTextFieldKeyDown}
                  rows={4} 
                  className={errors.description ? "border-destructive" : ""} 
                  disabled={savingField === 'description' || isProcessing}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>
              {/* Status & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="flex items-center">Status <FieldStatusIndicator fieldName="status" /></Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)} disabled={savingField === 'status' || isProcessing}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Execution">Execution</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority" className="flex items-center">Priority <FieldStatusIndicator fieldName="priority" /></Label>
                  <Select value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)} disabled={savingField === 'priority' || isProcessing}>
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
                  <Label htmlFor="startDate" className="flex items-center">Start Date <FieldStatusIndicator fieldName="startDate" /></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={savingField === 'startDate' || isProcessing}>
                        <Calendar className="mr-2 h-4 w-4" />{format(new Date(formData.startDate), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={new Date(formData.startDate)} onSelect={(date) => handleDateChange('startDate', date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="flex items-center">End Date {errors.endDate && <span className="text-destructive ml-1">*</span>} <FieldStatusIndicator fieldName="endDate" /></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={`w-full justify-start text-left font-normal ${errors.endDate ? "border-destructive" : ""}`} disabled={savingField === 'endDate' || isProcessing}>
                        <Calendar className="mr-2 h-4 w-4" />{format(new Date(formData.endDate), "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={new Date(formData.endDate)} onSelect={(date) => handleDateChange('endDate', date)} initialFocus disabled={(date) => date < new Date(formData.startDate)} />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
                </div>
              </div>
              {/* Color */}
              <div className="space-y-2">
                <Label className="flex items-center">Project Color <FieldStatusIndicator fieldName="color" /></Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((colorOpt) => (
                    <button key={colorOpt.value} type="button" className={`h-8 w-8 rounded-full border-2 ${formData.color === colorOpt.value ? "border-primary ring-2 ring-primary" : "border-transparent"} ${savingField === 'color' || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`} style={{ backgroundColor: colorOpt.value }} onClick={() => handleColorButtonClick(colorOpt.value)} title={colorOpt.name} disabled={savingField === 'color' || isProcessing}>
                      {formData.color === colorOpt.value && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>Manage team members and project owner. Changes are saved automatically. <FieldStatusIndicator fieldName={`team-${selectedMemberId}-add`} /> <FieldStatusIndicator fieldName={`team-${editingMemberId}-update`} /></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Project Owner */}
              <div className="space-y-2">
                <Label htmlFor="owner" className="flex items-center">Project Owner <span className="text-destructive">*</span> <FieldStatusIndicator fieldName="owner" /></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className={`w-full justify-between ${errors.owner ? "border-destructive" : ""}`} disabled={savingField === 'owner' || isProcessing}>
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
                                <CommandItem key={member.id} value={member.name} onSelect={() => handleOwnerSelect(member.id)} disabled={formData.owner === member.id}>
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
                {errors.team && <p className="text-sm text-destructive mb-2">{errors.team}</p>}
                <div className="border rounded-md">
                  <div className="p-2 flex flex-wrap gap-1 min-h-[40px]">
                  {formData.selectedTeamMembers.length > 0 ? (
                    formData.selectedTeamMembers.map((member) => (
                      <div key={member.id} className={`flex items-center gap-1 bg-muted rounded-md pl-1 pr-2 py-1 ${savingField === `team-${member.id}-delete` || savingField === `team-${member.id}-update` ? 'opacity-50' : ''}`}>
                        <Avatar className="h-5 w-5"><AvatarImage src={member.avatar} alt={member.name} /><AvatarFallback>{member.name?.charAt(0)}</AvatarFallback></Avatar>
                        <span className="text-sm">{member.name}</span>
                        {savingField === `team-${member.id}-update` && <Loader2 className="h-3 w-3 ml-1 animate-spin" />}
                        {fieldSaveStatus[`team-${member.id}-update`]?.status === 'success' && <Check className="h-3 w-3 ml-1 text-green-500" />}
                        {fieldSaveStatus[`team-${member.id}-update`]?.status === 'error' && <AlertCircle className="h-3 w-3 ml-1 text-destructive" />}


                        {editingMemberId === member.id ? (
                          <Select
                            value={member.permission}
                            onValueChange={(value: "editor" | "commenter" | "viewer" | "owner") => handleRoleChange(member.id, value)}
                            open={true}
                            onOpenChange={(open) => !open && setEditingMemberId(null)}
                            disabled={isProcessing}
                          >
                            <SelectTrigger className="w-[120px] h-6 text-xs ml-1">
                              <SelectValue placeholder="Permission" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="commenter">Commenter</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="secondary" className={`text-xs ml-1 cursor-pointer ${getPermissionColor(member.permission)} ${isProcessing ? 'pointer-events-none opacity-70': ''}`} onClick={() => !isProcessing && setEditingMemberId(member.id)}>
                            {member.permission.charAt(0).toUpperCase() + member.permission.slice(1)}
                          </Badge>
                        )}
                        <button type="button" onClick={() => removeTeamMemberFromList(member.id)} className="h-4 w-4 rounded-full ml-1 hover:bg-destructive/20 flex items-center justify-center disabled:opacity-50" disabled={isProcessing || savingField === `team-${member.id}-delete`}>
                          {savingField === `team-${member.id}-delete` ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
                        </button>
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
                            <Button variant="outline" role="combobox" className="w-full justify-between" disabled={isProcessing}>
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
                      <Select value={selectedMemberPermission} onValueChange={(value: "editor" | "commenter" | "viewer") => setSelectedMemberPermission(value)} disabled={isProcessing}>
                        <SelectTrigger className="w-[120px]"><SelectValue placeholder="Permission" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="commenter">Commenter</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="button" size="sm" onClick={addTeamMemberToList} disabled={!selectedMemberId || isProcessing || savingField === `team-${selectedMemberId}-add`}>
                        {savingField === `team-${selectedMemberId}-add` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      </Button>
                    </div>
                     {fieldSaveStatus[`team-${selectedMemberId}-add`]?.status === 'error' && <p className="text-sm text-destructive">{fieldSaveStatus[`team-${selectedMemberId}-add`]?.message}</p>}
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

          
        </div> 
      </div>
    </div>
  )
}
