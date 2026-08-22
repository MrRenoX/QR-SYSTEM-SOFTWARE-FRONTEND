"use client";

import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  destructive?: boolean;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  destructive = false,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-admin-border bg-white px-4 py-2 text-[13.5px] font-semibold text-admin-text transition-colors hover:bg-admin-bg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-xl px-4 py-2 text-[13.5px] font-semibold text-white transition-colors disabled:opacity-60 ${
              destructive ? "bg-rose-600 hover:bg-rose-700" : "bg-admin-accent hover:bg-admin-accent/90"
            }`}
          >
            {loading ? "Please wait…" : confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-[13.5px] leading-[1.55] text-admin-muted">{description}</p>
    </Modal>
  );
}
