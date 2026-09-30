import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg bg-margin px-5 py-3 text-[15.5px] font-semibold text-[#241A0E] transition hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-margin px-5 py-2.5 text-[14.5px] font-semibold text-margin-dark transition hover:bg-margin-soft ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
