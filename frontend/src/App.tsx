import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { useEffect, useState } from "react";

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
  const [searchCategory, setSearchCategory] = useState("films");
  const [searchTerm, setSearchTerm] = useState("");

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
    if (searchTerm !== "") {
      refetch();
    }
  }, [searchCategory, searchTerm, refetch]);

  return (
    <>
      <h1>Star Wars Rebels Alliance Search System</h1>

      <form>
        <div className="flex flex-wrap gap-4 items-center">
          {categories.map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <label htmlFor={item.name}>{item.label}</label>
                <input
                  type="radio"
                  name="radio"
                  id={item.name}
                  value={item.name}
                  defaultChecked={item.name === searchCategory}
                  className="radio"
                  onChange={(e) => setSearchCategory(e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {data ? (
        data.length > 0 ? (
          <ul>
            {data.map((el: any, index: number) => {
              return (
                <li key={index}>
                  <div className="card w-96 bg-base-100 card-xs shadow-sm">
                    <div className="card-body">
                      <h2 className="card-title">
                        {searchCategory === "films" ? el.title : el.name}
                      </h2>
                    </div>
                  </div>
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

export default App;
