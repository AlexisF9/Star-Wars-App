import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

const fetchSearch = async (text: string) => {
  const url = `http://localhost:3000/api/search?q=${text}`;
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
  const debouncedSearch = useDebounce(searchTerm, 500); // 500 ms de délai

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["searchUser", searchTerm],
    queryFn: () => fetchSearch(searchTerm),
    enabled: false, // Ne lance pas automatiquement
  });

  useEffect(() => {
    if (debouncedSearch) {
      refetch(); // se déclenche uniquement après le délai
    }
  }, [debouncedSearch, refetch]);

  const categories = [
    "films",
    "people",
    "planets",
    "species",
    "vehicles",
    "starships",
  ];

  return (
    <>
      <h1>Star Wars Rebels Alliance Search System</h1>

      <form>
        <div>
          {categories.map((item, index) => {
            return (
              <div key={index}>
                <label htmlFor={item}>{item}</label>
                <input
                  type="radio"
                  name="radio"
                  value={item}
                  defaultChecked={item === searchCategory}
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

      {isLoading ? (
        <p>loading...</p>
      ) : (
        data && (
          <ul>
            {data.people.map((el: any, index: number) => {
              return <li key={index}>{el.name}</li>;
            })}
          </ul>
        )
      )}
    </>
  );
}

export default App;
