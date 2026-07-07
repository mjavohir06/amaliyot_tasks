"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Align = "left" | "right";

interface DropdownProps {
  /** The clickable element that opens/closes the dropdown. */
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  /** The panel content, rendered only while open. */
  children: (props: { close: () => void }) => ReactNode;
  /** Which side the panel aligns to, relative to the trigger. Default: "left". */
  align?: Align;
  /** Extra classes for the panel wrapper (width, margin-top, etc). */
  panelClassName?: string;
}

/**
 * Generic dropdown primitive: renders a trigger and a floating panel,
 * closes itself on outside click or Escape. Reusable anywhere a
 * button needs to reveal a small popover/menu.
 */
export default function Dropdown({
  trigger,
  children,
  align = "left",
  panelClassName = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      {trigger({ open, toggle })}

      {open && (
        <div
          className={`absolute top-full z-30 mt-2 ${
            align === "right" ? "right-0" : "left-0"
          } ${panelClassName}`}
        >
          {children({ close })}
        </div>
      )}
    </div>
  );
}
