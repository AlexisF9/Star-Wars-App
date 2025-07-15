import { useQuery } from "@tanstack/react-query";

export function useFetchAllCategories<T>() {
  const fetchAllCategories = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/category/all`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch {
      throw new Error("Categories data loading error");
    }
  };

  return useQuery<T>({
    queryKey: ["fetchAllCategories"],
    queryFn: () => fetchAllCategories(),
    retry: false,
  });
}
