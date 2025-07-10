import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";

export default function SingleVehicle() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleElement(
    "vehicles",
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
