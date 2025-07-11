import { useQuery } from "@tanstack/react-query";

export function useFetchElementFromUrl<T>(url: string) {
  const fetchElementFromUrl = async (url: string) => {
    const req = `${import.meta.env.VITE_API_URL}/search/url?q=${url}`;
    const response = await fetch(req);

    if (!response.ok) {
      throw new Error(`Error : ${response.status}`);
    }

    const json = await response.json();
    return json;
  };

  return useQuery<T>({
    queryKey: ["fetchElementFromUrl", url],
    queryFn: () => fetchElementFromUrl(url as string),
  });
}
