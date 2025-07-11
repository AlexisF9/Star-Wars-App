import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MoveRight, Search } from "lucide-react";
import { NavLink } from "react-router";
import { useFetchSearch } from "../hooks/useFetchSearch";
import { useDebounce } from "../hooks/useDebounce";
import { Loader } from "../components/loader";

export default function Home() {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useFetchSearch(
    debouncedSearchTerm,
    searchCategory
  );

  const categories = [
    {
      label: "Films",
      name: "films",
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
    if (
      debouncedSearchTerm !== "" &&
      /[a-zA-Z]/.test(debouncedSearchTerm) &&
      searchCategory !== ""
    ) {
      refetch();
    } else {
      queryClient.removeQueries({ queryKey: ["searchUser"] });
    }
  }, [searchCategory, debouncedSearchTerm, refetch]);

  return (
    <>
      <form className="mb-6 flex flex-col gap-4">
        <div className="join w-full">
          {categories.map((item, index) => {
            return (
              <input
                key={index}
                type="radio"
                name="radio"
                value={item.name}
                className="join-item flex-1 btn"
                aria-label={item.label}
                onChange={(e) => setSearchCategory(e.target.value)}
              />
            );
          })}
        </div>
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
        data.length > 0 ? (
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
    </>
  );
}
