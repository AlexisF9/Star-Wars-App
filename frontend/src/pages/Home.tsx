import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MoveRight, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useFetchSearch } from "../hooks/useFetchSearch";
import { useDebounce } from "../hooks/useDebounce";
import { Loader } from "../components/loader";
import { useFetchAllCategories } from "../hooks/useFetchAllCategories";
import { categories } from "../App";
import type { allCategoriesType, Film } from "../types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function Home() {
  const selectCategories = [
    {
      label: "All",
      name: "all",
    },
    ...Object.entries(categories).map(([_, value]) => ({
      label: value.label,
      name: value.name,
    })),
  ];

  const queryClient = useQueryClient();

  const { user } = useSelector((state: RootState) => state.auth);

  const { register, watch } = useForm<{
    searchText: string;
    searchCategory: string;
  }>({
    defaultValues: {
      searchText: "",
      searchCategory: selectCategories[0].name,
    },
  });

  const searchTerm = watch("searchText");
  const searchCategory = watch("searchCategory");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, refetch, isError, error } = useFetchSearch(
    debouncedSearchTerm,
    searchCategory
  );

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["searchUser"] });
    if (
      debouncedSearchTerm !== "" &&
      /[a-zA-Z]/.test(debouncedSearchTerm) &&
      searchCategory !== ""
    ) {
      refetch();
    }
  }, [debouncedSearchTerm, searchCategory, refetch]);

  const {
    data: allCategories,
    isLoading: allCategoriesLoading,
    error: allCategoriesError,
  } = useFetchAllCategories();

  const isFilm = (el: typeof allCategoriesType): el is Film => {
    return el.category === categories.films.name;
  };

  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">Search</h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" flex flex-col md:flex-row gap-2"
      >
        <select
          defaultValue={selectCategories[0].name}
          disabled={!user}
          className="select w-full md:w-fit"
          {...register("searchCategory")}
        >
          {selectCategories?.length > 0 &&
            selectCategories.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.label}
                </option>
              );
            })}
        </select>
        <label className="input w-full">
          <Search width={20} />
          <input
            type="search"
            required
            placeholder="Search element"
            disabled={!user}
            {...register("searchText")}
          />
        </label>
      </form>
      {!user && (
        <div className="flex flex-col gap-2 items-center mt-4">
          <h2 className="text-lg">Log in to search</h2>
          <NavLink to={"/login"}>
            <button className="btn">Login</button>
          </NavLink>
        </div>
      )}

      {isLoading ? (
        <div className="w-fit mx-auto">
          <Loader />
        </div>
      ) : data ? (
        data?.length > 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md">
            {data.map((el: typeof allCategoriesType, index: number) => {
              return (
                <li
                  key={index}
                  className="list-row flex items-center flex-wrap justify-between"
                >
                  <div>
                    <h3>{isFilm(el) ? el.title : el.name}</h3>
                    {searchCategory === "all" && (
                      <div className="text-xs uppercase opacity-50">
                        {el.category}
                      </div>
                    )}
                  </div>
                  <NavLink to={`${el.category}/${el.id}`}>
                    <button className="btn btn-square btn-ghost">
                      <MoveRight />
                    </button>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ) : (
          data &&
          data.length === 0 &&
          searchTerm !== "" && <p>No results found for your search.</p>
        )
      ) : null}
      {isError && <p>{error.message}</p>}

      <h2 className="text-xl font-bold mt-12 mb-4">Visit a category</h2>
      {allCategoriesLoading ? (
        <div className="flex w-full flex-col gap-2">
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
        </div>
      ) : allCategories ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          {Object.entries(allCategories as Record<string, string>).map(
            ([category, _], index) => {
              return (
                selectCategories.find((el) => el.name === category) && (
                  <li
                    className="list-row flex items-center flex-wrap justify-between"
                    key={index}
                  >
                    <h3>
                      {
                        selectCategories.find((el) => el.name === category)
                          ?.label
                      }
                    </h3>
                    <NavLink to={`/${category}`}>
                      <button className="btn btn-square btn-ghost">
                        <MoveRight />
                      </button>
                    </NavLink>
                  </li>
                )
              );
            }
          )}
        </ul>
      ) : allCategoriesError ? (
        <p>{allCategoriesError.message}</p>
      ) : null}
    </>
  );
}
