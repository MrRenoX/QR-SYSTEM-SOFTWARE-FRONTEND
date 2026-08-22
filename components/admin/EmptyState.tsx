import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-admin-bg text-admin-faint">
        <Icon size={22} aria-hidden="true" />
      </span>
      <p className="mt-3 text-[14.5px] font-semibold text-admin-text">{title}</p>
      {description && <p className="mt-1 max-w-xs text-[13px] text-admin-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
