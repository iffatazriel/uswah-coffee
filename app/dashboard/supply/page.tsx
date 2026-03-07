import { SkeletonSupply } from "@/components/pos/skeleton-table";
import SupplyContent from "@/components/pos/supply-content";
import { Suspense } from "react";

export default function SupplyPage() {
  return (
  <Suspense fallback={<SkeletonSupply />}>
    <SupplyContent />;
  </Suspense>
);}