import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type { Species } from "../types";
import { Error } from "../components/error";
import { Loader } from "../components/loader";

export default function SingleSpecies() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useFetchSingleElement<Species>(
    "species",
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
