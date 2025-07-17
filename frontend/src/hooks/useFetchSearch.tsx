import { useQuery } from "@tanstack/react-query";

export function useFetchSearch(searchTerm: string, searchCategory: string) {
  const fetchSearch = async (cat: string, text: string) => {
    const token = localStorage.getItem("token");
    let results = null;

    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/search?category=${cat}&q=${text}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      results = await response.json();
    } catch {
      throw new Error("An error has occurred during data loading");
    }

    return results;
  };

  return useQuery({
    queryKey: ["searchUser", searchTerm],
    queryFn: () => fetchSearch(searchCategory, searchTerm),
    enabled: false, // Ne lance pas le fetch automatiquement
  });
}
