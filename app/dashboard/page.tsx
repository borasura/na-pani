import ClientComponent from "@/components/client-component";
import { auth } from "@/lib/auth";
import { getProjectsForCurrentUser } from "@/lib/dao/TaskDAOAlt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCards from "./project-cards";

import { NewProject } from './components/new-project'


export default async function Page() {

  const session = await auth.api.getSession({
      headers: await headers()
    });
  
  if (!session) {
    return redirect('/')
  }  
  const user = session?.user;

  // Get list of projects and display them as items
  const projects = await getProjectsForCurrentUser()
  console.log(projects)

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
          <div className='mt-10 text-center'>
                <h1 className='text-2xl font-bold underline'>Welcome to the dashboard</h1>
                <ul>
                  <li>Name: {user.name}</li>
                  <li>Email: {user.email}</li>
                </ul>
                <ClientComponent />
              </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
          <ul>
            {
              projects.map((project, index) => (
                <li key={index}>
                  {project.name}
                </li>
              ))
            }
          </ul>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" >
          {/* <ProjectCards /> */}
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="mb-0">
        <h1 className="text-3xl font-bold mb-2">My Projects</h1>
        <p className="text-muted-foreground">Manage and access your projects</p>
        <NewProject />
        </div>
        <ProjectCards proj={projects} />
        </div>
      </div>
    </>
  )
}
