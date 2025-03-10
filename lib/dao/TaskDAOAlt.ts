'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"
import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserId() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if (!session) {
        return redirect('/')
    }

    const user_email = session?.user.email;
    const profile = await prisma.users.findUniqueOrThrow({where: {email: user_email}});
    return profile.id
}

export async function getTasksByProjectId(project_id: string) {
    return await prisma.tasks.findMany({
        where: { project_id },
        orderBy: { created_at: "desc" },
    });
}

export async function getProjectsForCurrentUser(){
    return await getProjects(await getUserId());
}

export async function getProjects(userId: string){
    //return await prisma.projects.findMany({ where: {}});

    const projects = await prisma.projects.findMany({
        where: {
          project_permissions: {
            some: {
              user_id: userId,  // Filter based on user_id in the project_permissions
            },
          },
        },
        select: {
          id: true,
          name: true,
          project_code: true,
          project_permissions: {
            where: {
              user_id: userId,  // Ensure that we fetch the role for this specific user
            },
            select: {
              role: true,  // Select the role from the permission table
            },
          },
        },
      });
  
      //return projects;
      // Map the results to flatten the `role` into the project object
    return projects.map(project => ({
        id: project.id,
        name: project.name,
        project_code: project.project_code,
        role: project.project_permissions[0]?.role || null,  // Extract the role, assuming one permission per project
      }));
}

// Get a single task by ID
export async function getTaskById(taskId: string) {
    return await prisma.tasks.findUnique({ where: { id: taskId } });
}

// Create a new task priority, color_code, created_by
export async function createTask(title: string, description: string | null, status: string, due_date: Date | null, 
    project_id: string, priority: string | "Medium", color_code: string | "", created_by: string, assigned_to: string) {
    await prisma.tasks.create({
        data: { title, description, status, due_date, project_id, priority, color_code, assigned_to, created_by },
    });
    revalidatePath("dashboard/tasks")
    return
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