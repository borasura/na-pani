import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/task/columns"
import { DataTable } from "@/components/task/data-table"
import { taskSchema } from "@/components/task/data/schema"

import { TaskDAO } from "@/lib/dao/TaskDAO";
import { getTasksForCurrentUser } from '@/lib/dao/TaskDAOAlt'

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getProjectTasks(id: string) {

  const data = await TaskDAO.getTasksByProjectId(id); 
  console.log("Read tasks records from the database for current project")
  console.log(data[0])
  const tasks = data

  return z.array(taskSchema).parse(tasks)
}

async function getUserTasks(){

  const data = await getTasksForCurrentUser()
  console.log("Read tasks records from the database for current user")
  console.log(data[0])
  const tasks = data

  return z.array(taskSchema).parse(tasks)
}

export default async function TasksTableView({projectId}) {

  const id = projectId
  console.log("TasksTableView - Received project id as " + id)

  const tasks = projectId ? await getProjectTasks(id) : await getUserTasks()
  const projectVisible = projectId ? false : true
  
  console.log("Logging columns --------------")
  console.log(columns)
  // If ID exits we are on a Project page, 
  // IF ID does not exist then we are on the Users task page, so fetch all tasks for this user

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <DataTable data={tasks} columns={columns} isProjectNameVisible={projectVisible} />
      </div>
    </>
  )
}