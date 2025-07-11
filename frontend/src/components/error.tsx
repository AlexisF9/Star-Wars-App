import { NavLink } from "react-router-dom";

export function Error({ status }: { status: Error | null }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {status ? (
        <div>
          <h2 className="text-xl font-bold text-center mb-2">
            {status.message}
          </h2>
          <p>An error occurred during data loading.</p>
        </div>
      ) : (
        <h2 className="text-xl font-bold text-center">
          An error occurred during data loading.
        </h2>
      )}
      <NavLink to={"/"}>
        <button className="btn">Go to search</button>
      </NavLink>
    </div>
  );
}
