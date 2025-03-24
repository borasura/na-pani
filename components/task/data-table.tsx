"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isProjectNameVisible: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isProjectNameVisible,
}: DataTableProps<TData, TValue>) {

  console.log("data-table for task - ")
  console.log(data[0])

  // TODO - Set Description visibility to false. Remove it complete in future
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({'project_name': isProjectNameVisible, 'description': false})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

   // Update URL params when filters or sorting change
   useEffect(() => {
    console.log("Updating URL params", sorting, columnFilters);
    const params = new URLSearchParams();
    if (sorting.length > 0) {
      params.set("sort", JSON.stringify(sorting));
    } else {
      params.delete("sort");
    }
    if (columnFilters.length > 0) {
      params.set("filters", JSON.stringify(columnFilters));
    } else {
      params.delete("filters");
    }

    router.replace(`?${params.toString()}`, { scroll: false }); // Avoid scroll reset
  }, [sorting, columnFilters, router]);

  // Initialize filters and sorting from URL params on mount
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const filtersParam = searchParams.get("filters");

    console.log("Inside useeffect on mount");
    console.log("SortParam are " + sortParam)
    console.log("filtersParam are " + filtersParam)
    if (sortParam) {
      try {
        setSorting(JSON.parse(sortParam));
      } catch (e) {
        console.error("Invalid sort parameter:", e);
      }
    }
    if (filtersParam) {
      try {
        setColumnFilters(JSON.parse(filtersParam));
      } catch (e) {
        console.error("Invalid filters parameter:", e);
      }
    }
  }, [searchParams]);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} newTaskEnabled={!isProjectNameVisible} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                  {/* TODO - get this view from the new design */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}