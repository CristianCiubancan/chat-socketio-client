import { useEffect } from "react";

export const RefetchOnIdle = (fn: Function) => {
  const handleOnIdle = async () => {
    if (!document.hidden) {
      await fn();
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleOnIdle);
    return () => {
      document.removeEventListener("visibilitychange", handleOnIdle);
    };
  }, []);
};
