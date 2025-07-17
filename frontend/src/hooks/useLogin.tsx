import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
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

  return useMutation({ mutationFn: login });
}
