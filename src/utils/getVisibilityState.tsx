import { useEffect, useState } from "react";

const getVisibility = () => {
  const [visibility, setVisibility] = useState<string>();

  const handleVisibilityState = () => {
    setVisibility(document.visibilityState);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityState);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityState);
    };
  }, []);

  return visibility;
};

export default getVisibility;
