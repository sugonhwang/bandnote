"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RecruitCard } from "./RecruitCard";
import type { RecruitPost } from "@/lib/types";

interface RecruitGridProps {
  posts: RecruitPost[];
  onOpen: (post: RecruitPost) => void;
}

export function RecruitGrid({ posts, onOpen }: RecruitGridProps) {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // posts가 바뀔 때마다(필터링, 최초 로드 등) 카드가 순차적으로 떠오르며 등장
  useGSAP(
    () => {
      if (!gridRef.current) return;
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 18,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.06,
      });
    },
    { dependencies: [posts], scope: gridRef }
  );

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-3"
    >
      {posts.map((post) => (
        <RecruitCard
          key={post.id}
          post={post}
          liked={liked.has(post.id)}
          onToggleLike={toggleLike}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
