import { useEffect } from "react";

interface KeyboardNavOptions {
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  onArrowLeft,
  onArrowRight,
  onEscape,
  enabled = true,
}: KeyboardNavOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys in lightbox
      if (event.key === "ArrowLeft" && onArrowLeft) {
        event.preventDefault();
        onArrowLeft();
      } else if (event.key === "ArrowRight" && onArrowRight) {
        event.preventDefault();
        onArrowRight();
      } else if (event.key === "Escape" && onEscape) {
        event.preventDefault();
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onArrowLeft, onArrowRight, onEscape, enabled]);
}
