"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const SIZE_CLASSES = {
  md: "max-w-md",
  lg: "max-w-2xl",
} as const;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: keyof typeof SIZE_CLASSES;
}

export default function Modal({ open, onClose, title, children, footer, size = "md" }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-admin-sidebar/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className={`relative max-h-[85vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${SIZE_CLASSES[size]}`}
      >
        <div className="flex items-center justify-between border-b border-admin-border px-5 py-4">
          <h2 id="admin-modal-title" className="text-[16px] font-bold text-admin-text">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-admin-muted transition-colors hover:bg-admin-bg"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2.5 border-t border-admin-border px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}
