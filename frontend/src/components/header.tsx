import { NavLink } from "react-router";

export function Header() {
  return (
    <header className="mb-6 border-b py-6 border-neutral-300">
      <NavLink to={"/"}>
        <h1 className="bold text-2xl">
          🚀 Star Wars Rebels Alliance Search System
        </h1>
      </NavLink>
    </header>
  );
}
