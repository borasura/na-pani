import { Metadata } from "next"
import Image from "next/image"
import { ProjectNav } from "./project-nav"
import { Children } from "react"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}


export default function DashboardProjectLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-12 items-center">
            {/* <TeamSwitcher /> */}
            <ProjectNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}