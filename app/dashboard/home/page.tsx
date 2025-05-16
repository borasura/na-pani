// src/app/(dashboard)/page.tsx
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Layers,
  } from "lucide-react";
  
  
  // Import new components
  import StatCard from './components/StatsCard'
  import NeedsAttentionSection from "./components/NeedsAttentionSection";
  import RecentActivitySection from "./components/RecentActivitySection";
  import PerformanceSection from "./components/PerformanceSection";
  import UpcomingDeadlinesSection from "./components/UpcomingDeadlinesSection";
  import TeamWorkloadSection from "./components/TeamWorkloadSection";
import { getAttentionNeededTasksForCurrentUser, getRecentActivitiesForCurrentUser } from "@/lib/dao/TaskDAOAlt";
  
  // Data (In a real app, this would come from an A
//   const attentionItemsData = [
//     {
//       id: "1",
//       title: "Update marketing materials",
//       project: "Marketing Campaign Q2",
//       issue: "Past due date",
//       dueDate: "Mar 20, 2025",
//       priority: "High",
//     },
//     {
//       id: "2",
//       title: "Finalize API documentation",
//       project: "Mobile App Development",
//       issue: "No updates in 7 weeks",
//       dueDate: "Apr 15, 2025",
//       priority: "Medium",
//     },
//     {
//       id: "3",
//       title: "Review design mockups",
//       project: "Website Redesign",
//       issue: "Missing assignment",
//       dueDate: "Apr 5, 2025",
//       priority: "High",
//     },
//     {
//       id: "4",
//       title: "Prepare Q2 budget forecast",
//       project: "Annual Report",
//       issue: "Past due date",
//       dueDate: "Mar 25, 2025",
//       priority: "High",
//     },
//     {
//       id: "5",
//       title: "Schedule team training sessions",
//       project: "Team Training",
//       issue: "No updates in 5 weeks",
//       dueDate: "Apr 10, 2025",
//       priority: "Medium",
//     },
//   ];


// //     {
//     id: 'ca1ed088-079c-47cc-8346-c3b1154735e6',
//     type: 'task_history',
//     content: "Changed priority from 'High' to 'Medium'",
//     username: 'Louis Litt',
//     email: 'louis@test.com',
//     created_date: 2025-05-16T07:52:27.813Z,
//     task: 'Security Measures',
//     project: 'Data Privacy Compliance'
//   },
// //   ]
  
  const activityItemsData1 = [
    {
      id: "1",
      username: "Sarah Johnson",
      email: "sarah.j@example.com",
      type: "comment" as "comment" | "task_history",
      content: "I've updated the design files with the new color scheme. Please review when you get a chance.",
      project: "Website Redesign",
      task: "Update design system",
      time: "2 hours ago",
      avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=SJ",
    },
    {
      id: "2",
      username: "Michael Chen",
      email: "m.chen@example.com",
      type: "task_history" as "comment" | "task_history",
      content: "Changed status from 'Todo' to 'In Progress'",
      project: "Mobile App Development",
      task: "Implement user authentication",
      time: "4 hours ago",
      avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=MC",
    },
    {
      id: "3",
      username: "Alex Rodriguez",
      email: "alex.r@example.com",
      type: "comment" as "comment" | "task_history",
      content: "The API integration is complete. I've added documentation in the shared folder.",
      project: "Mobile App Development",
      task: "API Integration",
      time: "Yesterday",
      avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=AR",
    },
    {
      id: "4",
      username: "Emily Wong",
      email: "e.wong@example.com",
      type: "task_history" as "comment" | "task_history",
      content: "Changed priority from 'Medium' to 'High'",
      project: "Marketing Campaign Q2",
      task: "Create social media assets",
      time: "Yesterday",
      avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=EW",
    },
  ];
  
  const deadlineItemsData = [
      { id: "1", title: "Finalize Q2 marketing budget", project: "Marketing Campaign Q2", dueDate: "Tomorrow", priority: "High" },
      { id: "2", title: "Complete user flow diagrams", project: "Website Redesign", dueDate: "In 2 days", priority: "Medium" },
      { id: "3", title: "Review API documentation", project: "Mobile App Development", dueDate: "In 3 days", priority: "Medium" },
      { id: "4", title: "Prepare training materials", project: "Team Training", dueDate: "In 5 days", priority: "Low" },
  ];
  
  const workloadItemsData = [
      { id: "1", name: "Sarah Johnson", role: "Designer", tasks: 8, avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=SJ", completion: 65 },
      { id: "2", name: "Michael Chen", role: "Developer", tasks: 12, avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=MC", completion: 40 },
      { id: "3", name: "Alex Rodriguez", role: "Backend Engineer", tasks: 6, avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=AR", completion: 80 },
      { id: "4", name: "Emily Wong", role: "Marketing Specialist", tasks: 9, avatar: "https://placehold.co/32x32/E0E0E0/B0B0B0?text=EW", completion: 55 },
  ];
  
  async function getAttentionItemsData(){
    const data = await getAttentionNeededTasksForCurrentUser()
    console.log(data)
    return data
  }

  async function getActivityItemsData(){
    const data = await getRecentActivitiesForCurrentUser()
    console.log(data)
    return data
  }
  
  export default async function DashboardPage() {
    // In a real application, you would fetch this data using Prisma or another data source.
    // For demonstration, we're using static data.

    const attentionItemsData = await getAttentionItemsData();

    const activityItemsData = await getActivityItemsData();
  
    return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {/* Stats Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Projects"
              value="12"
              description="+2 from last month"
              icon={<Layers className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Active Tasks"
              value="48"
              description="+8 from last week"
              icon={<Activity className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Completion Rate"
              value="78%"
              description="+12% from last month"
              icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Overdue Tasks"
              value="7"
              description="-3 from last week"
              icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
              valueClassName="text-destructive"
            />
          </div>
  
          {/* Main Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <NeedsAttentionSection items={attentionItemsData} />
            <RecentActivitySection items={activityItemsData} />
          </div>
  
          {/* Lower Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PerformanceSection />
            <UpcomingDeadlinesSection items={deadlineItemsData} />
            <TeamWorkloadSection items={workloadItemsData} />
          </div>
        </main>
      </div>
    );
  }
  