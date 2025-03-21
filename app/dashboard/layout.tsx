
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import NextBreadcrumb from "./components/bread-crumb";
import { getProjectsForCurrentUser, getUserDetails } from "@/lib/dao/TaskDAOAlt";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const projects = await getProjectsForCurrentUser();
    const userProfile = await getUserDetails();
    //TODO - wrap this in promiseall

    /**
     * const projects = await getProjectsForCurrentUser();
     * const userProfile = await getUserDetails();
     * 
     * await Promise.all(projects, userProfile)
     */
    //console.log("Inside Layout, fetches projects ", projects)
    
    return (
        <SidebarProvider>
            <AppSidebar projects={projects} userProfile={userProfile} />
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <NextBreadcrumb
          homeElement={'Home'}
          separator={<span> | </span>}
          activeClasses='text-amber-500'
          containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600' 
          listClasses='hover:underline mx-2 font-bold'
          capitalizeLinks
        />
                    </div>
                </header>
                {/* <NextBreadcrumb
          homeElement={'Home'}
          separator={<span> | </span>}
          activeClasses='text-amber-500'
          containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600' 
          listClasses='hover:underline mx-2 font-bold'
          capitalizeLinks
        /> */}
                {children}
                
            </SidebarInset>
        </SidebarProvider>
    )
}