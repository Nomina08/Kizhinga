'use client';

import { useRef, useState } from 'react';
import { Move } from 'lucide-react';

interface PanoramaViewerProps {
  imageUrl: string;
  title: string;
}

export function PanoramaViewer({ imageUrl, title }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setDragging(true);
    startX.current = e.clientX;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !containerRef.current) return;
    const dx = e.clientX - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - dx * 1.5;
  };

  const onPointerUp = () => setDragging(false);

  return (
    <div className="relative rounded-3xl overflow-hidden ring-1 ring-stone-200/50 dark:ring-stone-700/50 shadow-card">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md px-4 py-2 text-xs font-medium text-white">
        <Move className="h-3.5 w-3.5" />
        Перетащите для обзора · 360°
      </div>
      <div
        ref={containerRef}
        className={`overflow-x-auto overflow-y-hidden cursor-grab ${dragging ? 'cursor-grabbing' : ''} select-none`}
        style={{ height: 'min(60vh, 480px)' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <img
          src={imageUrl}
          alt={title}
          draggable={false}
          className="h-full w-auto max-w-none min-w-[200%] object-cover"
        />
      </div>
    </div>
  );
}
