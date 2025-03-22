import TasksTableView from "@/components/task/tasks-table-view";

export default async function ProjectTasksPage({params}) {

  const {id} = await params
  console.log("Received project id as " + id)
  //const tasks = await getTasks(id)

  return (
    <>
    <TasksTableView projectId={id} isProjectView={true} />
    </>
  );
}