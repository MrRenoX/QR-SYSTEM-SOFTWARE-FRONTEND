export default function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2.5 px-6 py-14 text-admin-muted">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-admin-border border-t-admin-accent" />
      <span className="text-[13.5px] font-medium">{label}</span>
    </div>
  );
}
