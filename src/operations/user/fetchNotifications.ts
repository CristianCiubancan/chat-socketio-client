const FetchUserNotifications = async (cookie: string | null = null) => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/userNotifications`,
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

export default FetchUserNotifications;
