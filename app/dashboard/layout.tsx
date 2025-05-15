import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import NextBreadcrumb from './components/bread-crumb';
import {
  getProjectsForCurrentUser,
  getUserDetails,
} from '@/lib/dao/TaskDAOAlt';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await getProjectsForCurrentUser();
  const userDetails = await getUserDetails();
  const userProfile = {
    name: userDetails.username, // Map username to name
    email: userDetails.email,
    avatar: '/default-avatar.png', // Provide a default avatar or map appropriately
  };
  //TODO - wrap this in promiseall

  console.log('Inside dashboard layout');
  console.log(projects[0]);
  console.log(userProfile);

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
              activeClasses="text-amber-500"
              containerClasses="flex py-5"
              listClasses="hover:underline mx-2 font-bold"
              capitalizeLinks
            />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
