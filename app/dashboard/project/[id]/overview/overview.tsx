import ProjectHeader from "./project-header"
import ProjectInfoCards from "./project-info-cards"
import ProjectTabs from "./project-tabs"


export default function ProjectOverview() {
 
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Project Header */}
      <ProjectHeader id={23423} />

      {/* Project Info Cards */}          
      <ProjectInfoCards id={23423} />

    
      {/* Main Content Tabs */}
      <ProjectTabs id={23423} />
    </div>
  )
}

