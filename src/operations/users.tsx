import { useState, useEffect } from "react";

const usersOp = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<any>();

  const getUsers = async () => {
    setLoading(true);
    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/users`,
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
    getUsers();

    return () => {};
  }, []);

  return { data, loading };
};

export default usersOp;
