import { useEffect, useRef } from "react";

export const useCardLayout = () => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const cardLayout = () => {
    import("masonry-layout").then((module) => {
      new module.default(cardContainerRef.current!, {
        transitionDuration: 0,
      });
    });
  };

  useEffect(() => {
    cardLayout();
  }, []);

  return {
    cardContainerRef,
    cardLayout,
  } as const;
};
