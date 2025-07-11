import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type { Starships } from "../types";
import { Error } from "../components/error";
import { Loader } from "../components/loader";

export default function SingleStarship() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useFetchSingleElement<Starships>(
    "starships",
    id as string
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <Error status={error} />;
  }

  return <p>{data.name}</p>;
}
