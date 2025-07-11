import { NavLink } from "react-router";

export function Header() {
  return (
    <header className="mb-12 border-b py-6 border-neutral-300">
      <div className="max-w-5xl px-4 w-full mx-auto">
        <NavLink to={"/"}>
          <h1 className="bold text-2xl">
            🚀 Star Wars Rebels Alliance Search System
          </h1>
        </NavLink>
      </div>
    </header>
  );
}
