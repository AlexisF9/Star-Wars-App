import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MoveRight, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useFetchSearch } from "../hooks/useFetchSearch";
import { useDebounce } from "../hooks/useDebounce";
import { Loader } from "../components/loader";
import { useFetchAllCategories } from "../hooks/useFetchAllCategories";
import { categories } from "../App";

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

  const [searchCategory, setSearchCategory] = useState(
    selectCategories[0].name
  );
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch, isError, error } = useFetchSearch(
    debouncedSearchTerm,
    searchCategory
  );

  const { data: allCategories, isLoading: allCategoriesLoading } =
    useFetchAllCategories();

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["searchUser"] });
    if (
      debouncedSearchTerm !== "" &&
      /[a-zA-Z]/.test(debouncedSearchTerm) &&
      searchCategory !== ""
    ) {
      refetch();
    }
  }, [searchCategory, debouncedSearchTerm, refetch]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Search</h2>
      <form className="bg-base-200 -ml-4 -mr-4 md:mr-[inherit] md:ml-[inherit] md:rounded-full p-6 mb-6 flex flex-col md:flex-row gap-2">
        <select
          defaultValue={selectCategories[0].name}
          className="select w-full md:w-fit"
          onChange={(e) => setSearchCategory(e.target.value)}
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </form>

      {isLoading ? (
        <div className="w-fit mx-auto">
          <Loader />
        </div>
      ) : data ? (
        data?.length > 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md">
            {data.map(
              (
                el: {
                  title: string;
                  name: string;
                  category: string;
                  id: string;
                },
                index: number
              ) => {
                return (
                  <li
                    key={index}
                    className="list-row flex items-center flex-wrap justify-between"
                  >
                    <div>
                      <h3>
                        {searchCategory === "all"
                          ? el.title ?? el.name
                          : searchCategory === "films"
                          ? el.title
                          : el.name}
                      </h3>
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
              }
            )}
          </ul>
        ) : (
          data &&
          data.length === 0 &&
          searchTerm !== "" && <p>No results found for your search.</p>
        )
      ) : null}
      {isError && <p>{error.message}</p>}

      {allCategoriesLoading ? (
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-4 w-32"></div>
          <div className="flex flex-col gap-2">
            <div className="skeleton h-18 w-full"></div>
            <div className="skeleton h-18 w-full"></div>
            <div className="skeleton h-18 w-full"></div>
            <div className="skeleton h-18 w-full"></div>
            <div className="skeleton h-18 w-full"></div>
            <div className="skeleton h-18 w-full"></div>
          </div>
        </div>
      ) : (
        allCategories && (
          <>
            <h2 className="text-xl font-bold mt-12 mb-4">Visit a category</h2>
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
          </>
        )
      )}
    </>
  );
}
