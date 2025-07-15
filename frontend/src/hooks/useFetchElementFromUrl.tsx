import { useQuery } from "@tanstack/react-query";

export function useFetchElementFromUrl<T>(url: string | null) {
  const fetchElementFromUrl = async (url: string) => {
    let result = null;

    try {
      const req = `${import.meta.env.VITE_API_URL}/search/url?q=${url}`;
      const response = await fetch(req);

      if (!response.ok) {
        throw new Error(`Data loading error : ${response.status}`);
      }

      result = await response.json();
    } catch {
      throw new Error("Data loading error");
    }

    return result;
  };

  return useQuery<T>({
    queryKey: ["fetchElementFromUrl", url],
    queryFn: () => fetchElementFromUrl(url as string),
    enabled: !!url,
    retry: false,
  });
}
