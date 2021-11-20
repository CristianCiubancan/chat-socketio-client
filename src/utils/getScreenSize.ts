import { useEffect, useState } from "react";

export interface WindowSizeState {
  width: number;
  height: number;
}

export const getScreenSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeState>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
