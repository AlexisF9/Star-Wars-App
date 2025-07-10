import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import { NavLink } from "react-router";
import { useFetchSearch } from "../hooks/useFetchSearch";

export default function Home() {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  const { data, refetch } = useFetchSearch(searchTerm, searchCategory);

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
    if (searchTerm !== "" && searchCategory !== "") {
      refetch();
    } else {
      queryClient.removeQueries({ queryKey: ["searchUser"] });
    }
  }, [searchCategory, searchTerm, refetch]);

  return (
    <>
      <form className="mb-6 flex flex-col gap-4">
        <div className="filter">
          <input
            className="btn btn-square"
            type="reset"
            onClick={() => {
              setSearchCategory("");
              setSearchTerm("");
            }}
            value={"X"}
          />

          {categories.map((item, index) => {
            return (
              <input
                key={index}
                type="radio"
                name="radio"
                value={item.name}
                className="btn"
                aria-label={item.label}
                onChange={(e) => setSearchCategory(e.target.value)}
              />
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {data ? (
        data.length > 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md">
            {data.map((el: any, index: number) => {
              return (
                <li
                  key={index}
                  className="list-row flex items-center flex-wrap justify-between"
                >
                  <div>
                    <h2> {searchCategory === "films" ? el.title : el.name}</h2>
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
          data && data.length === 0 && searchTerm !== "" && <p>No results</p>
        )
      ) : null}
    </>
  );
}
