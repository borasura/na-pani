import TasksTableView from "@/components/task/tasks-table-view";

export default async function ProjectTasksPage({params}) {

  const {projectId} = await params
  console.log("Received project id as " + projectId)
  //const tasks = await getTasks(id)

  return (
    <>
    <TasksTableView projectId={projectId} isProjectView={true} />
    </>
  );
}