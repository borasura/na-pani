'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"
import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { logger } from "@/lib/logger";
const log = logger.child({ module: "TaskDAOAlt" });

export async function getUserId() {
  log.debug('called');
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    log.debug('Session not found. Rediring user to main');
    return redirect('/');
  }

  const user_email = session?.user.email;
  const profile = await prisma.users.findUniqueOrThrow({
    where: { email: user_email },
  });
  log.debug('Returning user profile.id');
  return profile.id;
}

export async function getUserDetails() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    log.debug('Session not found. Rediring user to main');
    return redirect('/');
  }

  const user_email = session?.user.email;
  const profile = await prisma.users.findUniqueOrThrow({
    where: { email: user_email },
    select: { id: true, username: true, email: true },
  });
  log.debug('getUserDetails - ', profile);
  log.debug(profile);
  return profile;
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

export async function getTasksForCurrentUser() {

  const assigned_to = await getUserId()
  console.log("Inside getTasksForCurrentUser " + assigned_to)
   
  const tasks_results = await prisma.tasks.findMany({
      where: { assigned_to },
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
          projects: {  
            select: {
              name: true,
            },  
          },
      },
      orderBy: { created_at: "desc" },
  });

  const flattnedTasks = tasks_results.map(task => {
      const { users_tasks_assigned_to, projects, ...rest } = task; // Destructure to remove users_tasks_assigned_to
      return {
        ...rest, // Spread the remaining fields
        assigned_to_id: users_tasks_assigned_to?.id, // Add the ID of the assigned user at the top level
        assigned_to_username: users_tasks_assigned_to?.username, // Add the username of the assigned user at the top level
        project_name: projects.name,
      };
  });

  console.log("Returning tasks " + flattnedTasks.length)
  return flattnedTasks;
  
}

export async function getProjects(userId: string){
    //return await prisma.projects.findMany({ where: {}});

    log.debug("Inside getProjects for id - " + userId)

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
          color_code: true,         
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
        color_code: project.color_code,   
        role: project.project_permissions[0]?.role || null,  // Extract the role, assuming one permission per project
      }));
}

export async function getProjectsOverviewForCurrentUser(){
  
  const user_id = await getUserId();
  const currentDate = new Date();

  const projects = await prisma.projects.findMany({
    where: {
      project_permissions: {
        some: {
          user_id: user_id,  // Filter based on user_id in the project_permissions
        },
      },
    },
    include: {
      project_permissions: {
        include: {
          users: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });

  const formattedProjects = await Promise.all(
    projects.map(async (project) => {
      const totalTasks = await prisma.tasks.count({
        where: {
          project_id: project.id,
        },
      });

      const doneTasks = await prisma.tasks.count({
        where: {
          project_id: project.id,
          status: 'Done',
        },
      });

      const inProgressTasks = await prisma.tasks.count({
        where: {
          project_id: project.id,
          status: 'In Progress',
        },
      });

      const blockedTasks = await prisma.tasks.count({
        where: {
          project_id: project.id,
          status: 'Blocked',
        },
      });

      const overdueTasks = await prisma.tasks.count({
        where: {
          project_id: project.id,
          due_date: {
            lt: currentDate,
          },
        },
      });

      const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

      const timeDifference = project.end_date ? project.end_date.getTime() - currentDate.getTime() : 0;
      const daysRemaining = project.end_date ? Math.ceil(timeDifference / (1000 * 3600 * 24)) : null;

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        color: project.color_code,
        status: project.status,
        priority: project.priority,
        progress: progress,
        start_date: project.start_date,
        end_date: project.end_date,
        days_remaining: daysRemaining,
        tasks: {
          total: totalTasks,
          done: doneTasks,
          in_progress: inProgressTasks,
          blocked: blockedTasks,
          overdue: overdueTasks,
        },
        team: project.project_permissions.map((permission) => ({
          id: permission.users.id,
          name: permission.users.username,
          role: permission.role,
        })),
      };
    })
  );

  return formattedProjects;
}


export async function getProjectById(id: string){
  //return await prisma.projects.findMany({ where: {}});

  log.debug("Inside getProjectById for id - " + id)

  const projects = await prisma.projects.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        priority: true, 
        color_code: true, 
        start_date: true,
        end_date: true,
        owner: true  ,      
        users_projects_owner: {
          select: {
            username: true,  // Select the role from the permission table
            email: true,
          },
        },
      },
    });

    console.log(projects)

    //return projects;
    // Map the results to flatten the `role` into the project object
  // return projects.map(project => ({
  //     id: project.id,
  //     name: project.name,
  //     description: project.description,
  //     status: project.status,
  //     prioity: project.priority,     
  //     color_code: project.color_code,   
  //     start_date: project.start_date,
  //     end_date: project.end_date,
  //     owner: project.owner,
  //     owner_username: project.users_projects_owner.username,
  //     owner_email: project.users_projects_owner.email,
  //   }))[0];

    const projectDetails = {
      ...projects, // Spread the original object properties
      owner_username: projects?.users_projects_owner.username,
      owner_email: projects?.users_projects_owner.email
    };

    delete projectDetails.users_projects_owner
    
    log.debug(projectDetails)
    return projectDetails
}


export async function getProjectStatsById(project_id: string){
  //return await prisma.projects.findMany({ where: {}});
  const [totalTasks, statusCounts, priorityCounts, doneTasks] = await Promise.all([
    prisma.tasks.count({
      where: {
        project_id: project_id,
        is_deleted: false,
      },
    }),
    prisma.tasks.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
      where: {
        project_id: project_id,
        is_deleted: false,
      },
    }),
    prisma.tasks.groupBy({
      by: ['priority'],
      _count: {
        priority: true,
      },
      where: {
        project_id: project_id,
        is_deleted: false,
      },
    }),
    prisma.tasks.count({
      where: {
        project_id: project_id,
        is_deleted: false,
        status: 'Done',
      },
    }),
  ]);

  const statusMap = {
    Backlog: 'bg-slate-400',
    Todo: 'bg-blue-400',
    'In Progress': 'bg-amber-400',
    Done: 'bg-green-400',
    Blocked: 'bg-red-400',
  };

  const priorityMap = {
    Low: 'bg-blue-400',
    Medium: 'bg-amber-400',
    High: 'bg-red-400',
  };

  const by_status = statusCounts.map((item) => ({
    name: item.status,
    count: item._count.status,
    color: statusMap[item.status],
  }));

  const by_priority = priorityCounts.map((item) => ({
    name: item.priority,
    count: item._count.priority,
    color: priorityMap[item.priority],
  }));

  const completion_rate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return {
    total: totalTasks,
    by_status: by_status,
    by_priority: by_priority,
    completion_rate: completion_rate,
  };


}


export async function getAttentionNeededTasks (project_id: string){
  
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const pastDueTasks = await prisma.tasks.findMany({
    where: {
      project_id: project_id,
      is_deleted: false,
      due_date: {
        lt: currentDate,
      },
    },
    orderBy: {
      due_date: 'asc',
    },
    take: 4,
  });

  const unassignedTasks = await prisma.tasks.findMany({
    where: {
      project_id: project_id,
      is_deleted: false,
      assigned_to: null,
    },
    orderBy: [
      {
        priority: 'desc',
      },
    ],
    take: 4,
  });

  const noUpdatesTasks = await prisma.tasks.findMany({
    where: {
      project_id: project_id,
      is_deleted: false,
      updated_at: {
        lt: oneWeekAgo,
      },
    },
    orderBy: {
      updated_at: 'asc',
    },
    take: 4,
  });

  const blockedTasks = await prisma.tasks.findMany({
    where: {
      project_id: project_id,
      is_deleted: false,
      status: 'Blocked',
    },
    orderBy: [
      {
        priority: 'desc',
      },
    ],
    take: 4,
  });

  return {
    past_due: pastDueTasks.map((task) => ({
      id: task.id,
      title: task.title,
      due_date: task.due_date,
      priority: task.priority,
    })),
    unassigned: unassignedTasks.map((task) => ({
      id: task.id,
      title: task.title,
      priority: task.priority,
    })),
    no_updates: noUpdatesTasks.map((task) => ({
      id: task.id,
      title: task.title,
      last_update: task.updated_at,
      priority: task.priority,
    })),
    blocked: blockedTasks.map((task) => ({
      id: task.id,
      title: task.title,
      blocker: task.description, // Assuming description contains blocker reason. Adjust if needed.
      priority: task.priority,
    })),
  };

}

export async function getAttentionNeededTasksForCurrentUser(){
  const user_id = await getUserId()
  return getAttentionNeededTasksByUserId(user_id)
}

export async function getAttentionNeededTasksByUserId (user_id: string){
  
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const pastDueTasks = await prisma.tasks.findMany({
    where: {
      assigned_to: user_id,
      is_deleted: false,
      due_date: {
        lt: currentDate,
      },
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
      updated_at: true,
      projects: {  
        select: {
          name: true,
        },  
      },
    },
    orderBy: {
      due_date: 'asc',
    },
    take: 2,
  });
 
  const noUpdatesTasks = await prisma.tasks.findMany({
    where: {
      assigned_to: user_id,
      is_deleted: false,
      updated_at: {
        lt: oneWeekAgo,
      },
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
      updated_at: true,
      projects: {  
        select: {
          name: true,
        },  
      },
    },
    orderBy: {
      updated_at: 'asc',
    },
    take: 2,
  });

  const blockedTasks = await prisma.tasks.findMany({
    where: {
      assigned_to: user_id,
      is_deleted: false,
      status: 'Blocked',
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
      updated_at: true,
      projects: {  
        select: {
          name: true,
        },  
      },
    },
    orderBy: [
      {
        priority: 'desc',
      },
    ],
    take: 2,
  });

  const formatTasks = (tasks, issue) =>
    tasks.map((task) => ({
      id: task.id,
      project_id: task.project_id,
      title: task.title,
      description: task.description,
      project: task.projects.name,
      status: task.status,
      priority: task.priority,
      color_code: task.color_code,
      due_date: task.due_date,
      updated_at: task.updated_at,
      issue,
    }));
  
  return [
    ...formatTasks(pastDueTasks, 'Past due date'),
    ...formatTasks(blockedTasks, 'Blocked'),
    ...formatTasks(noUpdatesTasks, 'No updates'),    
  ]; 

}

export async function getRecentActivitiesByProject   (project_id: string){

  console.log("getRecentActivitiesByProject ")
  const comments = await prisma.comments.findMany({
    where: {
      tasks: {
        project_id: project_id,
      },
    },
    select: {
      id: true,
      content: true,
      users: {
        select: {
          username: true,
          email: true,
        },
      },
      updated_at: true,
    },
    orderBy: {
      updated_at: 'desc',
    },
    take: 10,
  });

  console.log("Found comments " + comments.length)
  const history = await prisma.tasks_history.findMany({
    where: {
      tasks: {
        project_id: project_id,
      },
    },
    select: {
      id: true,
      change_type: true,
      previous_values: true,
      new_values: true,
      created_at: true,
      users: {
        select: {
          username: true,
          email: true,
        },
      },
      tasks: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    take: 10,
  });

  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    type: 'comment',
    content: comment.content,
    username: comment.users?.username,
    email: comment.users?.email,
    created_date: comment.updated_at,
  }));

  const formattedHistory = history.map((item) => ({
    id: item.id,
    type: 'task_history',
    content: `Changed ${item.change_type} from '${item.previous_values}' to '${item.new_values}'`,
    task_title: item.tasks?.title,
    username: item.users?.username,
    email: item.users?.email,
    change_type: item.change_type,
    new_values: item.new_values,
    previous_values: item.previous_values,
    created_date: item.created_at,
  }));

  const combinedActivities = [...formattedComments, ...formattedHistory];

  const sortedActivities = combinedActivities
    .sort((a, b) => b.created_date.getTime() - a.created_date.getTime())
    .slice(0, 10);

  return sortedActivities;
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

  console.log("Creating project with owner as " + owner + ", and created_by as " + created_by)
  const project = await prisma.projects.create({
      data: { name, description, project_code, status, priority, color_code, owner, created_by, start_date, end_date },
  });

  console.log("Created project - " + project.id)

  console.log("Creating project permission of owner for " + owner)
  await prisma.project_permissions.create({
    data: { project_id: project.id, user_id: owner, role: "owner"},
  });

  // If Owner is different from Creator, then the creator atlesat gets to be the editor on the project
  if (owner != created_by){
    console.log("Creating project editr permission for " + created_by)
    await prisma.project_permissions.create({
      data: { project_id: project.id, user_id: created_by, role: "editor"},
    });
  }

  console.log("Created Project permissions")

  
  //revalidatePath("dashboard/")
  return project.id
}

interface ProjectPermissionInput {
  project_id: string;
  user_id: string;
  role: string;
}

export async function createProjectPermissions(permissions: ProjectPermissionInput[]) {
  try {
    const createdPermissions = await prisma.project_permissions.createMany({
      data: permissions,
    });
    return createdPermissions; // Optionally return the result of createMany
  } catch (error) {
    console.error('Error creating project permissions:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

// Create a new task priority, color_code, created_by
export async function updateProject(id: string, name: string, description: string | null, status: string, priority: string | "Medium",
  color_code: string, owner: string,  
  start_date: Date | null, end_date: Date | null) {

    //TODO Does this user even have permission to update?
  //const updated_by = await getUserId() //Get from context

  // TODO Updated_by field is missing. Needs implementation

  await prisma.projects.update({
    where: { id },
    data: { name, description, status, priority, color_code, owner, start_date, end_date},
  });
  
  return
}

type UpdatableProjectData = {
  name?: string;
  description?: string | null;
  status?: string;
  priority?: string;
  color_code?: string;
  owner?: string; // Assuming your database foreign key column is 'owner_id'
  start_date?: Date | null;
  end_date?: Date | null;
  // updated_by?: string; // Optional: If you track who made the update
};

/**
 * Updates a project with the given ID using the provided data.
 * Only the fields present in the `dataToUpdate` object will be modified.
 *
 * @param id The ID of the project to update.
 * @param dataToUpdate An object containing the project fields to update.
 * @returns The updated project object.
 * @throws Error if the project is not found or if the update fails.
 */
export async function updateProject1(
  id: string,
  dataToUpdate: UpdatableProjectData
) { // You can specify `Promise<Projects>` if Projects is your Prisma model type
  
  // TODO: Implement permission checks.
  // Does the current user (from context/session) have permission to update this project?
  // const userId = await getUserIdFromSession(); // Example: Get current user's ID
  // const hasPermission = await checkUserPermissionForProject(userId, id, 'update');
  // if (!hasPermission) {
  //   throw new Error("You do not have permission to update this project.");
  // }

  // TODO: Consider adding an 'updated_by' field if your schema supports it.
  // This helps in auditing changes.
  // if (userId) { // If you have the user ID from session/context
  //   dataToUpdate.updated_by = userId;
  // }
  // Or add an 'updated_at' field if you want Prisma to handle it automatically via @updatedAt

  console.log("Updating project with ID:", id);
  console.log(dataToUpdate)

  try {
    const updatedProject = await prisma.projects.update({
      where: { id },
      data: dataToUpdate, // Pass the partial data object directly
    });

    if (!updatedProject) {
      // This case might not be reached if prisma.projects.update throws an error for not found.
      // Prisma's default behavior is to throw an error if the record to update is not found.
      // P2025: Record to update not found.
      throw new Error(`Project with ID ${id} not found.`);
    }
    
    return updatedProject;

  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    // Handle specific Prisma errors if needed (e.g., P2025 for record not found)
    // Or re-throw a more generic error
    throw new Error(`Failed to update project: ${(error as Error).message}`);
  }
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

export async function updateTaskAttributes1(id: string, status?: string, 
    priority?: string, due_date?: Date, assigned_to?: string, currentpath?: string) {
  console.log("TaskDAO - Inside updating task attributes")
  console.log(status, "-", priority, "-", due_date)
  const updated_by = await getUserId()
  await prisma.tasks.update({
      where: { id },
      data: { status, priority, due_date, assigned_to, updated_by },
  });
  if(currentpath){
    revalidatePath(currentpath)
  }
  return
}

export async function updateTaskTitle(id: string, title: string, currentpath?: string) {
  console.log("TaskDAO - Inside updating task title")
  const updated_by = await getUserId()
  await prisma.tasks.update({
      where: { id },
      data: { title, updated_by },
  });
  if(currentpath){
    revalidatePath(currentpath)
  }
  return
}

export async function updateTaskDescription(id: string, description: string, currentpath?: string) {
  console.log("TaskDAO - Inside updating task description")
  const updated_by = await getUserId()
  await prisma.tasks.update({
      where: { id },
      data: { description, updated_by },
  });
  if(currentpath){
    revalidatePath(currentpath)
  }
  return
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
  console.log("?>?>> returning users with search term as ", search)
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

//console.log("Returning users " + JSON.stringify(users))
return users
  
}




// Define the expected frontend types (or import them if they are in a shared file)
type TeamMember = {
  id: string;
  name: string; // Maps to user.username
  email: string;
  role: string; // General role from the user's profile
  avatar: string;
};

type TeamMemberWithPermission = TeamMember & {
  permission: "editor" | "commenter" | "viewer" | string; // project-specific role
};

/**
 * Fetches team members (non-owners) for a given project with their specific project permissions.
 * @param projectId The ID of the project.
 * @returns A promise that resolves to an array of team members with permissions.
 */
export async function getProjectTeamMembers(projectId: string): Promise<TeamMemberWithPermission[]> {
  if (!projectId) {
    console.error("getProjectTeamMembers: projectId is required");
    return [];
  }

  try {
    const permissions = await prisma.project_permissions.findMany({
      where: {
        project_id: projectId,
        NOT: {
          role: "owner", // Exclude the project owner's primary "owner" role
        },
      },
      select: {
        role: true, // Assuming 'role' is the field name for the permission
        users: { // Assuming 'users' is the relation name to the users table
          select: {
            id: true,
            username: true, // Assuming 'username' field exists for name
            email: true,
            //avatar_url: true, // Assuming 'avatar_url' field exists for avatar
           // role: true, // Assuming 'role' field for general user role
          },
        },
      },
    });

    return permissions.map((p) => {
      if (!p.users) {
        // This case should ideally not happen if data integrity is maintained
        console.warn(`Permission record ${p} is missing related user data.`);
        return null;
      }
      return {
        id: p.users.id,
        name: p.users.username || "N/A",
        email: p.users.email || "N/A",
        //avatar: p.users.avatar_url || "/placeholder.svg", // Default avatar
        role: p.role || "Member", // General role from user profile
        permission: p.role as TeamMemberWithPermission["permission"], // Project-specific role
      };
    }).filter(member => member !== null) as TeamMemberWithPermission[]; // Filter out any nulls

  } catch (error) {
    console.error(`Error fetching project team members for project ${projectId}:`, error);
    throw new Error("Could not fetch project team members.");
  }
}


/**
 * Updates the permissions for a project.
 * This involves removing existing non-owner permissions and adding the new ones.
 * The project owner's "owner" role (as defined in the 'projects.owner' field linking to 'project_permissions') is preserved.
 * @param projectId The ID of the project to update permissions for.
 * @param permissionsList An array of permission objects for team members.
 */
export async function updateProjectPermissions(
  projectId: string,
  permissionsList: ProjectPermissionInput[]
): Promise<void> {
  if (!projectId) {
    throw new Error("updateProjectPermissions: projectId is required.");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Get the project's owner_id from the 'projects' table.
      const project = await tx.projects.findUnique({
        where: { id: projectId },
        select: { owner: true }, // 'owner' field in 'projects' table holds the user_id of the owner
      });

      if (!project) {
        throw new Error(`Project with ID ${projectId} not found.`);
      }
      const projectOwnerUserId = project.owner;

      // 2. Delete existing permissions for this project,
      //    EXCEPT for the project owner's specific "owner" role.
      //    This targets roles like "editor", "viewer", "commenter".
      await tx.project_permissions.deleteMany({
        where: {
          project_id: projectId,
          NOT: {
            user_id: projectOwnerUserId,
            role: "owner", // Assuming the primary owner's permission is explicitly 'owner'
          },
        },
      });

      // 3. Prepare data for new permission entries from the provided list.
      //    Exclude any entry that tries to re-assign the main project owner with the 'owner' role here,
      //    as their original 'owner' permission is preserved.
      if (permissionsList && permissionsList.length > 0) {
        const newPermissionsData = permissionsList
          .filter(p => !(p.user_id === projectOwnerUserId && p.role === "owner")) // Don't try to re-add the owner's 'owner' role
          .map((p) => ({
            project_id: projectId,
            user_id: p.user_id,
            role: p.role,
            // created_at and updated_at will be set by default by Prisma/DB
          }));

        if (newPermissionsData.length > 0) {
          await tx.project_permissions.createMany({
            data: newPermissionsData,
          });
        }
      }
      console.log(`Successfully updated permissions for project ${projectId}`);
    });
  } catch (error) {
    console.error(`Error updating permissions for project ${projectId}:`, error);
    if (error instanceof Error && error.message.includes(`Project with ID ${projectId} not found.`)) {
        throw error; // Re-throw specific known errors
    }
    throw new Error(`Could not update project permissions for project ${projectId}.`);
  }
}


/**
 * Soft deletes a project by setting its 'is_deleted' flag to true.
 * @param projectId The ID of the project to delete.
 * @returns A promise that resolves when the project is soft-deleted.
 */
export async function deleteProject(projectId: string): Promise<void> {
  if (!projectId) {
    throw new Error("deleteProject: projectId is required.");
  }

  try {
    // The 'projects' model has 'is_deleted: Boolean? @default(false)'
    const result = await prisma.projects.updateMany({ // Use updateMany in case of not found
      where: {
        id: projectId,
        is_deleted: false, // Only attempt to soft-delete if not already deleted
      },
      data: {
        is_deleted: true,
        updated_at: new Date(), // Explicitly set updated_at for soft delete
      },
    });

    if (result.count === 0) {
      // This means no records were updated, possibly because the project
      // was not found or was already marked as deleted.
      // Check if it exists at all to give a more specific message.
      const projectExists = await prisma.projects.findUnique({ where: { id: projectId }});
      if (!projectExists) {
          console.warn(`Attempted to soft-delete non-existent project ${projectId}.`);
          // throw new Error(`Project with ID ${projectId} not found for deletion.`); // Option to throw
      } else if (projectExists.is_deleted) {
          console.warn(`Project ${projectId} was already soft-deleted.`);
      } else {
          // Should not happen if where clause was `is_deleted: false`
          console.warn(`Project ${projectId} not found or couldn't be soft-deleted for an unknown reason.`);
      }
      // Depending on desired behavior, you might not throw an error if it's already deleted or not found.
      // For idempotency, one might consider this a "successful" no-op.
      return;
    }

    console.log(`Successfully soft-deleted project ${projectId}`);

    // Note: Soft deleting a project does not automatically soft-delete related records
    // like 'tasks' or 'project_permissions' unless you add explicit logic.
    // The 'onDelete: Cascade' on 'project_permissions' is for hard database deletes.

  } catch (error) {
    console.error(`Error soft-deleting project ${projectId}:`, error);
    throw new Error(`Could not soft-delete project ${projectId}.`);
  }
}


/**
 * Updates the permissions for a project by comparing the current state
 * with the desired state and applying only necessary changes (add, update, delete).
 * The project owner's "owner" role is preserved and not affected by this function.
 *
 * @param projectId The ID of the project to update permissions for.
 * @param desiredPermissionsList An array of permission objects representing the desired state for team members.
 */
export async function updateProjectPermissionsAlt(
  projectId: string,
  desiredPermissionsList: ProjectPermissionInput[]
): Promise<void> {
  if (!projectId) {
    throw new Error("updateProjectPermissions: projectId is required.");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Get the project's owner_id to protect their "owner" permission.
      const project = await tx.projects.findUnique({
        where: { id: projectId },
        select: { owner: true }, // 'owner' field in 'projects' table holds the user_id of the owner
      });

      if (!project) {
        throw new Error(`Project with ID ${projectId} not found.`);
      }
      const projectOwnerUserId = project.owner;

      // 2. Fetch current non-owner permissions for the project.
      const currentPermissions = await tx.project_permissions.findMany({
        where: {
          project_id: projectId,
          NOT: {
            user_id: projectOwnerUserId,
            role: "owner",
          },
        },
      });

      // Create maps for easier lookups
      const currentPermissionsMap = new Map(
        currentPermissions.map(p => [p.user_id, p.role])
      );
      // Filter out any attempt to manage the project owner with 'owner' role from the desired list,
      // as that specific permission is sacred and managed by the project's 'owner' field.
      const desiredPermissionsMap = new Map(
        desiredPermissionsList
          .filter(p => !(p.user_id === projectOwnerUserId && p.role === "owner"))
          .map(p => [p.user_id, p.role])
      );

      const permissionsToAdd: Prisma.ProjectPermissionsCreateManyInput[] = [];
      const userIdsToDelete: string[] = [];
      const permissionsToUpdate: { user_id: string; role: string }[] = [];

      // 3. Determine changes:

      // Check for permissions to add or update
      for (const [userId, desiredRole] of desiredPermissionsMap.entries()) {
        const currentRole = currentPermissionsMap.get(userId);
        if (!currentRole) {
          // User is in desired list but not in current: Add permission
          permissionsToAdd.push({
            project_id: projectId,
            user_id: userId,
            role: desiredRole,
          });
        } else if (currentRole !== desiredRole) {
          // User is in both, but role has changed: Update permission
          permissionsToUpdate.push({ user_id: userId, role: desiredRole });
        }
      }

      // Check for permissions to delete
      for (const [userId, currentRole] of currentPermissionsMap.entries()) {
        if (!desiredPermissionsMap.has(userId)) {
          // User is in current permissions but not in desired: Delete permission
          userIdsToDelete.push(userId);
        }
      }

      // 4. Execute database operations:

      if (userIdsToDelete.length > 0) {
        await tx.project_permissions.deleteMany({
          where: {
            project_id: projectId,
            user_id: { in: userIdsToDelete },
            // Redundant NOT owner check, but good for safety as userIdsToDelete should already be filtered
            NOT: { role: "owner" }
          },
        });
        console.log(`Deleted ${userIdsToDelete.length} permissions for project ${projectId}. Users: ${userIdsToDelete.join(', ')}`);
      }

      if (permissionsToAdd.length > 0) {
        await tx.project_permissions.createMany({
          data: permissionsToAdd,
        });
        console.log(`Added ${permissionsToAdd.length} permissions for project ${projectId}.`);
      }

      if (permissionsToUpdate.length > 0) {
        for (const permToUpdate of permissionsToUpdate) {
          await tx.project_permissions.updateMany({ // updateMany in case user had multiple (should not happen)
            where: {
              project_id: projectId,
              user_id: permToUpdate.user_id,
              // Safety check: ensure we're not accidentally trying to change an 'owner' role here
              // This user_id should not be the projectOwnerUserId with role 'owner' due to earlier filtering.
              NOT: { role: "owner" }
            },
            data: {
              role: permToUpdate.role,
              updated_at: new Date(), // Manually update timestamp
            },
          });
        }
        console.log(`Updated ${permissionsToUpdate.length} permissions for project ${projectId}.`);
      }

      if (userIdsToDelete.length === 0 && permissionsToAdd.length === 0 && permissionsToUpdate.length === 0) {
        console.log(`No permission changes required for project ${projectId}.`);
      } else {
        console.log(`Successfully updated permissions with granular changes for project ${projectId}`);
      }
    });
  } catch (error) {
    console.error(`Error updating permissions with diff for project ${projectId}:`, error);
    if (error instanceof Error && error.message.includes(`Project with ID ${projectId} not found.`)) {
        throw error;
    }
    throw new Error(`Could not update project permissions for project ${projectId}.`);
  }
}


// Conceptual backend function (TaskDAOAlt.ts or similar)
/**
 * Updates project permissions based on a list of changes (add, delete, update).
 * @param projectId The ID of the project.
 * @param changes An array of permission changes.
 */
export async function updateProjectPermissionsDelta(
  projectId: string,
  changes: { action: 'add' | 'delete' | 'update'; userId: string; role?: string }[]
) {
  // You might want to wrap these operations in a transaction
  // if you need all changes to succeed or fail together.
  // For simplicity, we'll perform operations individually here.
  // If any operation fails, it will throw an error.


  try {
    for (const change of changes) {
      if (change.action === 'add') {
        if (!change.role) {
          console.warn(`Skipping add action for user ${change.userId}: role is missing.`);
          continue; // Skip if role is missing for add
        }
        // Add new permission
        await prisma.project_permissions.create({
          data: {
            project_id: projectId,
            user_id: change.userId,
            role: change.role,
            // created_at and updated_at will be handled by Prisma's @default(now())
          },
        });
      } else if (change.action === 'delete') {
        // Delete permission(s) for the user in this project
        await prisma.project_permissions.deleteMany({
          where: {
            project_id: projectId,
            user_id: change.userId,
          },
        });
      } else if (change.action === 'update') {
         if (!change.role) {
          console.warn(`Skipping update action for user ${change.userId}: new role is missing.`);
          continue; // Skip if new role is missing for update
        }
        // Update permission(s) for the user in this project
        // Note: updateMany is used as a safety measure in case of unexpected duplicate entries,
        // though ideally there should be only one permission per user/project.
        await prisma.project_permissions.updateMany({
          where: {
            project_id: projectId,
            user_id: change.userId,
          },
          data: {
            role: change.role,
            updated_at: new Date(), // Explicitly update updated_at
          },
        });
      } else {
        console.warn(`Unknown action type received: ${change.action}`);
        // Optionally throw an error or handle unknown action types
      }
    }

    // You might return a success indicator or the updated list of permissions
    // as needed by your frontend or subsequent logic.
    // For now, we'll just complete the function execution.

  } catch (error) {
    console.error("Error updating project permissions:", error);
    // Re-throw the error to be caught by the frontend's handleSubmit
    throw error;
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client if it was initialized here
  }
}
// You would also keep the getProjectTeamMembers and deleteProject functions as previously defined,
// ensuring their assumptions about the 'users' table fields (username, email, avatar_url, role)
// are correct for your schema.
// For example:
// export async function getProjectTeamMembers(projectId: string): Promise<TeamMemberWithPermission[]> { /* ... as before ... */ }
// export async function deleteProject(projectId: string): Promise<void> { /* ... as before ... */ }
