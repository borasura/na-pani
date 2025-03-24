import ProjectsOverview from "@/components/project/projects-overview";
import { getProjectsForCurrentUser, getProjectsOverviewForCurrentUser } from "@/lib/dao/TaskDAOAlt";


export default async function Page() {

    //const projects = await getProjectsForCurrentUser();
    const projects = await getProjectsOverviewForCurrentUser();
    console.log('---------Read projects from');
    console.log(projects[0]);

    return <ProjectsOverview projects={projects} />
  }
  
//   TODO Fix this - this should not be single project but projects panel
  