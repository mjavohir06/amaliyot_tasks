"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  Calendar,
  Mail,
  MessageCircle,
  ClipboardList,
  FolderKanban,
  StickyNote,
  Users,
  ChevronRight,
  Search,
} from "lucide-react";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "E-Commerce", icon: ShoppingCart, expandable: true },
  { label: "Calendar", icon: Calendar },
  { label: "Mail", icon: Mail, badge: 9 },
  { label: "Chat", icon: MessageCircle },
  { label: "Task", icon: ClipboardList, active: true },
  { label: "Projects", icon: FolderKanban },
  { label: "File Manager", icon: Users },
  { label: "Notes", icon: StickyNote },
  { label: "Contacts", icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-100 bg-white px-4 py-5">
      <div className="mb-6 flex items-center gap-2 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 text-sm">
          🌸
        </span>
        <span className="text-lg font-semibold tracking-tight text-gray-800">
          FLOWER
        </span>
      </div>

      <div className="relative mb-6">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search anything"
          className="w-full rounded-lg bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-500 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
        />
      </div>

      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        Main Menu
      </p>

      <nav className="flex flex-col gap-0.5">
        {mainMenu.map(({ label, icon: Icon, badge, active, expandable }) => (
          <button
            key={label}
            type="button"
            className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-emerald-100 font-medium text-emerald-700"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon
                size={18}
                className={active ? "text-emerald-600" : "text-gray-400"}
              />
              {label}
            </span>
            <span className="flex items-center gap-1">
              {badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
                  {badge}
                </span>
              )}
              {expandable && (
                <ChevronRight size={14} className="text-gray-300" />
              )}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
