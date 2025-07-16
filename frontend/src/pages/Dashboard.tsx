import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../hooks/useFetchUser";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { LogOut } from "lucide-react";
import NotFound from "./NotFound";

const Dashboard = () => {
  const { data } = useFetchUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!data) {
    <NotFound />;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p>Welcome {data.username} !</p>
      </div>
      <button onClick={handleLogout} className="btn btn-soft btn-error">
        <span className="flex gap-2">
          <LogOut width={16} />
          Logout
        </span>
      </button>
    </div>
  );
};

export default Dashboard;
