import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import { Loader } from "../components/loader";
import type { Character } from "../types";

export default function SinglePeople() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleElement<Character>(
    "people",
    id as string
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <div className="stats shadow">
        {data.height && (
          <div className="stat">
            <div className="stat-title">Height</div>
            <div className="stat-value">{data.height}</div>
          </div>
        )}

        {data.mass && (
          <div className="stat">
            <div className="stat-title">Mass</div>
            <div className="stat-value">{data.mass}</div>
          </div>
        )}
      </div>
    </div>
  );
}
