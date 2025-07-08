import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    const url = "http://localhost:3000/api/category/films/1";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Hello</h1>
      {data && <p>{data.title}</p>}
    </>
  );
}

export default App;
