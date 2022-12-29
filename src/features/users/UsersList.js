import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    console.log("Test User: ", user?.data);
    content = (
      <section className="users">
        <h1>Users List</h1>
        <ul>{}</ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default UsersList;
