import { useQuery } from "@tanstack/react-query";

export function useFetchUser() {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Access denied");

      return await res.json();
    } catch {
      throw new Error("Data loading error");
    }
  };

  return useQuery({
    queryKey: ["fetchUser"],
    queryFn: () => fetchUser(),
    retry: false,
  });
}
