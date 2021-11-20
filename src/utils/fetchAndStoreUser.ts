import fetchMe from "../operations/user/fetchMe";
import { setUser, setUserAsGuest } from "../redux/features/user/userSlice";
import { AppStore } from "../redux/store";

const fetchAndStoreUser = async (
  store: AppStore,
  cookie: string | null = null
) => {
  const user = await fetchMe(cookie);
  if (user === null) {
    await store.dispatch(setUserAsGuest());
  } else {
    await store.dispatch(setUser(user));
  }
};

export default fetchAndStoreUser;
