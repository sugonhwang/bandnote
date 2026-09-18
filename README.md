# band-note (합주노트)

밴드 멤버 매칭 + 대표곡 공유 서비스. Next.js App Router / TypeScript / Tailwind CSS 기반.

## 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속하면 `app/page.tsx`에 연결된 데모 화면(모집/상세/밴드/채팅 탭)을 볼 수 있어요.

## 구조

```
app/
├── layout.tsx          # 루트 레이아웃, Inter 폰트 로드
├── globals.css         # Tailwind + 노트 텍스처(styles/) import
└── page.tsx            # 4개 화면을 탭으로 연결한 데모 페이지

components/
├── ui/                 # Tag, Button, Waveform
├── recruit/            # RecruitCard, RecruitGrid, RecruitDetail
├── band/                # BandProfile
├── chat/                # ChatPanel (GSAP 메시지 애니메이션 포함)
└── layout/              # TabNav (GSAP 슬라이딩 인디케이터 포함)

lib/types.ts             # RecruitPost, BandMember, BandSong, ChatThread 등 타입
styles/
├── notebook.css         # 종이 노트 줄무늬 + 빨간 여백선 텍스처
└── chat.css             # 채팅 반응형(모바일 토글) 스타일
```

## 애니메이션

`gsap` + `@gsap/react`(`useGSAP` 훅) 사용 중:
- `RecruitGrid` — 카드 순차 등장(stagger)
- `ChatPanel` — 새 메시지 슬라이드인
- `TabNav` — 탭 밑줄 인디케이터 슬라이드

## 다음 단계 (미구현)

- Supabase 프로젝트 연결 (`.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- `recruit_posts`, `bands`, `band_members`, `band_songs`, `chat_rooms`, `chat_messages` 테이블 + RLS 정책 적용
- `RecruitGrid`/`RecruitDetail`/`BandProfile`이 현재 받는 정적 props를 Supabase 쿼리 결과로 교체
- `ChatPanel`의 `threads`/`onSend`를 `useChatRoom` 훅 + `applyToRecruitPost` 서버 액션으로 교체
- 카카오/구글 소셜 로그인 연동
