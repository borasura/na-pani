import { getAttentionNeededTasks, getProjectById, getProjectStatsById, getRecentActivities, getRecentActivitiesByProject } from '@/lib/dao/TaskDAOAlt';
import ProjectHeader from './components/project-header';
import ProjectInfoCards from "./components/project-info-cards";
import ProjectTabs from "./components/project-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

async function getProjectDetails(id: string) {
    const data = await getProjectById(id);
    return data;
}

async function ProjectSettings({ params }: { params: { projectId: string } }) {
    const { projectId } = params;

    try {
        const [projectDetails, projectStats, attentionNeededTasks, recentActivities] = await Promise.all([
            getProjectDetails(projectId),
            getProjectStatsById(projectId),
            getAttentionNeededTasks(projectId),
            getRecentActivitiesByProject(projectId)
        ]);

        if (!projectDetails || !projectStats || !attentionNeededTasks || !recentActivities) {
            return (
                <div className="container mx-auto p-4 space-y-6">
                    <ProjectHeaderSkeleton />
                    <ProjectInfoCardsSkeleton />
                    <ProjectTabsSkeleton />
                </div>
            );
        }

        return (
            <div className="container mx-auto p-4 space-y-6">
                <ProjectHeader name={projectDetails.name} description={projectDetails.description} />
                <ProjectInfoCards projectData={projectDetails} projectStats={projectStats} />
                <ProjectTabs
                    taskStats={projectStats}
                    attentionNeededTasks={attentionNeededTasks}
                    recentActivities={recentActivities}
                />
            </div>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error: Could not load project data.</div>;
    }
}

// Skeleton Components (Basic examples - customize with Tailwind)
function ProjectHeaderSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded-md w-64 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-48"></div>
        </div>
    );
}

function ProjectInfoCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((index) => (
                <div key={index} className="h-32 bg-gray-300 rounded-md"></div>
            ))}
        </div>
    );
}

function ProjectTabsSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-gray-300 rounded-md w-96"></div>
            <div className="h-64 bg-gray-300 rounded-md"></div>
        </div>
    );
}

export default ProjectSettings;