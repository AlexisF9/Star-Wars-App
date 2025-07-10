import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";

export default function SingleSpecies() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleElement(
    "species",
    id as string
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error</p>;
  }

  return <p>{data.name}</p>;
}
