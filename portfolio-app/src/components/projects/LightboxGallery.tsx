"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

export function LightboxGallery({ images, title }: { images: string[]; title: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Cover / Main preview */}
      <div
        onClick={() => setSelectedImage(images[0])}
        className="relative aspect-[16/9] rounded-2xl overflow-hidden glass-card border border-slate-800 cursor-pointer group"
      >
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 1200px) 100vw, 1150px"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-bold flex items-center gap-2 shadow-2xl">
            <Maximize2 className="w-4 h-4 text-emerald-400" />
            <span>Click To Enlarge Showcase</span>
          </div>
        </div>
      </div>

      {/* Thumbnails list if multiple */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 cursor-pointer hover:border-emerald-500 transition-colors"
            >
              <Image
                src={img}
                alt={`${title} screenshot ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-5xl w-full max-h-[85vh] aspect-[16/10]">
            <Image
              src={selectedImage}
              alt={title}
              fill
              sizes="(max-width: 1280px) 90vw, 1200px"
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
