import { useQuery } from "@tanstack/react-query";

export function useFetchSingleElement<T>(category: string, id: string) {
  const fetchSingleElement = async (cat: string, id: string) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/category/${cat}/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Data loading error : ${response.status}`);
      }

      return await response.json();
    } catch {
      throw new Error("Data loading error");
    }
  };

  return useQuery<T>({
    queryKey: ["fetchElement", id],
    queryFn: () => fetchSingleElement(category as string, id as string),
    retry: false,
  });
}
