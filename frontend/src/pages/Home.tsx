import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MoveRight, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useFetchSearch } from "../hooks/useFetchSearch";
import { useDebounce } from "../hooks/useDebounce";
import { Loader } from "../components/loader";

export default function Home() {
  const [searchCategory, setSearchCategory] = useState("fil");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch, isError, error } = useFetchSearch(
    debouncedSearchTerm,
    searchCategory
  );

  const categories = [
    {
      label: "Films",
      name: "fil",
    },
    {
      label: "People",
      name: "people",
    },
    {
      label: "Planets",
      name: "planets",
    },
    {
      label: "Species",
      name: "species",
    },
    {
      label: "Vehicles",
      name: "vehicles",
    },
    {
      label: "Starships",
      name: "starships",
    },
  ];

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
          defaultValue="films"
          className="select w-full md:w-fit"
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          {categories?.length > 0 &&
            categories.map((item, index) => {
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
                      <h2>{searchCategory === "films" ? el.title : el.name}</h2>
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
    </>
  );
}
