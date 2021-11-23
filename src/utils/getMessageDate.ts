const getMessageDate = (messageDate: any) => {
  const date = new Date(messageDate);

  console.log("messageDate", messageDate);
  console.log("date", date);
  console.log("date.toString()", date.toString());
  const day = parseInt(date.toISOString().split("-")[2]);
  const month = date.toLocaleString("default", { month: "short" });
  const dateNow = new Date();
  const elapsedTime = dateNow.getTime() - date.getTime();
  const result =
    elapsedTime > 86400000
      ? `${day} ${month}`
      : `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        }`;
  return result;
};

export default getMessageDate;
