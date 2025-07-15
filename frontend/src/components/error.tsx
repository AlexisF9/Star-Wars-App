import { NavLink } from "react-router-dom";

export function Error({ message }: { message: string | null }) {
  return (
    <div className="flex flex-col gap-4">
      {message ? (
        <h2 className="text-lg mb-2">{message}</h2>
      ) : (
        <h2 className="text-lg">An error occurred during data loading.</h2>
      )}
      <NavLink to={"/"}>
        <button className="btn">Go to search</button>
      </NavLink>
    </div>
  );
}
