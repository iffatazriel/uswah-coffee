import HistoryTable from "@/components/pos/history-table";
import { SkeletonHistory } from "@/components/pos/skeleton-table";
import { Suspense } from "react";

export default function HistoryPage() {
  return (
    <Suspense fallback={<SkeletonHistory />}>
      <HistoryTable />
    </Suspense>
  );
}