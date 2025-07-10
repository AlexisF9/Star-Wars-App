import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";

export default function SinglePeople() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleElement(
    "people",
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
