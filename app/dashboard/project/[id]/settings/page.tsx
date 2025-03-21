import {
  getProjectById
} from '@/lib/dao/TaskDAOAlt';

import { NewProjectForm } from '@/app/dashboard/components/new-project-form';

// Simulate a database read for tasks.
async function getProjectDetails(id: string) {
  //const data = await TaskDAO.getTasksByProjectId('7f04e41f-87a8-4561-8fa8-01de820931aa');
  const data = await getProjectById(id);
  console.log('---------Read project details from');
  console.log(data);
  const task = data;

  //return z.array(taskSchema).parse(task)
  return task;
}

// export default function TaskPage({ params }: { params: { task: string } }) {
//   const { taskId } = params;
//   console.log("The URL param taskId is "+ taskId)

//export default async function TaskPage() {

export default async function ProjectSettings({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log('The URL param projectID is ' + id);

  // Do permission fetching here
  //const users = await prisma.testTable.findMany();
  //console.log("Fetching task alone")
  //console.log(await getTaskById("e9aa08bf-66d9-4c44-a062-e828b3701ffa"))
  //console.log(await getTaskCommentsByTaskId("e9aa08bf-66d9-4c44-a062-e828b3701ffa"))
  //console.log("Fetching all together")
  //const taskActivities = await getTaskActivitiesByTaskId("e9aa08bf-66d9-4c44-a062-e828b3701ffa")
  const projectDetails = await getProjectDetails(id);
  //console.log(taskActivities)
  //console.log(temp.comments[0].users)

  return (
    // <EditTaskPage taskActivities={taskActivities} />
    <>
      <div className="flex min-h-screen bg-background">
        <div className="flex-1 flex flex-col md:flex-row p-6">
          <NewProjectForm initialValues={projectDetails} isEditMode={true} onSave={''}></NewProjectForm>
        </div>
      </div>
    </>
  );
}

/**
 * task_id - e9aa08bf-66d9-4c44-a062-e828b3701ffa
 * project_id - 7f04e41f-87a8-4561-8fa8-01de820931aa
 * created_by - 7b782ab7-ca01-47c8-8232-948e65d90ea0
 * URL - http://localhost:3000/dashboard/project/7f04e41f-87a8-4561-8fa8-01de820931aa/settings
 *
 */
