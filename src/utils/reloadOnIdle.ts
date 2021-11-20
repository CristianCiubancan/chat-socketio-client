import { useRouter } from "next/router";
import { useEffect } from "react";

export const ReloadOnIdle = () => {
  const router = useRouter();

  const handleOnIdle = () => {
    if (!document.hidden) {
      router.reload();
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleOnIdle);
    return () => {
      document.removeEventListener("visibilitychange", handleOnIdle);
    };
  }, []);
};
