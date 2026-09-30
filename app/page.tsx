"use client";

import { useState } from "react";
import { TabNav } from "@/components/layout/TabNav";
import { RecruitGrid } from "@/components/recruit/RecruitGrid";
import { RecruitDetail } from "@/components/recruit/RecruitDetail";
import { BandProfile } from "@/components/band/BandProfile";
import { ChatPanel } from "@/components/chat/ChatPanel";
import type { RecruitPost, ChatThread } from "@/lib/types";

// 실제로는 Supabase에서 fetch. 지금은 레이아웃 확인용 샘플 데이터.
const RECRUITS: RecruitPost[] = [
  {
    id: "1",
    bandName: "낮과 밤",
    genre: "인디락",
    wantedInstrument: "기타",
    area: "서귀포",
    postedAt: "3시간 전",
    snippet: "단단한 리프 위에 얹을 세컨 기타 찾습니다. 매주 화요일 합주 가능하신 분.",
  },
  {
    id: "2",
    bandName: "고래상어",
    genre: "펑크",
    wantedInstrument: "드럼",
    area: "제주시",
    postedAt: "어제",
    snippet: "빠른 템포 좋아하시는 분, 정식 멤버로 함께할 드러머를 구합니다.",
  },
  {
    id: "3",
    bandName: "여름 나기",
    genre: "시티팝",
    wantedInstrument: "베이스",
    area: "애월",
    postedAt: "2일 전",
    snippet: "그루브 중심 곡 위주로 작업해요. 객원으로 우선 함께 맞춰봐요.",
  },
];

const CHATS: ChatThread[] = [
  {
    id: "1",
    bandName: "여름 나기",
    tag: "베이스 모집 건",
    time: "방금",
    messages: [
      { id: "m1", from: "them", text: "안녕하세요, 모집글 보고 연락드려요!" },
      { id: "m2", from: "me", text: "네 반가워요! 혹시 합주 가능한 요일이 어떻게 되세요?" },
      { id: "m3", from: "them", text: "화, 목 저녁이면 편해요. 서귀포 쪽이신가요?" },
    ],
  },
];

const TABS = [
  { id: "list", label: "모집" },
  { id: "detail", label: "상세" },
  { id: "band", label: "밴드" },
  { id: "chat", label: "채팅" },
];

export default function BandServiceDemoPage() {
  const [tab, setTab] = useState("list");
  const [selected, setSelected] = useState<RecruitPost | null>(null);
  const [chatThreads, setChatThreads] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState(CHATS[0].id);

  const openDetail = (post: RecruitPost) => {
    setSelected(post);
    setTab("detail");
  };

  const handleSend = (threadId: string, text: string) => {
    setChatThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [
                ...t.messages,
                { id: crypto.randomUUID(), from: "me" as const, text },
              ],
            }
          : t
      )
    );
    // 실제 연동 시: 여기서 Supabase insert (chat_messages) 호출
  };

  return (
    <div className="min-h-screen bg-paper-bg px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl font-bold text-chrome">합주노트</span>
        </div>

        <TabNav tabs={TABS} activeId={tab} onChange={setTab} />

        <div className="pt-8">
          {tab === "list" && (
            <RecruitGrid posts={RECRUITS} onOpen={openDetail} />
          )}

          {tab === "detail" && selected && (
            <RecruitDetail
              post={selected}
              fullDescription={`${selected.snippet} 연습은 주 1~2회, 저녁 시간 위주로 맞추고 있고 합주실은 저희 쪽에서 예약해요.`}
              onBack={() => setTab("list")}
              onOpenBand={() => setTab("band")}
              onApply={() => setTab("chat")}
            />
          )}

          {tab === "band" && (
            <BandProfile
              name="여름 나기"
              genre="시티팝"
              description="제주에서 활동하는 3인조 밴드. 그루브와 멜로디 위주로 곡을 씁니다."
              members={[
                { name: "정우", role: "보컬/기타" },
                { name: "하늘", role: "베이스" },
                { name: "수진", role: "드럼" },
              ]}
              songs={[
                { id: "s1", title: "밤의 해변", duration: "3:42" },
                { id: "s2", title: "여름 나기", duration: "4:05" },
                { id: "s3", title: "우린 다시", duration: "3:18" },
              ]}
              onOpenChat={() => setTab("chat")}
            />
          )}

          {tab === "chat" && (
            <ChatPanel
              threads={chatThreads}
              activeId={activeChatId}
              onSelectThread={setActiveChatId}
              onSend={handleSend}
            />
          )}
        </div>
      </div>
    </div>
  );
}
