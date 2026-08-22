interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-[22px] font-bold text-admin-text">{title}</h1>
        {description && <p className="mt-1 text-[13.5px] text-admin-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
