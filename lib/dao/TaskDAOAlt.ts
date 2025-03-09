'use server'

import prisma from "@/lib/prisma";

export async function getTasksByProjectId(project_id: string) {
    return await prisma.tasks.findMany({
        where: { project_id },
        orderBy: { created_at: "desc" },
    });
}

// Get a single task by ID
export async function getTaskById(taskId: string) {
    return await prisma.tasks.findUnique({ where: { id: taskId } });
}

// Create a new task priority, color_code, created_by
export async function createTask(title: string, description: string | null, status: string, due_date: Date | null, project_id: string, priority: string | "Medium", color_code: string | "", created_by: string) {
    return await prisma.tasks.create({
        data: { title, description, status, due_date, project_id, priority, color_code, created_by },
    });
}

// Update a task
export async function updateTask(id: string, title?: string, description?: string, status?: string, due_date?: Date) {
    return await prisma.tasks.update({
        where: { id },
        data: { title, description, status, due_date },
    });
}

// Delete a task
export async function deleteTask(taskId: string) {
    return await prisma.tasks.delete({ where: { id: taskId } });
}