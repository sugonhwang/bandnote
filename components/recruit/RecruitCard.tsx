import { Heart, MapPin, Clock, Guitar, Mic2, Drum, Music2 } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { RecruitPost } from "@/lib/types";

const instrumentIcon: Record<string, typeof Guitar> = {
  기타: Guitar,
  드럼: Drum,
  베이스: Guitar,
  보컬: Mic2,
};

interface RecruitCardProps {
  post: RecruitPost;
  liked: boolean;
  onToggleLike: (id: string) => void;
  onOpen: (post: RecruitPost) => void;
}

export function RecruitCard({
  post,
  liked,
  onToggleLike,
  onOpen,
}: RecruitCardProps) {
  const Icon = instrumentIcon[post.wantedInstrument] ?? Music2;

  return (
    <div
      onClick={() => onOpen(post)}
      className="notebook cursor-pointer rounded-[10px] py-[18px] pl-11 pr-[18px] shadow-[0_2px_4px_rgba(0,0,0,0.35),0_10px_32px_rgba(227,165,66,0.18)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[21px] font-semibold text-ink">{post.bandName}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Tag tone="secondary">{post.genre}</Tag>
            <Tag tone="margin">
              <span className="inline-flex items-center gap-1">
                <Icon size={11} /> {post.wantedInstrument} 구함
              </span>
            </Tag>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(post.id);
          }}
          aria-label="관심 등록"
          className={`p-1 ${liked ? "text-secondary" : "text-[#8C7B5C]"}`}
        >
          <Heart size={19} fill={liked ? "#8B3A3A" : "none"} />
        </button>
      </div>

      <p className="my-3 text-[13.5px] leading-relaxed text-[#C9B896]">
        {post.snippet}
      </p>

      <div className="flex gap-3.5 border-t border-white/10 pt-2.5 text-xs text-ink-muted">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {post.area}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {post.postedAt}
        </span>
      </div>
    </div>
  );
}
