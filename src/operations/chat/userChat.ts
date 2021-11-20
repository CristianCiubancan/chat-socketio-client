const FetchUserChat = async (cookie: string | null = null, chatId: number) => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/getChat/${chatId}`,
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

export default FetchUserChat;
