import { useQuery } from "@tanstack/react-query";

export function useLogin(username: string, password: string) {
  const login = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Connection failure");
      }

      return await res.json();
    } catch (err) {
      throw new Error("Error");
    }
  };

  return useQuery({
    queryKey: ["fetchUser"],
    queryFn: () => login(),
    retry: false,
    enabled: false,
  });
}
