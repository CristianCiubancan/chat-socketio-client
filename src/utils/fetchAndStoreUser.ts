import fetchMe from "../operations/user/fetchMe";
import { setUser, setUserAsGuest } from "../redux/features/user/userSlice";
import { AppStore } from "../redux/store";

const fetchAndStoreUser = async (
  store: AppStore,
  cookie: string | null = null
) => {
  const user = cookie ? await fetchMe(cookie) : await fetchMe();
  if (user === null || (user.error && user.error === "not authenticated")) {
    // if (user === null || (user.error && user.error === "not authenticated")) {
    await store.dispatch(setUserAsGuest());
  } else if (user && !user.error) {
    await store.dispatch(setUser(user));
  }
};

export default fetchAndStoreUser;
