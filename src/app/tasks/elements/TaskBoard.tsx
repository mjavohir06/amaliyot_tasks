"use client";

import { useState } from "react";
import { SlidersHorizontal, Plus } from "lucide-react";
import { columns as initialColumns, labels as initialLabels, type Label } from "../data";
import TaskCard from "./TaskCard";
import ProjectSwitcher from "./ProjectSwitcher";
import AddMenu from "./menu/AddMenu";
import ColumnMenu from "./menu/ColumnMenu";
import FilterPanel from "./Filter/FilterPanel";
import TaskDetailsModal from "./TaskDetailsModal";

export default function TaskBoard() {
  const [activeColumn, setActiveColumn] = useState("todo");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [allLabels, setAllLabels] = useState<Label[]>(initialLabels);

  const selectedCard = selectedCardId
    ? initialColumns.flatMap((c) => c.cards).find((c) => c.id === selectedCardId) ?? null
    : null;

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-x-auto px-6 py-6">
        <div className="mb-5 flex items-center justify-between">
          <ProjectSwitcher />

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Sort"
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-gray-400 hover:bg-gray-50 ${
                filterOpen ? "border-emerald-300 bg-emerald-50 text-emerald-500" : "border-gray-100"
              }`}
            >
              <SlidersHorizontal size={16} />
            </button>
            <AddMenu />
          </div>
        </div>

        <div className="flex gap-5">
          {initialColumns.map((column) => {
            const isActive = activeColumn === column.id;
            return (
              <div
                key={column.id}
                onClick={() => setActiveColumn(column.id)}
                className={`flex w-75 shrink-0 flex-col rounded-2xl border-2 bg-gray-50/60 p-3 transition-colors ${
                  isActive ? "border-sky-500" : "border-transparent"
                }`}
              >
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${column.color}`} />
                    <span className="text-xs font-semibold tracking-wide text-gray-500">
                      {column.title}
                    </span>
                    <span className="rounded-md bg-gray-200/70 px-1.5 py-0.5 text-[11px] font-medium text-gray-500">
                      {column.cards.length}
                    </span>
                  </div>
                  <ColumnMenu completed={column.id === "completed"} />
                </div>

                <div className="flex flex-col gap-3">
                  {column.cards.map((card) => (
                    <TaskCard
                      key={card.id}
                      card={card}
                      onClick={() => setSelectedCardId(card.id)}
                    />
                  ))}
                </div>

                <button className="mt-3 flex items-center justify-center rounded-xl border border-dashed border-gray-200 py-2 text-gray-400 hover:bg-gray-100">
                  <Plus size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {filterOpen && (
        <FilterPanel allLabels={allLabels} onClose={() => setFilterOpen(false)} />
      )}

      {selectedCard && (
        <TaskDetailsModal
          card={selectedCard}
          allLabels={allLabels}
          onLabelsChange={setAllLabels}
          onClose={() => setSelectedCardId(null)}
        />
      )}
    </div>
  );
}
