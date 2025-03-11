"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { NewTaskDialog } from "./new-task-dialog"
import { X, FilePlus } from "lucide-react"

export const NewTask = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant="outline" size="sm"
                className="h-8 border-dashed"
                onClick={() => setOpen(true)}>
                <FilePlus />New Task
            </Button>
            <NewTaskDialog open={open} setOpen={setOpen} />
        </>
    )
}