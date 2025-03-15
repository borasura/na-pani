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

    console.log("Inside getProjects for id - " + userId)

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
          description: true,
          status: true,
          priority: true,          
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
        description: project.description,
        status: project.status,
        prioity: project.priority,        
        role: project.project_permissions[0]?.role || null,  // Extract the role, assuming one permission per project
      }));
}

// Get a single task by ID
export async function getTaskById(taskId: string) {
    return await prisma.tasks.findUnique({ where: { id: taskId } });
}

export async function getTaskCommentsByTaskId(taskId: string) {
  return await prisma.comments.findMany({where: { task_id: taskId}});
  //return await prisma.tasks.findUnique({ where: { id: taskId } });
}

export async function getTaskActivitiesByTaskId(taskId: string) {
  //return await prisma.comments.findMany({where: { task_id: taskId}});
  const taskWithChildren = await prisma.tasks.findUnique({
    where: {
      id: taskId, // Replace with your taskId
    },
    select: {
      id: true,
          project_id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          color_code: true,
          due_date: true,
          created_by: true,
          assigned_to: true,
          created_at: true,
          updated_at: true,
          updated_by: true,
          is_deleted: true,
          users_tasks_assigned_to: {
              select: {
                  username: true,
                  id: true,
              },
          }, 
      comments: {  
        select: {
          content: true,
          created_at: true,
          users: {
            select: {
              username: true,
              email: true
            },
          },
        },     
        orderBy: {
          created_at: 'desc',
        },
      },
      tasks_history: {
        select: {
          change_type: true,
          previous_values: true,
          new_values: true,
          created_at: true,
          users: {
            select: {
              username: true,
              email: true
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      },
    },
  });

  const activities = [
    ...(taskWithChildren?.comments ?? []).map(comment => ({
      type: 'comment',
      content: comment.content,
      created_date: comment.created_at,
      username: comment.users?.username, // Use optional chaining for user
      email: comment.email?.email,
    })),
    ...(taskWithChildren?.tasks_history ?? []).map(taskHistory => ({
      type: 'task_history',
      change_type: taskHistory.change_type,
      previous_values: taskHistory.previous_values,
      new_values: taskHistory.new_values,
      created_date: taskHistory.created_at,
      username: taskHistory.users?.username, // Use optional chaining for user
      email: taskHistory.email?.email,
    })),
  ];
  
  activities.sort((a, b) => {
    return new Date(b.created_date) - new Date(a.created_date);
  });

  const taskWithCombinedChildren = {
    ...taskWithChildren, // Spread the original object properties
    activities,  // Add the combinedChildItems array
    assigned_to_id: taskWithChildren?.users_tasks_assigned_to?.id,
    assigned_to_username: taskWithChildren?.users_tasks_assigned_to?.username
  };

  console.log("Fecthing tasks with children -" + taskWithChildren)
  //return await prisma.tasks.findUnique({ where: { id: taskId } });
  
  
  
  return taskWithCombinedChildren
}

// Create a new task priority, color_code, created_by
export async function createTask(title: string, description: string | null, status: string, due_date: Date | null, 
    project_id: string, priority: string | "Medium", color_code: string | "", assigned_to: string) {
      const created_by = await getUserId() //Get from context
    await prisma.tasks.create({
        data: { title, description, status, due_date, project_id, priority, color_code, assigned_to, created_by },
    });
    revalidatePath("dashboard/tasks")
    return
}


// Create a new task priority, color_code, created_by
export async function createProject(name: string, description: string | null, status: string, priority: string | "Medium",
  color_code: string | "", owner: string,  
  start_date: Date | null, end_date: Date | null) {

  const created_by = await getUserId() //Get from context
  const project_code = name

  const project = await prisma.projects.create({
      data: { name, description, project_code, status, priority, color_code, owner, created_by, start_date, end_date },
  });

  console.log("Created project - " + project.id)

  await prisma.project_permissions.create({
    data: { project_id: project.id, user_id: created_by, role: "owner"},
  });

  console.log("Created Project permissions")

  
  revalidatePath("dashboard/")
  return
}

// Update a task
export async function updateTask(id: string, title?: string, description?: string, status?: string, due_date?: Date) {
    const updated_by = await getUserId()
    return await prisma.tasks.update({
        where: { id },
        data: { title, description, status, due_date, updated_by },
    });
}

export async function updateTaskAttributes(id: string, status?: string, priority?: string, due_date?: Date) {
  console.log("TaskDAO - Inside updating task attributes")
  console.log(status, "-", priority, "-", due_date)
  const updated_by = await getUserId()
  return await prisma.tasks.update({
      where: { id },
      data: { status, priority, due_date, updated_by },
  });
}

export async function updateTaskTitle(id: string, title: string) {
  console.log("TaskDAO - Inside updating task title")
  const updated_by = await getUserId()
  return await prisma.tasks.update({
      where: { id },
      data: { title, updated_by },
  });
}

export async function updateTaskDescription(id: string, description: string) {
  console.log("TaskDAO - Inside updating task description")
  const updated_by = await getUserId()
  return await prisma.tasks.update({
      where: { id },
      data: { description, updated_by },
  });
}

// Delete a task
export async function deleteTask(taskId: string) {
    return await prisma.tasks.delete({ where: { id: taskId } });
}

// Create a new task priority, color_code, created_by
export async function createComment(task_id: string, content: string, created_at: Date | null) {
    const user_id = await getUserId() //Get from context
  await prisma.comments.create({
      data: { task_id, user_id, content, created_at},
  });
  //revalidatePath("dashboard/tasks")
  return
}

export async function createUser(username: string, email: string) {
    
  const password_hash = ""
  await prisma.users.create({
      data: { username, email, password_hash },
  });
  return
}

export async function getUsers(search: string | null) {
  console.log("returning users " )
  let users;
  if (search) {
    users = await prisma.users.findMany({
      where: {
        OR: [
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      },
      take: 5,
    });
  }else{
    users = await prisma.users.findMany({
      take: 5,
    });
  }

console.log("Returning users " + JSON.stringify(users))
return users
  
}