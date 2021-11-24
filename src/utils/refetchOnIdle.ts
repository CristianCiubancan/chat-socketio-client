import { useEffect } from "react";

export const RefetchOnIdle = (
  fn: Function,
  dependency: Object | Array<Object> | null = null
) => {
  const handleOnIdle = async () => {
    if (!document.hidden) {
      await fn();
    }
  };

  useEffect(
    () => {
      document.addEventListener("visibilitychange", handleOnIdle);
      return () => {
        document.removeEventListener("visibilitychange", handleOnIdle);
      };
    },
    dependency ? [dependency] : []
  );
};
