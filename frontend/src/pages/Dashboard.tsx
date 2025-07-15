import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../hooks/useFetchUser";

const Dashboard = () => {
  const { data } = useFetchUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{data && data.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
