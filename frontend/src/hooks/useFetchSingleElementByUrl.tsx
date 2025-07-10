import { useQuery } from "@tanstack/react-query";

export function useFetchSingleElementByUrl(url: string[]) {
  const fetchSingleElementByUrl = async (elements: string[]) => {
    const r = elements.map(async (el) => {
      const url = `${import.meta.env.VITE_API_URL}/search/url?q=${el}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    });

    return r;
  };

  return useQuery({
    queryKey: ["fetchElementByUrl", url],
    queryFn: () => fetchSingleElementByUrl(url as string[]),
  });
}
