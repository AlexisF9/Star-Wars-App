import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type { Vehicle } from "../types";
import { Loader } from "../components/loader";
import { Error } from "../components/error";

export default function SingleVehicle() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useFetchSingleElement<Vehicle>(
    "vehicles",
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
