import { useQuery } from "@tanstack/react-query";

export function useFetchCategory<T>(category: string) {
  const fetchCategory = async () => {
    let result = null;

    try {
      const url = `${import.meta.env.VITE_API_URL}/category/${category}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Data loading error : ${response.status}`);
      }

      result = await response.json();
    } catch {
      throw new Error("Category data loading error");
    }

    return result;
  };

  return useQuery<T>({
    queryKey: ["fetchCategory"],
    queryFn: () => fetchCategory(),
    enabled: false,
    retry: false,
  });
}
