import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import type { RootState } from "../store";
import { LogIn, LogOut } from "lucide-react";
import { logout } from "../features/auth/authSlice";

export function Header() {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="mb-12 border-b py-6 border-neutral-300">
      <div className="max-w-5xl px-4 w-full mx-auto flex flex-wrap items-center gap-4 justify-between">
        <NavLink to={"/"}>
          <h1 className="bold text-xl md:text-2xl">
            🚀 Star Wars Rebels Alliance Search System
          </h1>
        </NavLink>

        <div className="flex gap-2">
          {user ? (
            <>
              <NavLink to={"/dashboard"}>
                <button className="btn">Dashboard</button>
              </NavLink>
              <button
                onClick={handleLogout}
                className="btn btn-circle btn-soft btn-error"
                aria-label="Logout"
              >
                <LogOut width={16} />
              </button>
            </>
          ) : (
            <NavLink to={"/login"}>
              <button className="btn btn-circle" aria-label="Login">
                <LogIn width={16} />
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
