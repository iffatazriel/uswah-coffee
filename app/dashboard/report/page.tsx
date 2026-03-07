import ReportTable from "@/components/pos/report-table";
import { SkeletonReport } from "@/components/pos/skeleton-table";
import { Suspense } from "react";

export default function ReportPage() {
  return (
    <Suspense fallback={<SkeletonReport />}>
      <ReportTable />
    </Suspense>
  );
}