import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";

const fetchSearch = async (cat: string, text: string) => {
  const url = `http://localhost:3000/api/search?cat=${cat}&q=${text}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  return json;
};

function App() {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ["searchUser", searchTerm],
    queryFn: () => fetchSearch(searchCategory, searchTerm),
    enabled: false, // Ne lance pas automatiquement
  });

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

  console.log(data);

  return (
    <main className="max-w-4xl mx-auto px-2 pb-6">
      <h1 className="bold text-2xl my-12">
        🚀 Star Wars Rebels Alliance Search System
      </h1>

      <form className="mb-6 flex flex-col gap-4">
        <div className="filter">
          <input
            className="btn btn-square"
            type="reset"
            onClick={() => {
              setSearchCategory("");
              setSearchTerm("");
            }}
            value={"x"}
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
                  <button className="btn btn-square btn-ghost">
                    <MoveRight />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          data && data.length === 0 && searchTerm !== "" && <p>No results</p>
        )
      ) : null}
    </main>
  );
}

export default App;
