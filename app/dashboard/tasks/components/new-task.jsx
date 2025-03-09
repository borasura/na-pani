"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { NewTaskDialog } from "./new-task-dialog"

export const NewTask = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
        <Button onClick={() => setOpen(true)}>New Task</Button>
        <NewTaskDialog open={open} setOpen={setOpen} />
        </>
    )
}