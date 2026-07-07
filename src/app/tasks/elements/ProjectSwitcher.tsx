"use client";

import { useState } from "react";
import { ChevronDown, Search, LayoutGrid, Check } from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";

const PROJECTS = [
  { id: "design-plans", name: "Design Plans" },
  { id: "wireframe-ui-kit", name: "Wireframe UI Kit" },
  { id: "admin-dashboard", name: "Admin Dashboard" },
  { id: "sochi-hotel", name: "Sochi - Hotel Booking" },
];

interface ProjectSwitcherProps {
  active?: string;
  onSelect?: (id: string) => void;
}

export default function ProjectSwitcher({
  active = "design-plans",
  onSelect,
}: ProjectSwitcherProps) {
  const [query, setQuery] = useState("");
  const activeProject =
    PROJECTS.find((p) => p.id === active)?.name ?? "Design Plan";
  const filtered = PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dropdown
      panelClassName="w-64"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-1.5 text-lg font-semibold text-gray-800"
        >
          {activeProject}
          <ChevronDown size={18} className="text-gray-400" />
        </button>
      )}
    >
      {({ close }) => (
        <div className="w-64 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
          <p className="mb-2 px-1 text-[13px] font-semibold text-gray-700">
            Projects
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
              placeholder="Search Project..."
              className="w-full rounded-lg bg-gray-50 py-1.5 pl-8 pr-3 text-[13px] text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
            />
          </div>

          <div className="flex flex-col">
            {filtered.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  onSelect?.(project.id);
                  close();
                }}
                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13.5px] text-gray-600 hover:bg-gray-50"
              >
                <LayoutGrid size={16} className="text-gray-400" />
                <span className="flex-1">{project.name}</span>
                {project.id === active && (
                  <Check size={15} className="text-emerald-500" />
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-2 py-2 text-[13px] text-gray-400">
                No projects found.
              </p>
            )}
          </div>
        </div>
      )}
    </Dropdown>
  );
}
