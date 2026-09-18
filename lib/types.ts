export interface RecruitPost {
  id: string;
  bandName: string;
  genre: string;
  wantedInstrument: string;
  area: string;
  postedAt: string;
  snippet: string;
}

export interface BandMember {
  name: string;
  role: string;
}

export interface BandSong {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
}

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
}

export interface ChatThread {
  id: string;
  bandName: string;
  tag: string;
  time: string;
  messages: ChatMessage[];
}
