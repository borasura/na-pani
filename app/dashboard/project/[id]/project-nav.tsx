'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from "next/link"

import clsx from 'clsx';

import { cn } from "@/lib/utils"

const links = ["overview", "tasks", "board", "settings"]

export function ProjectNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  //const router = useRouter()  // Access the Next.js router
  // Helper function to check if the current path matches the link
  const pathname = usePathname()
  console.log("Pathname is " + pathname)

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link}  // Assign a key for each link to help React with rendering
          href={link} // Dynamically set the href
          className={clsx(
            'text-sm font-medium transition-colors hover:text-primary',
            {
              'text-muted-foreground': !pathname.endsWith(link)  // Add 'text-muted-foreground' if the link doesn't match the current pathname
            }
          )}
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}  {/* Capitalize the first letter of the link name */}
        </Link>
      ))}
    </nav>
  )

  

  // return (
  //   <nav
  //     className={cn("flex items-center space-x-4 lg:space-x-6", className)}
  //     {...props}
  //   >

  //     <Link
  //       href="overview"
  //       className={clsx("text-sm font-medium transition-colors hover:text-primary",
  //         {
  //           'text-muted-foreground': !pathname.endsWith("overview")
  //         },
  //       )}
  //     >
  //       Overview
  //     </Link>

  //     <Link
  //       href="tasks"
  //       className={clsx("text-sm font-medium transition-colors hover:text-primary",
  //         {
  //           'text-muted-foreground': !pathname.endsWith("tasks")
  //         },
  //       )}
  //     >
  //       Tasks
  //     </Link>

      
  //     <Link
  //       href="board"
  //       className={clsx("text-sm font-medium transition-colors hover:text-primary",
  //         {
  //           'text-muted-foreground': !pathname.endsWith("board")
  //         },
  //       )}
  //     >
  //       Board
  //     </Link>

  //     <Link
  //       href="settings"
  //       className={clsx("text-sm font-medium transition-colors hover:text-primary",
  //         {
  //           'text-muted-foreground': !pathname.endsWith("settings")
  //         },
  //       )}
  //     >
  //       Settings
  //     </Link>
  //   </nav>
  // )
}