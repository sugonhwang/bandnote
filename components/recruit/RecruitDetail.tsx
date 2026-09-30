import { ChevronLeft, MapPin, Clock, Users } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { PrimaryButton } from "@/components/ui/Button";
import type { RecruitPost } from "@/lib/types";

interface RecruitDetailProps {
  post: RecruitPost;
  fullDescription: string;
  onBack: () => void;
  onOpenBand: () => void;
  onApply: () => void;
}

export function RecruitDetail({
  post,
  fullDescription,
  onBack,
  onOpenBand,
  onApply,
}: RecruitDetailProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-[18px] flex items-center gap-1 text-sm text-chrome-muted transition-colors hover:text-chrome"
      >
        <ChevronLeft size={16} /> 목록으로
      </button>

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="notebook flex-[1.6] rounded-[10px] py-7 pl-12 pr-7 shadow-[0_2px_4px_rgba(0,0,0,0.35),0_10px_32px_rgba(227,165,66,0.18)]">
          <div className="mb-4 flex gap-1.5">
            <Tag tone="secondary">{post.genre}</Tag>
            <Tag tone="margin">{post.wantedInstrument} 모집</Tag>
          </div>

          <h2 className="mb-[18px] text-[27px] font-bold leading-snug text-ink">
            {post.bandName}, {post.wantedInstrument} 세션을 찾습니다
          </h2>

          <p className="mb-5 text-[15px] leading-relaxed text-[#CBBA98]">
            {fullDescription}
          </p>

          <div className="flex gap-4 border-t border-white/10 pt-3.5 text-[13px] text-ink-muted">
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {post.area}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {post.postedAt} 게시
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3.5 md:sticky md:top-5">
          <button
            onClick={onOpenBand}
            className="notebook rounded-[10px] py-4 pl-10 pr-4 text-left shadow-[0_2px_4px_rgba(0,0,0,0.35),0_10px_32px_rgba(227,165,66,0.18)]"
          >
            <p className="mb-1.5 text-xs font-medium text-ink-muted">
              밴드 프로필
            </p>
            <div className="flex items-center gap-1.5 text-[17px] font-semibold text-secondary-dark">
              <Users size={16} /> {post.bandName}
            </div>
          </button>

          <PrimaryButton onClick={onApply} className="w-full">
            지원하고 채팅 시작하기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
