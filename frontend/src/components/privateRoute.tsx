import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function PrivateRoute() {
  const { isAuthReady, user } = useSelector((state: RootState) => state.auth);

  return !isAuthReady ? (
    <p>Loading...</p>
  ) : user?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
