"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "./data/data"
import { Task } from "./data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

import { formatDateWithMonthName } from "@/lib/utils/date-utils"

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Todo":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
    case "In Progress":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400"
    case "Done":
      return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
    case "Blocked":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100/80 dark:bg-purple-900/30 dark:text-purple-400"
    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

const getStatusColorForIcon = (status: string) => {
  switch (status) {
    case "Todo":
      return "mr-2 h-4 w-4 stroke-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
    case "In Progress":
      return "mr-2 h-4 w-4 stroke-amber-800 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400"
    case "Done":
      return "mr-2 h-4 w-4 stroke-green-800 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
    case "Blocked":
      return "mr-2 h-4 w-4 stroke-purple-800 text-purple-800 hover:bg-purple-100/80 dark:bg-purple-900/30 dark:text-purple-400"
    default:
      return "mr-2 h-4 w-4 stroke-slate-800 text-slate-800 hover:bg-slate-100/80 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400"
    case "Medium":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400"
    case "Low":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

const getPriorityColorForIcon = (priority: string) => {
  switch (priority) {
    case "High":
      return "mr-2 h-4 w-4 stroke-red-800 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400"
    case "Medium":
      return "mr-2 h-4 w-4 stroke-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400"
    case "Low":
      return "mr-2 h-4 w-4 stroke-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
    default:
      return "mr-2 h-4 w-4 stroke-slate-800 hover:bg-slate-100/80 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate">
            <div className="flex flex-col">
              <div className="font-medium">{row.getValue('title')}</div>
              <div className="text-sm text-muted-foreground line-clamp-1">
                {row.getValue('description')}
              </div>
            </div>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('description')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          {status.icon && (
            <status.icon className={getStatusColorForIcon(status.label)} />
          )}
          {/* <span>{status.label}</span> */}
          <Badge variant="outline" className={getStatusColor(status.label)}>
                                {status.label}
                              </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className={getPriorityColorForIcon(priority.label)} />
          )}
          {/* <span>{priority.label}</span> */}
          <Badge variant="outline" className={getPriorityColor(priority.label)}>
                                {priority.label}
                              </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'assigned_to_username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue('assigned_to_username')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[200px] truncate font-medium">
            {
              /* {row.getValue("due_date")?.toString()} */
              formatDateWithMonthName(row.getValue('due_date'))
            }
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'project_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue('project_name')}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];