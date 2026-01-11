"use client";

import moment from "moment";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCandidate } from "@/types";
import Link from "next/link";
import { useTopbar } from "@/context/topbarContext";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import NoCandidate from "./_components/no-candidate";
import { apiUrl } from "@/lib/environment";

export const columns: ColumnDef<TCandidate>[] = [
  {
    accessorKey: "fullName",
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all name"
        />
        <h3>Nama Lengkap</h3>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <p className="capitalize">{row.getValue("fullName")}</p>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => {
      return <div>{moment(row.getValue("dob")).format("DD MMMM YYYY")}</div>;
    },
  },
  {
    accessorKey: "domicile",
    header: "Domicile",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("domicile")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "linkedin",
    header: "Link Linkedin",
    cell: ({ row }) => (
      <div className="lowercase text-blue-400">
        <Link href={row.getValue("linkedin")}>{row.getValue("linkedin")}</Link>
      </div>
    ),
  },
];

const ManageJob = () => {
  const urlParams = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data: candidates, fetchData } = useFetch<TCandidate[]>();

  const { setType, setBreadcrumbItem } = useTopbar();

  const table = useReactTable({
    data: (candidates as TCandidate[]) || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    fetchData(`${apiUrl}/candidates?jobId=${urlParams.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }, []);

  useEffect(() => {
    setType("breadcrumb");
    setBreadcrumbItem([
      { text: "Job list", link: "/admin" },
      {
        text: "Manage Candidate",
        link: `/admin/manage-job/${urlParams.id}`,
      },
    ]);
  }, [urlParams, setBreadcrumbItem, setType]);

  return (
    <div className="w-full">
      <h3 className="font-bold text-lg capitalize">{title}</h3>

      {candidates?.length === 0 ? (
        <NoCandidate />
      ) : (
        <>
          <div className="overflow-hidden rounded-md border mt-6">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
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
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageJob;
