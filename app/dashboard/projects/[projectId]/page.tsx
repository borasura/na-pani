import { redirect } from "next/navigation"

// Redirect to the overview page
export default function ProjectPage({ params }: { params: { projectId: string } }) {
  redirect(`/projects/${params.projectId}/overview`)
}

