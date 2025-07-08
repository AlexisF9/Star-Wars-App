import { useQuery } from "@tanstack/react-query";

const fetchTest = async () => {
  const url = "http://localhost:3000/api/category/films/1";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  return json;
};

export function Item() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: () => fetchTest(),
  });

  if (isLoading) return <div className="skeleton h-4 w-full"></div>;
  if (error) return <p>Erreur : {(error as Error).message}</p>;

  return <>{data && <p>{data.title}</p>}</>;
}
