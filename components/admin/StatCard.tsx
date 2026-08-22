import { TrendingUp } from "lucide-react";
import type { DashboardStat } from "@/types/admin/dashboard";

const TONE_CLASSES = {
  violet: "bg-violet-100 text-violet-600",
  emerald: "bg-emerald-100 text-emerald-600",
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  rose: "bg-rose-100 text-rose-600",
  gold: "bg-yellow-100 text-yellow-600",
} as const;

export default function StatCard({ stat }: { stat: DashboardStat }) {
  const Icon = stat.icon;
  return (
    <div className="rounded-2xl border border-admin-border bg-admin-card p-5 shadow-adminCard">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full ${TONE_CLASSES[stat.tone]}`}
      >
        <Icon size={20} strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="mt-3 text-[13px] font-medium text-admin-muted">{stat.label}</p>
      <p className="mt-0.5 text-[26px] font-bold leading-tight text-admin-text">{stat.value}</p>
      {stat.trend && (
        <p className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-emerald-600">
          <TrendingUp size={13} aria-hidden="true" />
          {stat.trend}
        </p>
      )}
    </div>
  );
}
