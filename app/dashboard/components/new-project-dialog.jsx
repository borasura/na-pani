import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"

import { NewProjectForm } from "./new-project-form"


export function NewProjectDialog({open, setOpen}) {

  const handleCloseDialog = () => {
      setOpen(false)
  }

return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>New Project</DialogTitle>
        <DialogDescription>
          Enter Project details and submit to save
        </DialogDescription>
      </DialogHeader>
      <NewProjectForm onSave={handleCloseDialog}></NewProjectForm>
    </DialogContent>
  </Dialog>
)
}
