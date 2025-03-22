import { getProjectById, getProjectStatsById } from '@/lib/dao/TaskDAOAlt';

import ProjectHeader from './project-header';
import ProjectInfoCards from "./project-info-cards";
import ProjectTabs from "./project-tabs";

async function getProjectDetails(id: string) {
  //const data = await TaskDAO.getTasksByProjectId('7f04e41f-87a8-4561-8fa8-01de820931aa');
  const data = await getProjectById(id);
  console.log('---------Read project details from');
  console.log(data);
  const task = data;

  return task;
}

export default async function ProjectSettings({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  console.log('The URL param projectID is ' + id);
  const projectDetails = await getProjectDetails(id);
  console.log(projectDetails);

  const projectStats = await getProjectStatsById(id);
  console.log(projectStats)

  return (
    <div className="container mx-auto p-4 space-y-6">
          {/* Project Header */}
          <ProjectHeader name={projectDetails.name} description={projectDetails.description} />
    
          {/* Project Info Cards */}          
          <ProjectInfoCards projectData={projectDetails} projectStats={projectStats} />    
        
          {/* Main Content Tabs */}
          <ProjectTabs id={23423} />
        </div>
  );
}
