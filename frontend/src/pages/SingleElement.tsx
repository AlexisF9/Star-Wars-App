import { NavLink, useParams } from "react-router";
import { People } from "../components/people";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import { MoveLeft } from "lucide-react";

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
    return (
      <>
        <p className="mb-4">Your url is invalid</p>
        <NavLink to={"/"}>
          <button className="btn">Back to home</button>
        </NavLink>
      </>
    );
  }

  const { data, isLoading, isError } = useFetchSingleElement(category, id);

  if (!isLoading && isError) {
    return (
      <>
        <p className="mb-4">An error occurred during data loading</p>
        <NavLink to={"/"}>
          <button className="btn">Back to home</button>
        </NavLink>
      </>
    );
  }

  const categories = [
    {
      name: "people",
      component: <People data={data} />,
    },
  ];

  return (
    <>
      <NavLink to={"/"}>
        <p className="flex items-center gap-2 mb-12">
          <MoveLeft width={20} /> Back to search
        </p>
      </NavLink>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        categories.find((cat) => cat.name === data.category)?.component
      )}
    </>
  );
}
