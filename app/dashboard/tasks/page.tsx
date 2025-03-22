import TasksTableView from "@/components/task/tasks-table-view";

export default async function UserTasksPage({params}) {

  const {id} = await params
  const isProjectView = id ? 'true' : 'false'
  console.log("UserTasksPage - Received project id as " + id)
  console.log("UserTasksPage - isProjectView is " + isProjectView)
  //const tasks = await getTasks(id)

  return (
    <>
    <TasksTableView projectId={id} />
    </>
  );
}