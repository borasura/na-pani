import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileForm } from "./new-task-form"

export function NewTaskDialog({open, setOpen}) {

    const handleCloseDialog = () => {
        setOpen(false)
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>
            Enter Task details and save
          </DialogDescription>
        </DialogHeader>
        <ProfileForm onSave={handleCloseDialog}></ProfileForm>
      </DialogContent>
    </Dialog>
  )
}
