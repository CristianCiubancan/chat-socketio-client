const getChatWithName = (chat: any, userId: number) => {
  const otherMember = chat.members.filter(
    (member: any) => member.id !== userId
  );

  const ChatWithName = {
    chatId: chat.id,
    name: otherMember[0].username,
    profilePic: otherMember[0].profilePicUrl,
  };
  return {
    name: ChatWithName.name,
    profilePic: ChatWithName.profilePic,
    ...chat,
  };
};

export default getChatWithName;
