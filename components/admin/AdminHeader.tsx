"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Menu } from "lucide-react";
import AdminGlobalSearch from "./AdminGlobalSearch";
import NotificationDropdown from "./NotificationDropdown";
import type { AdminSessionUser } from "@/types/admin/auth";
import type { DashboardAlert } from "@/types/admin/dashboard";

interface AdminHeaderProps {
  title: string;
  user: AdminSessionUser;
  alerts: DashboardAlert[];
  onMenuClick: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ title, user, alerts, onMenuClick, onLogout }: AdminHeaderProps) {
  const [bellOpen, setBellOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const unreadCount = alerts.length;

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) setBellOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) setAvatarOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-admin-border bg-white px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-admin-text hover:bg-admin-bg lg:hidden"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <div className="min-w-0">
        <h1 className="truncate text-[16px] font-bold text-admin-text">{title}</h1>
        <p className="hidden truncate text-[11.5px] text-admin-muted sm:block">
          Dashboard / <span className="font-medium text-admin-accent">{title}</span>
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <AdminGlobalSearch role={user.role} className="hidden w-64 md:block" />

        <div ref={bellRef} className="relative">
          <button
            type="button"
            onClick={() => setBellOpen((v) => !v)}
            aria-label="Notifications"
            aria-expanded={bellOpen}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-admin-text hover:bg-admin-bg"
          >
            <Bell size={19} aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9.5px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {bellOpen && <NotificationDropdown alerts={alerts} />}
        </div>

        <div ref={avatarRef} className="relative">
          <button
            type="button"
            onClick={() => setAvatarOpen((v) => !v)}
            aria-label="Account menu"
            aria-expanded={avatarOpen}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-admin-bg"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-accent text-[12.5px] font-bold text-white">
              {user.name.charAt(0)}
            </span>
            <span className="hidden text-[13px] font-semibold text-admin-text sm:block">{user.name}</span>
            <ChevronDown size={15} className="hidden text-admin-muted sm:block" aria-hidden="true" />
          </button>

          {avatarOpen && (
            <div
              role="menu"
              className="absolute right-0 top-11 z-50 w-48 animate-fade-in overflow-hidden rounded-xl border border-admin-border bg-white shadow-2xl"
            >
              <div className="border-b border-admin-border px-3.5 py-3">
                <p className="truncate text-[13px] font-semibold text-admin-text">{user.name}</p>
                <p className="truncate text-[11.5px] text-admin-muted">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={onLogout}
                role="menuitem"
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium text-admin-text hover:bg-admin-bg"
              >
                <LogOut size={15} aria-hidden="true" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
