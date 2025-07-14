import { NavLink, useParams } from "react-router-dom";
import { useFetchCategory } from "../hooks/useFetchCategory";
import NotFound from "./NotFound";
import type {
  Character,
  Film,
  Planet,
  Species,
  Starships,
  Vehicle,
} from "../types";
import { MoveRight } from "lucide-react";
import { categories } from "../App";

export default function Category() {
  const params = useParams();

  const isGoodCategory = categories.find((el) => el.name === params.category);

  const { data, isLoading, isError, error } = useFetchCategory<
    (Film | Character | Planet | Species | Vehicle | Starships)[]
  >(params.category as string);

  console.log(params, data, isError, error);

  if (!isGoodCategory || isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-6 w-24"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isGoodCategory.label}</h2>
      {data && data?.length > 0 && (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {data.map((element, index) => {
            return (
              <li
                className="list-row flex items-center flex-wrap justify-between"
                key={index}
              >
                {element.category === "films" ? element.title : element.name}
                <NavLink to={`${element.id}`}>
                  <button className="btn btn-square btn-ghost">
                    <MoveRight />
                  </button>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
