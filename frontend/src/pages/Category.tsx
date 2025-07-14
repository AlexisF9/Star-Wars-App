import { useParams } from "react-router-dom";
import { useFetchCategory } from "../hooks/useFetchCategory";
import NotFound from "./NotFound";

export default function Category() {
  const params = useParams();

  const { data, isLoading, isError, error } = useFetchCategory(
    params.category as string
  );

  console.log(data, isError, error);

  if (isError) {
    return <NotFound />;
  }

  return <p>cat</p>;
}
