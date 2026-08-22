export interface DataTableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Lower this for compact tables (e.g. a 4-column dashboard summary card) so they don't force scroll unnecessarily. */
  minWidth?: number;
}

/** Generic, horizontally-scrollable admin table. Empty/loading/error states are handled by the caller. */
export default function DataTable<T>({ columns, rows, rowKey, minWidth = 720 }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-admin-border">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-admin-muted ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-admin-border">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="transition-colors hover:bg-admin-bg/60">
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3.5 align-middle text-admin-text ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
