import type React from "react"
import { SidebarNavigation } from "./components/sidebar-navigation"
import { ThemeProvider } from "next-themes"
import "@/app/globals.css"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import NextBreadcrumb from "../dashboard/components/bread-crumb"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    // TODO - read and fix this https://ui.shadcn.com/docs/dark-mode/next
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">
            <SidebarNavigation />
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        {/* <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <NextBreadcrumb
          homeElement={'Home'}
          separator={<span> | </span>}
          activeClasses='text-amber-500'
          containerClasses='flex py-5 bg-gradient-to-r from-purple-600 to-blue-600' 
          listClasses='hover:underline mx-2 font-bold'
          capitalizeLinks
        /> */}
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
            
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

