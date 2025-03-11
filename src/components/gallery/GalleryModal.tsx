
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
    caption: string;
  };
}

export function GalleryModal({ isOpen, onClose, image }: GalleryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={cn(
          "relative mx-auto max-w-3xl rounded-lg bg-background p-2 shadow-xl animate-fade-in",
          "max-h-[90vh] overflow-hidden"
        )}
      >
        <button
          className="absolute right-3 top-3 z-10 rounded-full bg-black/20 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/30 hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col">
          <div className="relative max-h-[70vh] overflow-hidden rounded-md">
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="p-4 text-center">
            <p className="text-lg font-medium">{image.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
