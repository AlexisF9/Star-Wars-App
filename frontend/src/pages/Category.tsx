import { NavLink, useParams } from "react-router-dom";
import { useFetchCategory } from "../hooks/useFetchCategory";
import { allCategoriesType, type Film } from "../types";
import { MoveRight, Search } from "lucide-react";
import { categories } from "../App";
import NotFound from "./NotFound";
import { Error } from "../components/error";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "../hooks/useDebounce";

export default function Category() {
  const params = useParams();
  const [results, setResults] = useState<(typeof allCategoriesType)[]>([]);

  const isGoodCategory = Object.values(categories).some(
    (el) => el.name === params.category
  );
  const categoryInfos = Object.values(categories).find(
    (el) => el.name === params.category
  );

  const { data, isLoading, isError, refetch, error } = useFetchCategory<
    (typeof allCategoriesType)[]
  >(params.category as string);

  const isFilm = (el: typeof allCategoriesType): el is Film => {
    return el.category === categories.films.name;
  };

  const { register, watch } = useForm<{
    searchText: string;
  }>({
    defaultValues: {
      searchText: "",
    },
  });

  const searchText = watch("searchText");
  const debouncedSearchTerm = useDebounce(searchText, 400);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setResults(data ?? []);
      return;
    }

    if (data && data.length > 0) {
      const newResults = data.filter((el) => {
        const label = isFilm(el) ? el.title : el.name;
        return label.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      });

      setResults(newResults);
    }
  }, [debouncedSearchTerm, data]);

  if (!isGoodCategory) {
    return <NotFound />;
  }

  if (!isError) {
    refetch();
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
      <h2 className="text-2xl font-bold mb-4">{categoryInfos?.label}</h2>

      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <label className="input w-full">
          <Search width={20} />
          <input
            type="search"
            placeholder="Search element"
            {...register("searchText")}
          />
        </label>
      </form>

      {results && results?.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {results.map((element, index) => {
            return (
              <li
                className="list-row flex items-center flex-wrap justify-between"
                key={index}
              >
                {isFilm(element) ? element.title : element.name}
                <NavLink to={`${element.id}`}>
                  <button className="btn btn-square btn-ghost">
                    <MoveRight />
                  </button>
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : error ? (
        <Error message={error.message} />
      ) : (
        <p>No results found for your search.</p>
      )}
    </div>
  );
}
