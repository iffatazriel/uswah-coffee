import { SkeletonTablePage } from "@/components/pos/skeleton-table-page";
import TableGrid from "@/components/pos/table-grid";
import { Suspense } from "react";

export default function TablePage() {
  return (
  <Suspense fallback={<SkeletonTablePage />}>
    <TableGrid />;
  </Suspense>
)}