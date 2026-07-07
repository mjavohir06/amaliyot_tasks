"use client";

import { useState } from "react";
import {
  X,
  MoreHorizontal,
  Link2,
  Check,
  Circle,
  Plus,
  Paperclip,
  Send,
  Smile,
  ChevronDown,
  Trash2,
} from "lucide-react";
import Dropdown from "@/components/Main/Dropdown";
import DropdownMenu, { type MenuItem } from "@/components/Main/DropdownMenu";
import AssignToPicker, { PersonAvatar } from "./AssignToPicker";
import LabelsPicker, { LabelPill } from "./LabelsPicker";
import DueDatePicker from "./DueDatePicker";
import AddNewLabelModal from "./AddNewLabelModal";
import { people, type Card, type Label, type ChecklistItem } from "../data";

interface TaskDetailsModalProps {
  card: Card;
  allLabels: Label[];
  onLabelsChange: (labels: Label[]) => void;
  onClose: () => void;
}

const STATUS_OPTIONS: { id: NonNullable<Card["status"]>; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "bg-gray-400" },
  { id: "in-progress", label: "In Progress", color: "bg-sky-500" },
  { id: "completed", label: "Complete", color: "bg-emerald-500" },
];

function findPerson(id: string) {
  return people.find((p) => p.id === id);
}

export default function TaskDetailsModal({
  card,
  allLabels,
  onLabelsChange,
  onClose,
}: TaskDetailsModalProps) {
  const [status, setStatus] = useState(card.status ?? "todo");
  const [assignedTo, setAssignedTo] = useState<string[]>(card.assignedTo ?? []);
  const [labelIds, setLabelIds] = useState<string[]>(card.labelIds ?? []);
  const [dueDate, setDueDate] = useState<string | undefined>(card.dueDate);
  const [description, setDescription] = useState(card.longDescription ?? "");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(card.checklist ?? []);
  const [newChecklistText, setNewChecklistText] = useState("");
  const [tab, setTab] = useState<"comments" | "activity">("comments");
  const [commentDraft, setCommentDraft] = useState("");
  const [comments, setComments] = useState(card.commentList ?? []);
  const [manageLabelsOpen, setManageLabelsOpen] = useState(false);

  const createdBy = card.createdBy ? findPerson(card.createdBy) : undefined;
  const currentStatus = STATUS_OPTIONS.find((s) => s.id === status)!;
  const doneCount = checklist.filter((c) => c.done).length;
  const progress = checklist.length
    ? Math.round((doneCount / checklist.length) * 100)
    : 0;

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    );
  };

  const addChecklistItem = () => {
    const text = newChecklistText.trim();
    if (!text) return;
    setChecklist((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, text, done: false },
    ]);
    setNewChecklistText("");
  };

  const removeChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((c) => c.id !== id));
  };

  const submitComment = () => {
    const text = commentDraft.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      { id: `cm-${Date.now()}`, personId: "shane", time: "Just now", text },
    ]);
    setCommentDraft("");
  };

  const menuItems: MenuItem[] = [
    { key: "duplicate", label: "Duplicate Task", onSelect: () => {} },
    { key: "copy-link", label: "Copy Link", icon: Link2, onSelect: () => {} },
    { type: "divider" },
    { key: "delete", label: "Delete Task", danger: true, icon: Trash2, onSelect: onClose },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/30 p-4 py-10"
        onClick={onClose}
      >
        <div
          className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
            <Dropdown
              trigger={({ toggle }) => (
                <button
                  type="button"
                  onClick={toggle}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-white ${currentStatus.color}`}
                >
                  {currentStatus.label}
                  <ChevronDown size={14} />
                </button>
              )}
            >
              {({ close }) => (
                <DropdownMenu
                  items={STATUS_OPTIONS.map((s) => ({
                    key: s.id,
                    label: s.label,
                    checked: s.id === status,
                    onSelect: () => {
                      setStatus(s.id);
                      close();
                    },
                  }))}
                  className="w-40"
                />
              )}
            </Dropdown>

            <div className="flex items-center gap-1">
              <Dropdown
                align="right"
                trigger={({ toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label="More options"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                )}
              >
                {({ close }) => (
                  <DropdownMenu
                    items={menuItems.map((item) =>
                      item.type === "divider"
                        ? item
                        : { ...item, onSelect: () => { item.onSelect?.(); close(); } }
                    )}
                  />
                )}
              </Dropdown>
              <button
                type="button"
                aria-label="Copy link"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50"
              >
                <Link2 size={16} />
              </button>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="max-h-[75vh] overflow-y-auto px-5 py-4">
            <input
              defaultValue={card.title}
              className="mb-4 w-full text-xl font-semibold text-gray-800 outline-none"
            />

            {/* Assigned to / Created by */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Assigned To
                </p>
                <AssignToPicker assignedIds={assignedTo} onChange={setAssignedTo} />
              </div>
              {createdBy && (
                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Created By
                  </p>
                  <div className="flex items-center gap-2">
                    <PersonAvatar person={createdBy} size={26} />
                    <span className="text-[13px] text-gray-600">
                      {createdBy.name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Labels */}
            <div className="mb-4">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Labels
              </p>
              <LabelsPicker
                allLabels={allLabels}
                selectedIds={labelIds}
                onChange={setLabelIds}
                onManageLabels={() => setManageLabelsOpen(true)}
              />
            </div>

            {/* Due date */}
            <div className="mb-5">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Due Date
              </p>
              <DueDatePicker value={dueDate} onChange={setDueDate} />
            </div>

            {/* Description */}
            <div className="mb-5">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Description
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Add a more detailed description..."
                className="w-full resize-none rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[13.5px] text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
              />
            </div>

            {/* Checklist */}
            <div className="mb-5">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Checklist ({progress}%)
                </p>
              </div>
              <div className="mb-2 h-1.5 w-full rounded-full bg-gray-100">
                <div
                  className="h-1.5 rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex flex-col">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-2.5 rounded-lg px-1 py-1.5 hover:bg-gray-50"
                  >
                    <button
                      type="button"
                      onClick={() => toggleChecklistItem(item.id)}
                      aria-label="Toggle done"
                    >
                      {item.done ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-white">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      ) : (
                        <Circle size={18} className="text-gray-300" />
                      )}
                    </button>
                    <span
                      className={`flex-1 text-[13.5px] ${
                        item.done ? "text-gray-400 line-through" : "text-gray-700"
                      }`}
                    >
                      {item.text}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(item.id)}
                      aria-label="Remove item"
                      className="text-gray-300 opacity-0 hover:text-red-400 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
                  placeholder="Add checklist item..."
                  className="flex-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-[13px] text-gray-600 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-emerald-300"
                />
                <button
                  type="button"
                  onClick={addChecklistItem}
                  className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-emerald-600"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
            </div>

            {/* Attachments */}
            {card.attachmentFiles && (
              <div className="mb-5">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Attachments
                </p>
                <div className="flex flex-col gap-2">
                  {card.attachmentFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-100 p-2"
                    >
                      <div
                        className={`h-10 w-10 shrink-0 rounded-md bg-linear-to-br ${file.thumbnail}`}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-gray-700">
                          {file.name}
                        </p>
                        <p className="truncate text-[11px] text-gray-400">
                          {file.meta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-emerald-600 hover:text-emerald-700">
                  <Plus size={15} />
                  Add Attachment
                </button>
              </div>
            )}

            {/* Comments / Activity */}
            <div>
              <div className="mb-3 flex items-center gap-4 border-b border-gray-100">
                {(["comments", "activity"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`-mb-px border-b-2 pb-2 text-[13px] font-medium capitalize transition-colors ${
                      tab === t
                        ? "border-emerald-500 text-emerald-600"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {tab === "comments" ? (
                <>
                  <div className="mb-4 flex items-start gap-2.5">
                    <PersonAvatar
                      person={{
                        id: "me",
                        name: "You",
                        initials: "AT",
                        gradient: "from-rose-400 to-orange-400",
                        image: "/assets/image1.png",
                      }}
                      size={30}
                    />
                    <div className="flex-1 rounded-xl border border-gray-100 bg-gray-50 p-2">
                      <textarea
                        value={commentDraft}
                        onChange={(e) => setCommentDraft(e.target.value)}
                        placeholder="Add a comment..."
                        rows={2}
                        className="w-full resize-none bg-transparent text-[13px] text-gray-600 outline-none placeholder:text-gray-400"
                      />
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <button type="button" aria-label="Attach" className="hover:text-gray-600">
                            <Paperclip size={15} />
                          </button>
                          <button type="button" aria-label="Emoji" className="hover:text-gray-600">
                            <Smile size={15} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={submitComment}
                          aria-label="Send comment"
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                        >
                          <Send size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {comments.map((c) => {
                      const author = findPerson(c.personId);
                      return (
                        <div key={c.id} className="flex items-start gap-2.5">
                          {author ? (
                            <PersonAvatar person={author} size={30} />
                          ) : (
                            <span className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-linear-to-br from-rose-400 to-orange-400 text-[10px] font-semibold text-white">
                              AT
                            </span>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-semibold text-gray-700">
                                {author?.name ?? "You"}
                              </span>
                              <span className="text-[11px] text-gray-400">
                                {c.time}
                              </span>
                            </div>
                            <p className="text-[13px] text-gray-600">{c.text}</p>
                            {c.reactions && (
                              <div className="mt-1 flex gap-1">
                                {c.reactions.map((r, i) => (
                                  <span
                                    key={i}
                                    className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[12px]"
                                  >
                                    {r}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {comments.length === 0 && (
                      <p className="text-[13px] text-gray-400">
                        No comments yet.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  {createdBy && (
                    <p className="text-[13px] text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {createdBy.name}
                      </span>{" "}
                      created this task.
                    </p>
                  )}
                  <p className="text-[13px] text-gray-500">
                    Status changed to{" "}
                    <span className="font-semibold text-gray-700">
                      {currentStatus.label}
                    </span>
                    .
                  </p>
                  {assignedTo.length > 0 && (
                    <p className="text-[13px] text-gray-500">
                      Assigned to{" "}
                      <span className="font-semibold text-gray-700">
                        {assignedTo
                          .map((id) => findPerson(id)?.name)
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                      .
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {manageLabelsOpen && (
        <AddNewLabelModal
          labels={allLabels}
          onChange={onLabelsChange}
          onClose={() => setManageLabelsOpen(false)}
        />
      )}
    </>
  );
}
