"use client";

import { useRef, useState } from "react";
import { ChevronLeft, Send } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ChatThread } from "@/lib/types";

interface ChatPanelProps {
  threads: ChatThread[];
  activeId: string;
  onSelectThread: (id: string) => void;
  onSend: (threadId: string, text: string) => void;
}

export function ChatPanel({
  threads,
  activeId,
  onSelectThread,
  onSend,
}: ChatPanelProps) {
  const [mobileView, setMobileView] = useState<"list" | "thread">("list");
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);

  const active = threads.find((t) => t.id === activeId);

  // 메시지가 늘어날 때마다 마지막 말풍선만 살짝 슬라이드+페이드로 등장
  useGSAP(
    () => {
      if (!messagesRef.current) return;
      const bubbles = messagesRef.current.children;
      const last = bubbles[bubbles.length - 1];
      if (!last) return;
      gsap.from(last, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.out",
      });
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    },
    { dependencies: [active?.messages.length, activeId], scope: messagesRef }
  );

  const selectThread = (id: string) => {
    onSelectThread(id);
    setMobileView("thread");
  };

  const send = () => {
    if (!input.trim() || !active) return;
    onSend(active.id, input.trim());
    setInput("");
  };

  if (!active) return null;

  return (
    <div data-mobile={mobileView} className="chat-wrap flex h-[560px] gap-4">
      <div className="chat-list w-[250px] shrink-0 overflow-y-auto md:w-[260px]">
        <p className="mb-2.5 text-xs font-semibold text-ink-muted">대화</p>
        <div className="flex flex-col gap-1.5">
          {threads.map((t) => {
            const last = t.messages[t.messages.length - 1]?.text ?? "";
            const isActive = t.id === activeId;
            return (
              <div
                key={t.id}
                onClick={() => selectThread(t.id)}
                className={`cursor-pointer rounded-lg border px-3 py-2.5 ${
                  isActive ? "border-margin bg-paper" : "border-transparent"
                }`}
              >
                <div className="mb-0.5 flex justify-between">
                  <span className="text-[13.5px] font-semibold text-ink">
                    {t.bandName}
                  </span>
                  <span className="text-[10.5px] text-ink-muted">{t.time}</span>
                </div>
                <div className="truncate text-[11.5px] text-ink-muted">
                  {last}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat-thread min-w-0 flex-1">
        <button
          className="chat-back mb-2.5 items-center gap-1 text-[13px] text-ink-muted"
          onClick={() => setMobileView("list")}
        >
          <ChevronLeft size={16} /> 대화 목록
        </button>

        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
            {active.bandName[0]}
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-ink">
              {active.bandName}
            </div>
            <div className="text-[11px] text-ink-muted">{active.tag}</div>
          </div>
        </div>

        <div
          ref={messagesRef}
          className="notebook flex flex-1 flex-col gap-2.5 overflow-y-auto rounded-[10px] py-4 pl-11 pr-4"
        >
          {active.messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[72%] rounded-xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                  m.from === "me" ? "bg-margin text-white" : "bg-[#E4DFCF] text-ink"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="메시지 보내기"
            className="flex-1 rounded-lg border border-black/10 bg-paper px-3.5 py-2.5 text-[13.5px] text-ink outline-none"
          />
          <button
            onClick={send}
            aria-label="전송"
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-margin text-white"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
