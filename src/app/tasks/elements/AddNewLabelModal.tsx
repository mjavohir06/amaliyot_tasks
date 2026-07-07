"use client";

import { useState } from "react";
import { X, Copy, Trash2, Plus } from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";
import { labelColorOptions, type Label } from "../data";

interface AddNewLabelModalProps {
  labels: Label[];
  onChange: (labels: Label[]) => void;
  onClose: () => void;
}

let uid = 100;
const nextId = () => `label-${uid++}`;

export default function AddNewLabelModal({
  labels,
  onChange,
  onClose,
}: AddNewLabelModalProps) {
  const [rows, setRows] = useState<Label[]>(labels);

  const updateRow = (id: string, patch: Partial<Label>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const duplicateRow = (row: Label) => {
    setRows((prev) => [
      ...prev,
      { ...row, id: nextId(), name: `${row.name} copy` },
    ]);
  };

  const deleteRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: nextId(), name: "", color: labelColorOptions[0] },
    ]);
  };

  const handleDone = () => {
    onChange(rows.filter((r) => r.name.trim().length > 0));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Add New Label</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-3 flex max-h-80 flex-col gap-2 overflow-y-auto">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <Dropdown
                trigger={({ toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label="Change color"
                    className={`h-6 w-6 shrink-0 rounded-full ring-1 ring-inset ring-black/5 ${row.color}`}
                  />
                )}
              >
                {({ close }) => (
                  <div className="w-44 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
                    <p className="mb-2 text-[12px] font-semibold text-gray-500">
                      Change Color
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {labelColorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          aria-label={`Color ${color}`}
                          onClick={() => {
                            updateRow(row.id, { color });
                            close();
                          }}
                          className={`h-6 w-6 rounded-full ring-1 ring-inset ring-black/5 ${color} ${
                            row.color === color ? "ring-2 ring-gray-400" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Dropdown>

              <input
                value={row.name}
                onChange={(e) => updateRow(row.id, { name: e.target.value })}
                placeholder="Type an name label..."
                className="flex-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[13px] text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
              />

              <button
                type="button"
                aria-label="Duplicate label"
                onClick={() => duplicateRow(row)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50"
              >
                <Copy size={15} />
              </button>
              <button
                type="button"
                aria-label="Delete label"
                onClick={() => deleteRow(row.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRow}
          className="mb-4 flex items-center gap-1.5 text-[13px] font-medium text-emerald-600 hover:text-emerald-700"
        >
          <Plus size={15} />
          Add Label
        </button>

        <button
          type="button"
          onClick={handleDone}
          className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
        >
          Done
        </button>
      </div>
    </div>
  );
}
