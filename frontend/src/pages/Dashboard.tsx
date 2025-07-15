import { useFetchUser } from "../hooks/useFetchUser";

const Dashboard = () => {
  const { data } = useFetchUser();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{data && data.username}</p>
    </div>
  );
};

export default Dashboard;
