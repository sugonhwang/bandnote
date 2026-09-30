import { Play, MessageCircle } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { GhostButton } from "@/components/ui/Button";
import { Waveform } from "@/components/ui/Waveform";
import type { BandMember, BandSong } from "@/lib/types";

interface BandProfileProps {
  name: string;
  genre: string;
  description: string;
  members: BandMember[];
  songs: BandSong[];
  onOpenChat: () => void;
  onPlaySong?: (song: BandSong) => void;
}

export function BandProfile({
  name,
  genre,
  description,
  members,
  songs,
  onOpenChat,
  onPlaySong,
}: BandProfileProps) {
  return (
    <div className="notebook overflow-hidden rounded-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.35),0_10px_32px_rgba(227,165,66,0.18)]">
      <div className="border-b border-white/10 py-[30px] pl-12 pr-7">
        <Tag tone="secondary">{genre}</Tag>
        <h2 className="mb-2 mt-3 text-[33px] font-bold text-ink">{name}</h2>
        <p className="max-w-[480px] text-[14.5px] leading-relaxed text-ink-muted">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-7 py-7 pl-12 pr-7 md:flex-row">
        <div className="flex-1">
          <p className="mb-3.5 text-xs font-semibold text-ink-muted">멤버</p>
          <div className="flex flex-col gap-3.5">
            {members.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
                    i % 2 ? "bg-secondary" : "bg-margin"
                  }`}
                >
                  {m.name[0]}
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">
                    {m.name}
                  </div>
                  <div className="text-xs text-ink-muted">{m.role}</div>
                </div>
              </div>
            ))}
          </div>

          <GhostButton onClick={onOpenChat} className="mt-[22px] w-full">
            <MessageCircle size={15} /> 채팅으로 문의하기
          </GhostButton>
        </div>

        <div className="flex-[1.3]">
          <p className="mb-3.5 text-xs font-semibold text-ink-muted">대표곡</p>
          <div className="flex flex-col">
            {songs.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center gap-3.5 py-3 ${
                  i !== 0 ? "border-t border-white/10" : ""
                }`}
              >
                <button
                  onClick={() => onPlaySong?.(s)}
                  aria-label="재생"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-white"
                >
                  <Play size={13} fill="#FFFFFF" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[13.5px] font-semibold text-ink">
                    {s.title}
                  </div>
                  <Waveform />
                </div>
                <span className="text-xs text-ink-muted">{s.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
