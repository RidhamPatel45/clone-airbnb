import { useEffect } from "react";

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    if (lock) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [lock]);
}
