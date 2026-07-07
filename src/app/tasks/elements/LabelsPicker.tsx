"use client";

import { useState } from "react";
import { Search, Check, ChevronDown, Tag } from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";
import type { Label } from "../data";

interface LabelsPickerProps {
  allLabels: Label[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  onManageLabels: () => void;
}

export function LabelPill({ label }: { label: Label }) {
  return (
    <span
      className={`rounded-md px-2.5 py-1 text-[11px] font-medium text-white ${label.color}`}
    >
      {label.name}
    </span>
  );
}

export default function LabelsPicker({
  allLabels,
  selectedIds,
  onChange,
  onManageLabels,
}: LabelsPickerProps) {
  const [query, setQuery] = useState("");
  const selected = allLabels.filter((l) => selectedIds.includes(l.id));
  const filtered = allLabels.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selected.map((l) => (
        <LabelPill key={l.id} label={l} />
      ))}

      <Dropdown
        panelClassName="w-60"
        trigger={({ toggle: openMenu }) => (
          <button
            type="button"
            onClick={openMenu}
            className="flex items-center gap-1 rounded-md border border-dashed border-gray-300 px-2 py-1 text-[11px] text-gray-400 hover:bg-gray-50"
          >
            <Tag size={12} />
            Labels
            <ChevronDown size={12} />
          </button>
        )}
      >
        {({ close }) => (
          <div className="w-60 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
            <p className="mb-2 text-[13px] font-semibold text-gray-700">
              Labels
            </p>
            <div className="relative mb-2">
              <Search
                size={14}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search label..."
                className="w-full rounded-lg bg-gray-50 py-1.5 pl-8 pr-3 text-[13px] text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
              />
            </div>
            <div className="mb-2 flex max-h-48 flex-col overflow-y-auto">
              {filtered.map((l) => {
                const isChecked = selectedIds.includes(l.id);
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => toggle(l.id)}
                    className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left hover:bg-gray-50"
                  >
                    <span className={`h-3 w-3 rounded-full ${l.color}`} />
                    <span className="flex-1 text-[13px] text-gray-600">
                      {l.name}
                    </span>
                    {isChecked && <Check size={15} className="text-emerald-500" />}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-1.5 py-2 text-[13px] text-gray-400">
                  No labels found.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                close();
                onManageLabels();
              }}
              className="w-full rounded-lg bg-emerald-500 py-2 text-[13px] font-medium text-white hover:bg-emerald-600"
            >
              Add New Label
            </button>
          </div>
        )}
      </Dropdown>
    </div>
  );
}
