"use client";

import {
  MoreHorizontal,
  ArrowRightLeft,
  ArrowUpDown,
  CheckCircle2,
  Archive,
  Trash2,
} from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";
import DropdownMenu, { type MenuItem } from "@/components/Main/DropdownMenu";

const LABEL_COLORS = [
  "bg-rose-400",
  "bg-teal-400",
  "bg-amber-400",
  "bg-emerald-500",
  "bg-sky-400",
  "bg-emerald-300",
  "bg-lime-300",
  "bg-violet-400",
  "bg-pink-400",
  "bg-gray-200",
];

interface ColumnMenuProps {
  /** Whether "Complete Tasks" should render as checked for this column. */
  completed?: boolean;
  onMove?: () => void;
  onSortTasks?: () => void;
  onCompleteTasks?: () => void;
  onArchiveTasks?: () => void;
  onDeleteTasks?: () => void;
  onColorSelect?: (color: string) => void;
}

export default function ColumnMenu({
  completed,
  onMove,
  onSortTasks,
  onCompleteTasks,
  onArchiveTasks,
  onDeleteTasks,
  onColorSelect,
}: ColumnMenuProps) {
  const items: MenuItem[] = [
    { key: "move", label: "Move", icon: ArrowRightLeft, onSelect: onMove },
    { key: "sort", label: "Sort Tasks", icon: ArrowUpDown, onSelect: onSortTasks },
    { type: "divider" },
    {
      key: "complete",
      label: "Complete Tasks",
      icon: CheckCircle2,
      checked: completed,
      onSelect: onCompleteTasks,
    },
    { key: "archive", label: "Archive Tasks", icon: Archive, onSelect: onArchiveTasks },
    { type: "divider" },
    {
      key: "delete",
      label: "Delete Tasks",
      icon: Trash2,
      danger: true,
      onSelect: onDeleteTasks,
    },
  ];

  return (
    <Dropdown
      align="right"
      trigger={({ toggle }) => (
        <button
          type="button"
          aria-label="Column menu"
          onClick={toggle}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreHorizontal size={16} />
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
          colorSwatches={LABEL_COLORS}
          onColorSelect={(color) => {
            onColorSelect?.(color);
            close();
          }}
        />
      )}
    </Dropdown>
  );
}
