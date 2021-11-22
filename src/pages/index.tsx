import React, { useEffect } from "react";
import Layout from "../components/Layout";
import FetchMoreButton from "../components/fetchMoreButton";
import { setUsers } from "../redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { wrapper } from "../redux/store";
import CardsList from "../components/cardsList";
import FetchUsers from "../operations/user/fetchUsers";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const users = useAppSelector((state) => state.users.value);
  const dispatch = useAppDispatch();

  const handleRefreshUsers = async () => {
    const response = await FetchUsers();
    if (JSON.stringify(response.users[0]) !== JSON.stringify(users.users[0])) {
      dispatch(setUsers(response));
    }
  };

  useEffect(() => {
    handleRefreshUsers();
  }, []);

  return (
    <Layout>
      <CardsList users={users.users} />
      <FetchMoreButton users={users} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: any) => {
    const cookie = context.req.headers.cookie;
    const currentState = store.getState();
    if (currentState.users.value.users[0].id === 0) {
      const response = await FetchUsers(cookie ? cookie : null);
      if (!response.error) {
        await store.dispatch(setUsers(response));
      }
    }

    return { props: {} };
  }
);

export default Index;
