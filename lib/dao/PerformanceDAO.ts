'use server'

import prisma from "@/lib/prisma";
import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { subDays, isBefore, isAfter } from "date-fns";

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


export async function getPerformanceMetricsForCurrentUser(){
  const user_id = await getUserId()
  return getPerformanceMetricsForUser(user_id)
}

export async function getPerformanceMetricsForUser(user_id: string) {
  const now = new Date();
  const lastMonth = subDays(now, 30);

  // Get all tasks in this project, assigned to user, and not deleted, updated in last 30 days
  const tasks = await prisma.tasks.findMany({
    where: {
      assigned_to: user_id,
      is_deleted: false,
      updated_at: { gte: lastMonth },
    },
    include: { comments: true },
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const completedCount = completedTasks.length;

  const onTimeCompleted = completedTasks.filter((task) =>
    task.due_date ? isBefore(task.updated_at!, task.due_date) : false
  );

  const overdueTasks = tasks.filter((task) =>
    task.status !== "completed" && task.due_date && isBefore(task.due_date, now)
  );

  const avgCompletionTimeDays =
    completedCount > 0
      ? completedTasks.reduce((sum, task) => {
          const created = task.created_at ?? now;
          const completed = task.updated_at ?? now;
          return sum + (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24); // in days
        }, 0) / completedCount
      : 0;

  const activeTasks = tasks.filter((task) => task.status !== "completed");

  const collaborationTasks = tasks.filter((task) => task.comments.length > 0);
  const collaborationIndex =
    totalTasks > 0 ? Math.round((collaborationTasks.length / totalTasks) * 100) : 0;

  return {
    onTimeCompletion: {
      percent:
        completedCount > 0
          ? Math.round((onTimeCompleted.length / completedCount) * 100)
          : 0,
      insight:
        completedCount === 0
          ? "No tasks completed yet"
          : onTimeCompleted.length / completedCount > 0.9
          ? "Excellent discipline"
          : onTimeCompleted.length / completedCount > 0.7
          ? "Good, but can improve"
          : "Many tasks are late",
    },
    overdueTasks: {
      count: overdueTasks.length,
      percent: totalTasks > 0 ? Math.round((overdueTasks.length / totalTasks) * 100) : 0,
      insight:
        overdueTasks.length === 0
          ? "No overdue tasks – great!"
          : overdueTasks.length < 3
          ? "A few tasks need attention"
          : "Several tasks are overdue",
    },
    completedThisMonth: {
      count: completedCount,
      percent: totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0,
      trend: "N/A", // You can add previous month data if needed
      insight:
        completedCount === 0
          ? "No tasks completed yet"
          : completedCount < 5
          ? "Slow month"
          : "Solid output",
    },
    avgCompletionTime: {
      value: Number(avgCompletionTimeDays.toFixed(1)),
      percent:
        avgCompletionTimeDays <= 2
          ? 90
          : avgCompletionTimeDays <= 5
          ? 70
          : 50,
      insight:
        avgCompletionTimeDays === 0
          ? "No completed tasks yet"
          : avgCompletionTimeDays <= 2
          ? "Very efficient"
          : avgCompletionTimeDays <= 5
          ? "Average pace"
          : "Could be faster",
    },
    activeTasks: {
      count: activeTasks.length,
      percent: totalTasks > 0 ? Math.round((activeTasks.length / totalTasks) * 100) : 0,
      insight:
        activeTasks.length === 0
          ? "No active tasks"
          : activeTasks.length < 5
          ? "Manageable workload"
          : "Heavy workload",
    },
    collaboration: {
      percent: collaborationIndex,
      insight:
        collaborationIndex > 60
          ? "Strong collaboration"
          : collaborationIndex > 30
          ? "Decent, could be improved"
          : "Low collaboration",
    },
  };
}

export async function getPerformanceMetricsByProjectId(project_id: string, user_id: string) {
  const now = new Date();
  const lastMonth = subDays(now, 30);

  // Get all tasks in this project, assigned to user, and not deleted, updated in last 30 days
  const tasks = await prisma.tasks.findMany({
    where: {
      project_id,
      assigned_to: user_id,
      is_deleted: false,
      updated_at: { gte: lastMonth },
    },
    include: { comments: true },
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const completedCount = completedTasks.length;

  const onTimeCompleted = completedTasks.filter((task) =>
    task.due_date ? isBefore(task.updated_at!, task.due_date) : false
  );

  const overdueTasks = tasks.filter((task) =>
    task.status !== "completed" && task.due_date && isBefore(task.due_date, now)
  );

  const avgCompletionTimeDays =
    completedCount > 0
      ? completedTasks.reduce((sum, task) => {
          const created = task.created_at ?? now;
          const completed = task.updated_at ?? now;
          return sum + (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24); // in days
        }, 0) / completedCount
      : 0;

  const activeTasks = tasks.filter((task) => task.status !== "completed");

  const collaborationTasks = tasks.filter((task) => task.comments.length > 0);
  const collaborationIndex =
    totalTasks > 0 ? Math.round((collaborationTasks.length / totalTasks) * 100) : 0;

  return {
    onTimeCompletion: {
      percent:
        completedCount > 0
          ? Math.round((onTimeCompleted.length / completedCount) * 100)
          : 0,
      insight:
        completedCount === 0
          ? "No tasks completed yet"
          : onTimeCompleted.length / completedCount > 0.9
          ? "Excellent discipline"
          : onTimeCompleted.length / completedCount > 0.7
          ? "Good, but can improve"
          : "Many tasks are late",
    },
    overdueTasks: {
      count: overdueTasks.length,
      percent: totalTasks > 0 ? Math.round((overdueTasks.length / totalTasks) * 100) : 0,
      insight:
        overdueTasks.length === 0
          ? "No overdue tasks – great!"
          : overdueTasks.length < 3
          ? "A few tasks need attention"
          : "Several tasks are overdue",
    },
    completedThisMonth: {
      count: completedCount,
      percent: totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0,
      trend: "N/A", // You can add previous month data if needed
      insight:
        completedCount === 0
          ? "No tasks completed yet"
          : completedCount < 5
          ? "Slow month"
          : "Solid output",
    },
    avgCompletionTime: {
      value: Number(avgCompletionTimeDays.toFixed(1)),
      percent:
        avgCompletionTimeDays <= 2
          ? 90
          : avgCompletionTimeDays <= 5
          ? 70
          : 50,
      insight:
        avgCompletionTimeDays === 0
          ? "No completed tasks yet"
          : avgCompletionTimeDays <= 2
          ? "Very efficient"
          : avgCompletionTimeDays <= 5
          ? "Average pace"
          : "Could be faster",
    },
    activeTasks: {
      count: activeTasks.length,
      percent: totalTasks > 0 ? Math.round((activeTasks.length / totalTasks) * 100) : 0,
      insight:
        activeTasks.length === 0
          ? "No active tasks"
          : activeTasks.length < 5
          ? "Manageable workload"
          : "Heavy workload",
    },
    collaboration: {
      percent: collaborationIndex,
      insight:
        collaborationIndex > 60
          ? "Strong collaboration"
          : collaborationIndex > 30
          ? "Decent, could be improved"
          : "Low collaboration",
    },
  };
}