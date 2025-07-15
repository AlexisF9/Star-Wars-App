import { useQueries } from "@tanstack/react-query";

export function useFetchElementsFromUrls<T>(urls: string[]) {
  const queries = useQueries({
    queries: urls.map((url) => ({
      queryKey: ["fetchFromUrl", url],
      queryFn: async (): Promise<T> => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/search/url?q=${url}`
          );
          if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
          return await res.json();
        } catch {
          throw new Error("Data loading error");
        }
      },
      enabled: !!url,
    })),
  });

  // on regarde si au moins une des requettes à le isLoading a true
  // si une des requettes est en loading on renvoi isLoading à true
  const isLoading = queries.some((q) => q.isLoading);

  // pareil pour les erreurs
  const isError = queries.some((q) => q.isError);

  // on met toutes les data fetch dans le même tableau
  // .filter(Boolean) enlève un element du tableau si il est undefined, null, false...etc
  const data = queries.map((q) => q.data).filter(Boolean) as T[];

  return { data, isLoading, isError };
}
