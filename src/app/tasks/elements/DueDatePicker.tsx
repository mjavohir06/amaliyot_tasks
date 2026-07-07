"use client";

import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";

interface DueDatePickerProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function DueDatePicker({ value, onChange }: DueDatePickerProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [time, setTime] = useState("09:00 AM");

  const cells = buildMonthGrid(viewYear, viewMonth);

  const shiftMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  };

  return (
    <Dropdown
      panelClassName="w-72"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[13px] text-gray-600 hover:bg-gray-100"
        >
          <CalendarDays size={14} className="text-gray-400" />
          {value ?? "Set due date"}
        </button>
      )}
    >
      {({ close }) => (
        <div className="w-72 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-50"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[13px] font-semibold text-gray-700">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-50"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-gray-400">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-[12.5px]">
            {cells.map((day, i) => (
              <button
                key={i}
                type="button"
                disabled={day === null}
                onClick={() => day && setSelectedDay(day)}
                className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
                  day === null
                    ? "invisible"
                    : day === selectedDay
                    ? "bg-emerald-500 font-semibold text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="mt-3">
            <label className="mb-1 block text-[11px] font-medium text-gray-400">
              Time
            </label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-[13px] text-gray-600 outline-none focus:ring-1 focus:ring-emerald-300"
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onChange(undefined);
                close();
              }}
              className="text-[12.5px] font-medium text-gray-400 hover:text-gray-600"
            >
              Clear due date
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedDay) {
                  const formatted = `${MONTHS[viewMonth].slice(0, 3)} ${selectedDay}, ${viewYear}, ${time}`;
                  onChange(formatted);
                }
                close();
              }}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-emerald-600"
            >
              Set due date
            </button>
          </div>
        </div>
      )}
    </Dropdown>
  );
}
