import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().nullable(),
  status: z.enum(["Backlog", "Todo", "In Progress", "Done", "Blocked"]).default("Todo"), // Adjust status values as per your app
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  color_code: z.string(), 
  due_date: z.date().nullable(),
  created_by: z.string().uuid(),
  assigned_to: z.string().uuid().nullable(),
  created_at: z.date().default(new Date()),
  updated_at: z.date().default(new Date()),
  is_deleted: z.boolean().default(false),
})

export type Task = z.infer<typeof taskSchema>

// // Define the Task schema
// export const TaskSchema = z.object({
//   id: z.string().uuid(),
//   project_id: z.string().uuid(),
//   title: z.string().min(1).max(255),
//   description: z.string().nullable(),
//   status: z.enum(["todo", "in_progress", "done", "blocked"]).default("todo"), // Adjust status values as per your app
//   priority: z.enum(["low", "medium", "high"]).default("medium"),
//   color_code: z.string().regex(/^#[0-9A-Fa-f]{6}$/), // Hex color validation
//   due_date: z.date().nullable(),
//   created_by: z.string().uuid(),
//   assigned_to: z.string().uuid().nullable(),
//   created_at: z.date().default(new Date()),
//   updated_at: z.date().default(new Date()),
//   is_deleted: z.boolean().default(false),
//   comments: z.array(z.unknown()).optional(), // Replace `z.unknown()` with a comment schema if needed
//   task_tags: z.array(z.unknown()).optional(), // Replace `z.unknown()` with a tag schema if needed
//   users_tasks_assigned_to: z.unknown().optional(), // Related user (Replace with a user schema if needed)
//   users_tasks_created_by: z.unknown().optional(), // Related user (Replace with a user schema if needed)
//   projects: z.unknown().optional(), // Related project (Replace with a project schema if needed)
//   tasks_history: z.array(z.unknown()).optional(), // Replace `z.unknown()` with a history schema if needed
// });