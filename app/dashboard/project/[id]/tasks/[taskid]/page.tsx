import { getTaskById, getTaskCommentsByTaskId,getTaskActivitiesByTaskId } from "@/lib/dao/TaskDAOAlt";
import EditTaskPage from "./task";
import { taskSchema } from "@/app/dashboard/tasks/data/schema";
import { z } from "zod"

// Simulate a database read for tasks.
async function getTask(id: string) {

  //const data = await TaskDAO.getTasksByProjectId('7f04e41f-87a8-4561-8fa8-01de820931aa'); 
  const data = await getTaskById(id); 
  console.log("Read tasks records from the database")
  console.log("Task title is " + data?.title)
  const task = data

  return z.array(taskSchema).parse(task)
  //return task
}

export default async function TaskPage() {
    
    // Do permission fetching here
    //const users = await prisma.testTable.findMany();
    console.log("Fetching task alone")
    console.log(await getTaskById("e9aa08bf-66d9-4c44-a062-e828b3701ffa"))
    //console.log(await getTaskCommentsByTaskId("e9aa08bf-66d9-4c44-a062-e828b3701ffa"))
    console.log("Fetching all together")
    const taskActivities = await getTaskActivitiesByTaskId("e9aa08bf-66d9-4c44-a062-e828b3701ffa")
    console.log(taskActivities)
    //console.log(temp.comments[0].users)
    
    return (
        <EditTaskPage taskActivities={taskActivities} />
    );
  }
  

  /**
   * task_id - e9aa08bf-66d9-4c44-a062-e828b3701ffa
   * project_id - 7f04e41f-87a8-4561-8fa8-01de820931aa
   * created_by - 7b782ab7-ca01-47c8-8232-948e65d90ea0
   * URL - http://localhost:3000/dashboard/project/7f04e41f-87a8-4561-8fa8-01de820931aa/tasks/e9aa08bf-66d9-4c44-a062-e828b3701ffa
   * 
   */