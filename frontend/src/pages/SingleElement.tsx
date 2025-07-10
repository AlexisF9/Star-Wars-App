import { useParams } from "react-router";
import NotFound from "./NotFound";
import { People } from "../components/people";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";

export default function SingleElement() {
  const { category, id } = useParams();
  const validCategories = [
    "films",
    "people",
    "planets",
    "species",
    "vehicles",
    "starships",
  ];

  if (!category || !id || !validCategories.includes(category)) {
    return <NotFound />;
  }

  const { data, isLoading, isError } = useFetchSingleElement(category, id);

  if (!isLoading && isError) {
    return <NotFound />;
  }

  const categories = [
    {
      name: "people",
      component: <People data={data} />,
    },
  ];

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    categories.find((cat) => cat.name === data.category)?.component
  );
}
