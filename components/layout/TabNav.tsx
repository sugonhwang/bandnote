"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Tab {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

export function TabNav({ tabs, activeId, onChange }: TabNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // 활성 탭이 바뀔 때마다 밑줄 인디케이터 + 위쪽 핀 조명이 해당 탭 위치로 슬라이드
  useGSAP(
    () => {
      if (!navRef.current || !indicatorRef.current || !glowRef.current) return;
      const activeBtn = navRef.current.querySelector<HTMLButtonElement>(
        `[data-tab-id="${activeId}"]`
      );
      if (!activeBtn) return;

      gsap.to(indicatorRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(glowRef.current, {
        x: activeBtn.offsetLeft - 6,
        width: activeBtn.offsetWidth + 12,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      });
    },
    { dependencies: [activeId], scope: navRef }
  );

  return (
    <div ref={navRef} className="relative flex gap-1 border-b border-white/10">
      <div
        ref={glowRef}
        className="tab-glow pointer-events-none absolute -top-2 left-0 h-12 opacity-0"
        style={{ width: 0 }}
      />
      {tabs.map((t) => (
        <button
          key={t.id}
          data-tab-id={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 pb-2.5 pt-2 text-base font-semibold transition-colors duration-300 ${
            t.id === activeId
              ? "text-margin drop-shadow-[0_0_10px_rgba(227,165,66,0.5)]"
              : "text-chrome-muted hover:text-chrome"
          }`}
        >
          {t.label}
        </button>
      ))}
      <div
        ref={indicatorRef}
        className="absolute bottom-[-1px] h-[2.5px] rounded-full bg-margin shadow-[0_0_10px_2px_rgba(227,165,66,0.65)]"
        style={{ width: 0 }}
      />
    </div>
  );
}
