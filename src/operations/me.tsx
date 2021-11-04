import { useState, useEffect } from "react";

const meOp = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<any>();

  const getMe = async () => {
    setLoading(true);
    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/me`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getMe();

    return () => {};
  }, []);

  return { data, loading };
};

export default meOp;
