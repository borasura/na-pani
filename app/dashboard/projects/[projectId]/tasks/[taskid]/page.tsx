import {
  getTaskById,
  getTaskActivitiesByTaskId,
} from '@/lib/dao/TaskDAOAlt';
import EditTaskPage from './task';
import { taskSchema } from '@/app/dashboard/tasks/data/schema';
import { z } from 'zod';

// Simulate a database read for tasks.
async function getTask(id: string) {
  const data = await getTaskById(id);
  console.log('Read tasks records from the database');
  console.log('Task title is ' + data?.title);
  const task = data;

  return z.array(taskSchema).parse(task);
  //return task
}

export default async function TaskPage({
  params,
}: {
  params: { taskid: string };
}) {
  const { taskid } = params;
  console.log('The URL param taskId is ' + taskid);

  console.log('Fetching task alone');
  console.log('Fetching all together');
  const taskActivities = await getTaskActivitiesByTaskId(taskid);
  console.log(taskActivities);

  return <EditTaskPage taskActivities={taskActivities} />;
}

/**
 * task_id - e9aa08bf-66d9-4c44-a062-e828b3701ffa
 * project_id - 7f04e41f-87a8-4561-8fa8-01de820931aa
 * created_by - 7b782ab7-ca01-47c8-8232-948e65d90ea0
 * URL - http://localhost:3000/dashboard/project/7f04e41f-87a8-4561-8fa8-01de820931aa/tasks/e9aa08bf-66d9-4c44-a062-e828b3701ffa
 *
 */
