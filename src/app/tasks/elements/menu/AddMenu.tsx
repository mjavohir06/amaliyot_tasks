"use client";

import { ChevronDown, ClipboardList, LayoutGrid, FolderKanban, UserPlus } from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";
import DropdownMenu, { type MenuItem } from "@/components/Main/DropdownMenu";

export default function AddMenu() {
  const items: MenuItem[] = [
    { key: "task", label: "Task", icon: ClipboardList, onSelect: () => {} },
    { key: "board", label: "Board", icon: LayoutGrid, onSelect: () => {} },
    { key: "project", label: "Project", icon: FolderKanban, onSelect: () => {} },
    { key: "invite", label: "Invite", icon: UserPlus, onSelect: () => {} },
  ];

  return (
    <Dropdown
      align="right"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
        >
          Add
          <ChevronDown size={15} />
        </button>
      )}
    >
      {({ close }) => (
        <DropdownMenu
          items={items.map((item) =>
            item.type === "divider"
              ? item
              : { ...item, onSelect: () => { item.onSelect?.(); close(); } }
          )}
        />
      )}
    </Dropdown>
  );
}
