import { Paperclip, MessageSquare, CalendarDays, Check, Circle } from "lucide-react";
import Image from "next/image";
import type { Card } from "../data";

const isAssetPath = (value: string) => value.startsWith("/");

export default function TaskCard({ card, onClick }: { card: Card; onClick?: () => void }) {
  const progress = card.subtasks
    ? Math.round((card.subtasks.done / card.subtasks.total) * 100)
    : null;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex gap-1">
          {card.tagColors.map((c, i) => (
            <span key={i} className={`h-1.5 w-6 rounded-full ${c}`} />
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[11px] text-gray-500">
          <CalendarDays size={12} />
          {card.date}
        </div>
      </div>

      {card.image && (
        isAssetPath(card.image) ? (
          <div className="relative mb-3 h-28 w-full overflow-hidden rounded-xl">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className={`mb-3 h-28 w-full rounded-xl bg-linear-to-br ${card.image}`}
          />
        )
      )}

      {card.images && (
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {card.images.map((image, i) => (
            isAssetPath(image) ? (
              <div key={i} className="relative h-16 overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${card.title} image ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                key={i}
                className={`h-16 rounded-lg bg-linear-to-br ${image}`}
              />
            )
          ))}
        </div>
      )}

      <h3 className="mb-1 text-[13.5px] font-semibold text-gray-800">
        {card.title}
      </h3>

      {card.description && (
        <p className="mb-3 text-[12.5px] leading-snug text-gray-400">
          {card.description}
        </p>
      )}

      {card.subtasks && (
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-gray-400">
            <span>
              SUB-TASKS: {card.subtasks.done}/{card.subtasks.total}
            </span>
            <span className="font-medium text-emerald-500">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-100">
            <div
              className="h-1.5 rounded-full bg-emerald-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {card.subtasks?.items && (
        <div className="mb-3 flex flex-col gap-1.5 rounded-xl bg-gray-50 p-2.5">
          {card.subtasks.items.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2 text-[12.5px] text-gray-500"
            >
              {item.done ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
              ) : (
                <Circle size={16} className="text-gray-300" />
              )}
              <span className={item.done ? "text-gray-400" : "text-gray-600"}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[12px] text-gray-400">
          {card.attachments && (
            <span className="flex items-center gap-1">
              <Paperclip size={13} />
              {card.attachments}
            </span>
          )}
          {card.comments && (
            <span className="flex items-center gap-1">
              <MessageSquare size={13} />
              {card.comments}
            </span>
          )}
        </div>
        <div className="flex -space-x-2">
          {card.avatars.map((a, i) => (
            a.image ? (
              <span
                key={i}
                className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-white bg-gray-100"
              >
                <Image
                  src={a.image}
                  alt={a.initials}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-linear-to-br text-[9px] font-semibold text-white ${a.gradient}`}
              >
                {a.initials}
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
