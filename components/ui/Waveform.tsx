interface WaveformProps {
  bars?: number;
  played?: number; // 0~1, 재생 진행률 (지금은 정적 표시용)
}

export function Waveform({ bars = 30, played = 0.35 }: WaveformProps) {
  const heights = Array.from(
    { length: bars },
    (_, i) => 3 + Math.abs(Math.sin(i * 0.9)) * 13 + (i % 3) * 1.5
  );

  return (
    <div className="flex h-5 items-center gap-0.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-0.5 rounded-sm ${
            i < bars * played ? "bg-secondary" : "bg-[#C9C2AE]"
          }`}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}
