const ReadMessageOperation = async (messageId: number) => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/readMessage`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ messageId }),
    }
  );

  const data = await response.json();
  console.log(data);
  return data;
};

export default ReadMessageOperation;
