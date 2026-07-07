"use client";

import { useState } from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6">
      <button
        type="button"
        aria-label="Toggle menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <Bell size={19} />
        </button>

        <div className="h-8 w-px bg-gray-100" />

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1 pr-2 transition-colors hover:bg-gray-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-orange-400 text-xs font-semibold text-white">
              AT
            </span>
            <span className="text-sm font-medium text-gray-700">
              ArtTemplate
            </span>
            <ChevronDown size={15} className="text-gray-400" />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
              <button className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">
                My profile
              </button>
              <button className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">
                Settings
              </button>
              <button className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-gray-50">
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
