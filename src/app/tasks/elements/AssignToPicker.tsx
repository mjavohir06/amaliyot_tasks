"use client";

import { useState } from "react";
import { Search, Check, Plus } from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";
import { people, type Person } from "../data";

interface AssignToPickerProps {
  assignedIds: string[];
  onChange: (ids: string[]) => void;
}

function PersonAvatar({ person, size = 28 }: { person: Person; size?: number }) {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-linear-to-br font-semibold text-white ${person.gradient}`}
    >
      {person.initials}
    </span>
  );
}

export default function AssignToPicker({ assignedIds, onChange }: AssignToPickerProps) {
  const [query, setQuery] = useState("");
  const assigned = people.filter((p) => assignedIds.includes(p.id));
  const filtered = people.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id: string) => {
    onChange(
      assignedIds.includes(id)
        ? assignedIds.filter((x) => x !== id)
        : [...assignedIds, id]
    );
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-2">
        {assigned.map((p) => (
          <PersonAvatar key={p.id} person={p} />
        ))}
      </div>

      <Dropdown
        panelClassName="w-56"
        trigger={({ toggle: openMenu }) => (
          <button
            type="button"
            onClick={openMenu}
            aria-label="Assign people"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-gray-300 text-gray-400 hover:bg-gray-50"
          >
            <Plus size={14} />
          </button>
        )}
      >
        {() => (
          <div className="w-56 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
            <p className="mb-2 text-[13px] font-semibold text-gray-700">
              Assign To
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
                placeholder="Find name..."
                className="w-full rounded-lg bg-gray-50 py-1.5 pl-8 pr-3 text-[13px] text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
              />
            </div>
            <div className="flex max-h-48 flex-col overflow-y-auto">
              {filtered.map((p) => {
                const isChecked = assignedIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggle(p.id)}
                    className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left text-[13px] text-gray-600 hover:bg-gray-50"
                  >
                    <PersonAvatar person={p} size={24} />
                    <span className="flex-1">{p.name}</span>
                    {isChecked && <Check size={15} className="text-emerald-500" />}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-1.5 py-2 text-[13px] text-gray-400">
                  No one found.
                </p>
              )}
            </div>
          </div>
        )}
      </Dropdown>
    </div>
  );
}

export { PersonAvatar };
