import prisma from "@/lib/prisma";

export class TaskDAO {
    // Get all tasks for a project
    static async getTasksByProjectId(project_id: string) {
         
        const tasks_results = await prisma.tasks.findMany({
            where: { project_id },
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
                }
            },
            orderBy: { created_at: "desc" },
        });

        const flattnedTasks = tasks_results.map(task => {
            const { users_tasks_assigned_to, ...rest } = task; // Destructure to remove users_tasks_assigned_to
            return {
              ...rest, // Spread the remaining fields
              assigned_to_id: users_tasks_assigned_to?.id, // Add the ID of the assigned user at the top level
              assigned_to_username: users_tasks_assigned_to?.username, // Add the username of the assigned user at the top level
            };
        });

        return flattnedTasks;
        
    }

    // Get a single task by ID
    static async getTaskById(taskId: string) {
        return await prisma.tasks.findUnique({ where: { id: taskId } });
    }

    // Create a new task priority, color_code, created_by
    static async createTask(title: string, description: string | null, status: string, due_date: Date | null, project_id: string, priority: string | "Medium", color_code: string | "", created_by: string) {
        return await prisma.tasks.create({
            data: { title, description, status, due_date, project_id, priority, color_code, created_by },
        });
    }

    // Update a task
    static async updateTask(id: string, title?: string, description?: string, status?: string, due_date?: Date) {
        return await prisma.tasks.update({
            where: { id },
            data: { title, description, status, due_date },
        });
    }

    // Delete a task
    static async deleteTask(taskId: string) {
        return await prisma.tasks.delete({ where: { id: taskId } });
    }
}
