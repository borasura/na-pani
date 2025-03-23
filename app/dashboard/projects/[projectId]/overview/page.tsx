import { getAttentionNeededTasks, getProjectById, getProjectStatsById, getRecentActivities, getRecentActivitiesByProject } from '@/lib/dao/TaskDAOAlt';

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
  params: { projectId: string };
}) {
  const { projectId } = await params;
  console.log('The URL param projectID is ' + projectId);
  const projectDetails = await getProjectDetails(projectId);
  console.log(projectDetails);

  const projectStats = await getProjectStatsById(projectId);
  console.log(projectStats)

  const attentionNeededTasks = await getAttentionNeededTasks(projectId);
  console.log(attentionNeededTasks)

  const recentActivities = await getRecentActivitiesByProject(projectId);
  console.log(recentActivities)
  
  return (
    <div className="container mx-auto p-4 space-y-6">
          {/* Project Header */}
          <ProjectHeader name={projectDetails.name} description={projectDetails.description} />
    
          {/* Project Info Cards */}          
          <ProjectInfoCards projectData={projectDetails} projectStats={projectStats} />    
        
          {/* Main Content Tabs */}
          <ProjectTabs taskStats={projectStats} attentionNeededTasks={attentionNeededTasks} recentActivities={recentActivities} />
        </div>
  );
}
