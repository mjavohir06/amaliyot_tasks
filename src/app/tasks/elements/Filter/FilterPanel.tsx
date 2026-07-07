"use client";

import { useState } from "react";
import { X, Search, ChevronDown, Check } from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";
import DropdownMenu from "@/components/Main/DropdownMenu";
import AssignToPicker, { PersonAvatar } from "../AssignToPicker";
import { people, type Label } from "../../data";

interface FilterPanelProps {
  allLabels: Label[];
  onClose: () => void;
  onApply?: (filters: {
    query: string;
    labelIds: string[];
    memberIds: string[];
    dueDate: string;
    status: string;
  }) => void;
}

const DUE_DATE_OPTIONS = ["Due anytime", "Overdue", "Due today", "Due this week"];
const STATUS_OPTIONS = ["Any status", "To do", "In progress", "Completed"];

export default function FilterPanel({ allLabels, onClose, onApply }: FilterPanelProps) {
  const [query, setQuery] = useState("");
  const [labelIds, setLabelIds] = useState<string[]>([]);
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState(DUE_DATE_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[3]);

  const toggleLabel = (id: string) => {
    setLabelIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const reset = () => {
    setQuery("");
    setLabelIds([]);
    setMemberIds([]);
    setDueDate(DUE_DATE_OPTIONS[0]);
    setStatus(STATUS_OPTIONS[0]);
  };

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l border-gray-100 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filter"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50"
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative mb-5">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Tasks..."
          className="w-full rounded-lg bg-gray-50 py-2 pl-9 pr-3 text-[13px] text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
        />
      </div>

      <div className="mb-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          Labels
        </p>
        <div className="flex flex-wrap gap-2">
          {allLabels.map((label) => {
            const active = labelIds.includes(label.id);
            return (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  active
                    ? `${label.color} text-white`
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {label.name}
                {active && <Check size={11} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          Members
        </p>
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-100 p-2">
          {memberIds.map((id) => {
            const person = people.find((p) => p.id === id);
            if (!person) return null;
            return (
              <span
                key={id}
                className="flex items-center gap-1.5 rounded-full bg-gray-100 py-1 pl-1 pr-2 text-[12px] text-gray-600"
              >
                <PersonAvatar person={person} size={18} />
                {person.name}
                <button
                  type="button"
                  aria-label="Remove member"
                  onClick={() => setMemberIds((prev) => prev.filter((x) => x !== id))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
          <Dropdown
            trigger={({ toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-label="Add member"
                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
              >
                <Search size={14} />
              </button>
            )}
          >
            {({ close }) => (
              <div className="w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                {people
                  .filter((p) => !memberIds.includes(p.id))
                  .map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setMemberIds((prev) => [...prev, p.id]);
                        close();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] text-gray-600 hover:bg-gray-50"
                    >
                      <PersonAvatar person={p} size={22} />
                      {p.name}
                    </button>
                  ))}
              </div>
            )}
          </Dropdown>
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          Due Date
        </p>
        <Dropdown
          panelClassName="w-full"
          trigger={({ toggle }) => (
            <button
              type="button"
              onClick={toggle}
              className="flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-100"
            >
              {dueDate}
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          )}
        >
          {({ close }) => (
            <DropdownMenu
              className="w-full"
              items={DUE_DATE_OPTIONS.map((opt) => ({
                key: opt,
                label: opt,
                checked: opt === dueDate,
                onSelect: () => {
                  setDueDate(opt);
                  close();
                },
              }))}
            />
          )}
        </Dropdown>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          Status
        </p>
        <Dropdown
          panelClassName="w-full"
          trigger={({ toggle }) => (
            <button
              type="button"
              onClick={toggle}
              className="flex w-full items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-100"
            >
              {status}
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          )}
        >
          {({ close }) => (
            <DropdownMenu
              className="w-full"
              items={STATUS_OPTIONS.map((opt) => ({
                key: opt,
                label: opt,
                checked: opt === status,
                onSelect: () => {
                  setStatus(opt);
                  close();
                },
              }))}
            />
          )}
        </Dropdown>
      </div>

      <div className="mt-auto flex items-center gap-4">
        <button
          type="button"
          onClick={() => onApply?.({ query, labelIds, memberIds, dueDate, status })}
          className="flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={reset}
          className="text-[13px] font-medium text-red-500 hover:text-red-600"
        >
          Reset all Filters
        </button>
      </div>
    </aside>
  );
}
