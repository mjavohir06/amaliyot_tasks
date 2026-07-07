import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

export type MenuItem =
  | {
      type: "divider";
    }
  | {
      type?: "item";
      key: string;
      label: string;
      icon?: LucideIcon;
      /** Shows a check mark instead of/alongside the icon (selected state). */
      checked?: boolean;
      /** Red/destructive styling, e.g. "Delete Tasks". */
      danger?: boolean;
      /** Disable clicking. */
      disabled?: boolean;
      onSelect?: () => void;
    };

interface DropdownMenuProps {
  /** The list of rows to render, top to bottom. */
  items: MenuItem[];
  /** Optional row of color swatches rendered at the bottom (e.g. label colors). */
  colorSwatches?: string[];
  onColorSelect?: (color: string) => void;
  className?: string;
}

/**
 * Reusable, parameter-driven menu body used inside a <Dropdown> panel.
 * Pass any list of `items` to render menus like "Add", the column
 * "..." menu, or a project switcher — no need to rewrite markup per menu.
 */
export default function DropdownMenu({
  items,
  colorSwatches,
  onColorSelect,
  className = "",
}: DropdownMenuProps) {
  return (
    <div
      className={`w-56 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg ${className}`}
    >
      {items.map((item, i) => {
        if (item.type === "divider") {
          return <div key={`div-${i}`} className="my-1 h-px bg-gray-100" />;
        }

        const Icon = item.icon;
        return (
          <button
            key={item.key}
            type="button"
            disabled={item.disabled}
            onClick={item.onSelect}
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              item.danger
                ? "text-red-500 hover:bg-red-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {Icon && (
              <Icon
                size={16}
                className={item.danger ? "text-red-400" : "text-gray-400"}
              />
            )}
            <span className="flex-1">{item.label}</span>
            {item.checked && (
              <Check size={15} className="text-emerald-500" />
            )}
          </button>
        );
      })}

      {colorSwatches && colorSwatches.length > 0 && (
        <div className="grid grid-cols-6 gap-2 px-2 py-2.5">
          {colorSwatches.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Select color ${color}`}
              onClick={() => onColorSelect?.(color)}
              className={`h-5 w-5 rounded-full ring-1 ring-inset ring-black/5 ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
