"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { NewProjectDialog } from "./new-project-dialog";
import { X, FolderPlus } from "lucide-react"

export const NewProject = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant="outline" size="sm"
                className="h-8 border-dashed"
                onClick={() => setOpen(true)}>
                <FolderPlus />New Project
            </Button>
            <NewProjectDialog open={open} setOpen={setOpen} />
        </>
    )
}