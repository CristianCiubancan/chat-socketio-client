const SendMessageOperation = async (chatId: number, text: string) => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/sendMessage`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ chatId, text }),
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

export default SendMessageOperation;
