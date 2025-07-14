import { useQuery } from "@tanstack/react-query";

export function useFetchSearch(searchTerm: string, searchCategory: string) {
  const fetchSearch = async (cat: string, text: string) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }/search?category=${cat}&q=${text}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Something went wrong. Error status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  };

  return useQuery({
    queryKey: ["searchUser", searchTerm],
    queryFn: () => fetchSearch(searchCategory, searchTerm),
    enabled: false, // Ne lance pas le fetch automatiquement
  });
}
