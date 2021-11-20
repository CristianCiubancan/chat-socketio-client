const FetchUsers = async (
  cookie: string | null = null,
  cursor: string | undefined = undefined,
  limit: number = 10
) => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/users/${limit}&${cursor}`,
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

export default FetchUsers;
