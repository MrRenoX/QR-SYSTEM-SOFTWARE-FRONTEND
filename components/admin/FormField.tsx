import { adminErrorTextClass, adminLabelClass } from "@/lib/admin/formStyles";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  error,
  required,
  hint,
  className = "",
  children,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={adminLabelClass}>
        {label}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-[11.5px] text-admin-muted">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} className={adminErrorTextClass}>
          {error}
        </p>
      )}
    </div>
  );
}
