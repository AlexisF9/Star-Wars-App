import { useQuery } from "@tanstack/react-query";

export function useFetchCategory<T>(category: string) {
  const fetchCategory = async () => {
    const url = `${import.meta.env.VITE_API_URL}/category/${category}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error : ${response.status}`);
    }

    const json = await response.json();
    return json;
  };

  return useQuery<T>({
    queryKey: ["fetchCategory"],
    queryFn: () => fetchCategory(),
  });
}
