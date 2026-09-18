import { ReactNode } from "react";

type TagTone = "margin" | "secondary";

interface TagProps {
  children: ReactNode;
  tone?: TagTone;
}

export function Tag({ children, tone = "secondary" }: TagProps) {
  const toneClasses =
    tone === "margin"
      ? "bg-margin-soft text-margin-dark"
      : "bg-secondary-soft text-secondary-dark";

  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${toneClasses}`}
    >
      {children}
    </span>
  );
}
