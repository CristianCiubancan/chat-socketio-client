const ChangeProfilePicOperation = async (values: any) => {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL as string}/changeProfilePic`,
    {
      method: "post",
      //   headers: { "Content-Type": "multipart/form-data" },
      credentials: "include",
      body: values,
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

export default ChangeProfilePicOperation;
