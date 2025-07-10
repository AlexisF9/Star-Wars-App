import { useQuery } from "@tanstack/react-query";

export function useFetchSingleElement<T>(category: string, id: string) {
  const fetchSingleElement = async (cat: string, id: string) => {
    const url = `${import.meta.env.VITE_API_URL}/category/${cat}/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  };

  return useQuery<T>({
    queryKey: ["fetchElement", id],
    queryFn: () => fetchSingleElement(category as string, id as string),
  });
}
