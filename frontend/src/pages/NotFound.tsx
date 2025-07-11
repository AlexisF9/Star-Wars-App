import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <h1 className="text-4xl font-bold">404 - Page not found</h1>
      <p className="text-xl my-4">Something went wrong</p>
      <NavLink to={"/"}>
        <button className="btn">Back to home</button>
      </NavLink>
    </div>
  );
}
