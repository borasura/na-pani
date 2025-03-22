import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { taskSchema } from "./data/schema"

import { TaskDAO } from "@/lib/dao/TaskDAO";
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks(id: string) {

  const data = await TaskDAO.getTasksByProjectId(id); 
  console.log("Read tasks records from the database")
  console.log(data[0])
  const tasks = data

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage({params}) {

  const {id} = await params
  console.log("Received project id as " + id)
  const tasks = await getTasks(id)

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
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}