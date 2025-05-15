import { auth } from "@/lib/auth";
import { getProjectsForCurrentUser, getUsers } from "@/lib/dao/TaskDAOAlt";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCards from "./components/project-cards";
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

  const initialUsers = await getUsers("")

  console.log("returning initial users " + initialUsers.length)
  console.log(initialUsers)

  const handleUserSelect = (user) => {
    console.log("Selected user:", user)
    // Do something with the selected user
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="mb-0">
            <h1 className="text-3xl font-bold mb-2">My Projects</h1>
            {/* <p className="text-muted-foreground">Manage and access your projects</p> */}
            <NewProject />
          </div>
          <ProjectCards proj={projects} />

        </div>
      </div>
    </>
  )
}
