import { MoveLeft } from "lucide-react";
import { NavLink, Outlet } from "react-router";

export default function SinglePageLayout() {
  return (
    <>
      <NavLink to={"/"}>
        <p className="flex items-center gap-2 mb-12">
          <MoveLeft width={20} /> Back to search
        </p>
      </NavLink>
      <Outlet />
    </>
  );
}
