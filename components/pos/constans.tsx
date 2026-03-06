// app/dashboard/table/_components/constants.ts

export type TableStatus = "Available" | "Used";

export type TableData = {
  id: number;
  name: string;
  guest: string;
  status: TableStatus;
  floor: string;
};

export const FLOORS = ["1st floor", "2nd floor", "3rd floor"];

export const TABLES: TableData[] = [
  { id: 1,  name: "Table - 01", guest: "Guest", status: "Available", floor: "1st floor" },
  { id: 2,  name: "Table - 02", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 3,  name: "Table - 03", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 4,  name: "Table - 04", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 5,  name: "Table - 05", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 6,  name: "Table - 06", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 7,  name: "Table - 07", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 8,  name: "Table - 08", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 9,  name: "Table - 09", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 10, name: "Table - 10", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 11, name: "Table - 11", guest: "Guest", status: "Available", floor: "1st floor" },
  { id: 12, name: "Table - 12", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 13, name: "Table - 13", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 14, name: "Table - 14", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 15, name: "Table - 15", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 16, name: "Table - 16", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 17, name: "Table - 17", guest: "Guest", status: "Available", floor: "1st floor" },
  { id: 18, name: "Table - 18", guest: "Guest", status: "Available", floor: "1st floor" },
  { id: 19, name: "Table - 19", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 20, name: "Table - 20", guest: "Guest", status: "Used",      floor: "1st floor" },
  { id: 21, name: "Table - 21", guest: "Guest", status: "Available", floor: "2nd floor" },
  { id: 22, name: "Table - 22", guest: "Guest", status: "Used",      floor: "2nd floor" },
  { id: 23, name: "Table - 23", guest: "Guest", status: "Used",      floor: "2nd floor" },
  { id: 24, name: "Table - 24", guest: "Guest", status: "Available", floor: "2nd floor" },
];

export const ITEMS_PER_PAGE = 20;