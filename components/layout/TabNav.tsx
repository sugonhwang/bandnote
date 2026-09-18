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

  // 활성 탭이 바뀔 때마다 밑줄 인디케이터가 해당 탭 위치로 슬라이드
  useGSAP(
    () => {
      if (!navRef.current || !indicatorRef.current) return;
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
    },
    { dependencies: [activeId], scope: navRef }
  );

  return (
    <div ref={navRef} className="relative flex gap-1 border-b border-black/10">
      {tabs.map((t) => (
        <button
          key={t.id}
          data-tab-id={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 pb-2.5 pt-2 text-base font-semibold transition-colors ${
            t.id === activeId ? "text-ink" : "text-ink-muted"
          }`}
        >
          {t.label}
        </button>
      ))}
      <div
        ref={indicatorRef}
        className="absolute bottom-[-1px] h-[2.5px] bg-margin"
        style={{ width: 0 }}
      />
    </div>
  );
}
