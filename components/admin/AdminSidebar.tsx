"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ClipboardList,
  Compass,
  FolderTree,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Mail,
  MessageCircleQuestion,
  Settings,
  Users,
} from "lucide-react";
import type { AdminSessionUser } from "@/types/admin/auth";
import { canAccessModule, type AdminModule } from "@/lib/admin/permissions";

const BASE = "/dashboard/super-admin";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutGrid;
  module: AdminModule;
}

interface NavGroup {
  label: string | null;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  { label: null, items: [{ label: "Overview", href: BASE, icon: LayoutGrid, module: "dashboard" }] },
  {
    label: "Experiences",
    items: [
      { label: "Experiences", href: `${BASE}/experiences`, icon: Compass, module: "content" },
      { label: "Categories", href: `${BASE}/categories`, icon: FolderTree, module: "content" },
      { label: "FAQs", href: `${BASE}/faqs`, icon: HelpCircle, module: "content" },
    ],
  },
  {
    label: "Bookings & Leads",
    items: [
      { label: "Bookings", href: `${BASE}/bookings`, icon: Calendar, module: "bookings" },
      { label: "Queries", href: `${BASE}/queries`, icon: MessageCircleQuestion, module: "communications" },
      { label: "Contacts", href: `${BASE}/contacts`, icon: Mail, module: "communications" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Website Settings", href: `${BASE}/settings`, icon: Settings, module: "system" },
      { label: "Admin Users", href: `${BASE}/admin-users`, icon: Users, module: "system" },
      { label: "Audit Logs", href: `${BASE}/audit-logs`, icon: ClipboardList, module: "system" },
    ],
  },
];

interface AdminSidebarProps {
  user: AdminSessionUser;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function AdminSidebar({ user, open, onClose, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const visibleNav = NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => canAccessModule(user.role, item.module)),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col bg-admin-sidebar transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 pb-5 pt-6">
          <div className="inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-sm">
            <Image
              src="/images/branding/logo.png"
              alt="Guide Guru Global"
              width={51}
              height={40}
              priority
              className="h-7 w-auto"
            />
          </div>
        </div>

        <nav aria-label="Admin navigation" className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
          {visibleNav.map((group, index) => (
            <div key={group.label ?? `group-${index}`}>
              {group.label && (
                <p className="px-2.5 pb-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white/35">
                  {group.label}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                          isActive
                            ? "bg-admin-accent text-white shadow-[0_6px_16px_-6px_rgba(109,91,208,0.7)]"
                            : "text-white/65 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-admin-accent text-[13px] font-bold text-white">
              {user.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">{user.name}</p>
              <p className="truncate text-[11px] text-white/45">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
