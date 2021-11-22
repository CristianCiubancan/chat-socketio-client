import { resetMessages } from "../redux/features/chatMessages/chatMessagesSlice";
import { resetCookie } from "../redux/features/cookie/cookieSlice";
import { resetNotifications } from "../redux/features/notifications/notificationsSlice";
import { resetUser } from "../redux/features/user/userSlice";
import { resetChats } from "../redux/features/userChats/userChatsSlice";
import { resetUsers } from "../redux/features/users/usersSlice";
import { AppDispatch } from "../redux/store";

export const ResetStore = (dispatch: AppDispatch) => {
  dispatch(resetUser());
  dispatch(resetChats());
  dispatch(resetUsers());
  dispatch(resetNotifications());
  dispatch(resetCookie());
  dispatch(resetMessages());
};
