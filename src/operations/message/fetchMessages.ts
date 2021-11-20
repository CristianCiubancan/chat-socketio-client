const FetchMessages = async (
  cookie: string | null = null,
  chatId: number,
  cursor: string | undefined = undefined,
  limit: number = 15
) => {
  const response: any = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL as string
    }/getMessages/${limit}&${chatId}&${cursor}`,
    {
      method: "get",
      headers: cookie
        ? { "Content-Type": "application/json", cookie: cookie }
        : { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const data = await response.json();
  return data;
};

export default FetchMessages;
