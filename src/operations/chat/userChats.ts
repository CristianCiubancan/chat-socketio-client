const FetchUserChats = async (
  cookie: string | null = null,
  cursor: string | undefined = undefined,
  limit: number = 10
) => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/userChats/${limit}&${cursor}`,
    {
      method: "get",
      headers: cookie
        ? { "Content-Type": "application/json", cookie: cookie }
        : { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const data = await response.json();

  console.log(data);

  return data;
};

export default FetchUserChats;
