import { Copy } from "lucide-react"

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

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
import { NewTaskForm } from "./new-task-form"

export function NewTaskDialog({open, setOpen}) {

    const handleCloseDialog = () => {
        setOpen(false)
    }

    const pathname = usePathname()
      console.log("Project Id from query is " + pathname)
      const match = pathname.match(/\/dashboard\/project\/([a-f0-9\-]{36})\/tasks/);  // Regex to extract the UUID
    
      const url_project_id = match ? match[1] : null;
      console.log("Extracted id is " + url_project_id)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>
            Enter Task details and submit to save
          </DialogDescription>
        </DialogHeader>
        <NewTaskForm onSave={handleCloseDialog} url_project_id={url_project_id}></NewTaskForm>
      </DialogContent>
    </Dialog>
  )
}
