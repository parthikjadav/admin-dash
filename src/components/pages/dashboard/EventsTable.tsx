"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  ListFilter,
  MoreHorizontal,
  MoreVertical,
  MoveRight,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectCustomTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useEventFormStore from "@/store/eventForm";
import useStepsStore from "@/store/stepper";


const data: Payment[] = [
  {
    id: "m5gr84i9",
    eventId: "@345",
    amount: 316,
    status: "success",
    title: "Salsa Dance",
    danceStyle: "Latin",
    date: {
      time: "12:00 PM - 3:00 PM EST",
      schedule: "12:00 PM - 3:00 PM EST",
    },
  },
  {
    id: "3u1reuv4",
    eventId: "@345",
    amount: 242,
    status: "success",
    title: "Salsa Dance",
    danceStyle: "Latin",
    date: {
      time: "12:00 PM - 3:00 PM EST",
      schedule: "12:00 PM - 3:00 PM EST",
    },
  },
  {
    id: "derv1ws0",
    eventId: "@345",
    amount: 837,
    status: "processing",
    title: "Salsa Dance",
    danceStyle: "Latin",
    date: {
      time: "12:00 PM - 3:00 PM EST",
      schedule: "12:00 PM - 3:00 PM EST",
    },
  },
  {
    id: "5kma53ae",
    eventId: "@345",
    amount: 874,
    status: "success",
    title: "Salsa Dance",
    danceStyle: "Latin",
    date: {
      time: "12:00 PM - 3:00 PM EST",
      schedule: "12:00 PM - 3:00 PM EST",
    },
  },
  {
    id: "bhqecj4p",
    eventId: "@345",
    amount: 721,
    status: "failed",
    title: "Salsa Dance",
    danceStyle: "Latin",
    date: {
      time: "12:00 PM - 3:00 PM EST",
      schedule: "12:00 PM - 3:00 PM EST",
    },
  },
];

export type Payment = {
  id: string;
  amount: number;
  eventId: string;
  status: "pending" | "processing" | "success" | "failed";
  title: string;
  danceStyle: string;
  date: {
    time: string;
    schedule: string;
  };
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-6 h-6 rounded-[6px] ms-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="w-6 h-6 rounded-[6px] ms-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "eventId",
    header: "Event ID",
    cell: ({ row }) => (
      <div className="capitalize text-[12px] text-side-gray font-normal">
        @345
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize text-[12px] text-side-gray font-normal">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "danceStyle",
    header: "Dance Style",
    cell: ({ row }) => (
      <div className="capitalize text-[12px] text-side-gray font-normal">
        Latin
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize text-[12px] text-side-gray font-normal flex flex-col gap-y-2 py-1">
        <div className="watch-icon flex-center justify-start gap-2 text-xs">
          <Clock3 className="text-side-blue" strokeWidth={1.5} size={15} />
          <span>12:00 PM - 3:00 PM EST</span>
        </div>
        <div className="watch-icon flex-center justify-start gap-2 text-xs">
          <Calendar className="text-side-blue" strokeWidth={1.5} size={15} />
          <span>12:00 PM - 3:00 PM EST</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "ticket",
    header: "Ticket",
    cell: ({ row }) => (
      <div className="capitalize text-[12px] cursor-pointer text-side-blue flex flex-center justify-start gap-x-2 font-medium">
        <span>SEE PREVIEW</span>
        <MoveRight strokeWidth={1.5} width={14} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Select defaultValue="PUBLISHED">
        <SelectTrigger className="w-[110px] bg-(--color-light-success) text-(--color-green-success) rounded-[10px] text-xs">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PUBLISHED" className="uppercase">
            PUBLISHED
          </SelectItem>
          <SelectItem value="DRAFT" className="uppercase">
            DRAFT
          </SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <Button variant={"ghost"} className="py-1">
            <Link href={`/dashboard/events/${payment.id}`}>
              <span className="sr-only">Open menu</span>
              <Eye />
            </Link>
          </Button>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Event</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Delete Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function EventsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const setForm = useEventFormStore((state) => state.setForm)
  const setEventID = useEventFormStore((state) => state.setEventID)
  const setCurrentStep = useStepsStore((state) => state.setStepCount)
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const emptyForm = () => {
    setCurrentStep(1)
    setEventID("")
    setForm({
      title: '',
      description: '',
      danceStyle: [],
      danceLevel: [],
      socialTags: '',
      amenities: '',
      parkingFacilities: ''
    })
  }
    
  return (
    <div>
      {/* event heading */}
      <div>
        <div className="flex-center justify-between z-auto">
          <div>
            <h1 className="e-h1">Events</h1>
          </div>
          <div className="flex-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="filter shadow-sm flex-center w-9 h-9 rounded-full ">
                  <ListFilter strokeWidth={1} size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative hidden sm:block">
              <Image
                src={"/icons/search.svg"}
                width={20}
                height={20}
                alt="search-icon"
                className="absolute top-1/2 left-4 -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Filter Events..."
                value={
                  (table.getColumn("title")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="search-input w-[260px] border-[#DCDCDC] py-[10px] px-[16px] text-sm rounded-full ps-10 bg-(--color-light-gray)"
              />
            </div>
            <Link href={"/dashboard/event/create"}>
              <Button
                variant={"secondary"}
                className="text-[12px] font-light p-[10px]! sm:px-3 sm:py-2"
                onClick={emptyForm}
              >
              <span className="hidden sm:block">Add Event </span>
              <Plus strokeWidth={1.5} size={18} className="text-white" />
            </Button>
          </Link>
        </div>
      </div>
      {/* Mobile search bar */}
      <div className="relative mt-6 sm:hidden">
        <Image
          src={"/icons/search.svg"}
          width={20}
          height={20}
          alt="search-icon"
          className="absolute top-1/2 left-4 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Filter Events..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="search-input w-full border-[#DCDCDC] py-[10px] px-[16px] text-sm rounded-full ps-10 bg-(--color-light-gray)"
        />
      </div>
    </div>
      {/* events table */ }
  <div className="w-full mt-6 hidden lg:block">
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="h-18 hidden md:table-row"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className=" text-[12px] px-0 text-side-blue font-normal"
                  >
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
                  <TableCell key={cell.id} className="px-0">
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
  </div>

  {/* --- mobile: cards of table --- */ }
  <div className="block lg:hidden mt-6 pb-25 md:pb-0 space-y-4">
    {table.getRowModel().rows.map((row) => (
      <div key={row.id} className="bg-white rounded-2xl shadow p-4">
        {/* card header */}
        <div className="flex justify-between items-start">
          <div className="flex-center">
            <div className="h-5 flex-center justify-start ">
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="w-6 h-6 rounded-[6px] ms-2"
              />
            </div>
            <div className="ps-2">
              <h3 className="font-semibold  text-sm text-side-blue">
                {row.getValue("title")}
              </h3>
              <p className="text-xs text-side-gray ">
                {row.getValue("eventId")}
              </p>
            </div>
          </div>
          <div className="threeDots">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full bg-(--color-light-gray)"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Delete Event
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="my-4" />
        {/* details */}
        <div className="flex text-xs">
          <div className="flex flex-col w-1/2">
            <span className="text-side-blue">Dance Style</span>
            <span className="text-side-gray">
              {row.getValue("danceStyle")}
            </span>
          </div>
          <div className="flex flex-col gap-y-2 items-start text-xs w-1/2">
            <span className="text-side-blue">Date</span>
            <div className="flex items-center space-x-1">
              <Clock3 className="text-side-gray" size={14} />
              <span className="text-side-gray">12:00 PM – 3:00 PM EST</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="text-side-gray" size={14} />
              <span className="text-side-gray">March 18, 2025</span>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        {/* footer actions */}
        <div className="flex text-xs">
          <div className="w-1/2">
            <div className="pb-2">
              <span className="text-side-blue text-xs">Status</span>
            </div>
            <Select defaultValue="PUBLISHED">
              <SelectTrigger className="w-[110px] bg-(--color-light-success) text-(--color-green-success) rounded-[10px] text-xs">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLISHED" className="uppercase">
                  PUBLISHED
                </SelectItem>
                <SelectItem value="DRAFT" className="uppercase">
                  DRAFT
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <div className="pb-3">
              <span className="text-side-blue text-xs">Ticket</span>
            </div>
            <Link
              href={`/dashboard/events/`}
              className="text-side-blue font-medium flex items-center"
            >
              SEE PREVIEW <MoveRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* pagination */ }
  <div className="flex items-center text-side-blue text-xs my-5 justify-center md:justify-between">
    <div className="gap-4 items-center hidden md:flex">
      <span>Lines per page</span>
      <Select defaultValue="20">
        <SelectCustomTrigger className="w-[70px] text-[12px] bg-(--color-light-gray2) rounded-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectCustomTrigger>
        <SelectContent>
          <SelectGroup className="text-xm">
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div className="fixed left-0 bottom-27 w-full h-20 bg-[linear-gradient(to_top,white,transparent)] z-10 md:hidden"></div>
    <div className="fixed bottom-0 left-0 bg-white w-full py-5 md:static md:w-auto">
      <div className="flex gap-4 items-center justify-center flex-col-reverse md:flex-row">
        <p className="">1 of 20</p>
        <span className="separator w-[1.5px] h-5 bg-gray-200 hidden md:block"></span>
        <div className="pagination's">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" className="border-0">
                  <ChevronFirst className="text-gray-200 hover:text-black" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="border-0">
                  <ChevronLeft className="text-gray-200 hover:text-black" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="bg-black text-white hover:bg-black hover:text-white"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="border-0">
                  <ChevronRight className="text-black hover:text-black" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="border-0">
                  <ChevronLast className="text-gray-200 hover:text-black" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  </div>
    </div >
  );
}
