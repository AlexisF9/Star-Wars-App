import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { register, handleSubmit, watch } = useForm<{
    username: string;
    password: string;
  }>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const username = watch("username");
  const password = watch("password");

  const { data, isLoading, refetch, isError } = useLogin(username, password);

  const SubmitHandler = async (inputs: {
    username: string;
    password: string;
  }) => {
    if (inputs.username && inputs.password) {
      refetch();
    }
  };

  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem("token", data.token);
      dispatch(
        setCredentials({ token: data.token, user: { username: data.user } })
      );
      setMessage("Connexion réussie !");
      navigate("/dashboard");
    }

    if (isError) {
      setMessage("Identifiants invalides");
    }
  }, [data, isError]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Username"
            className="input flex-1"
            required
            value={username}
            {...register("username")}
          />
          <input
            type="password"
            placeholder="Password"
            className="input flex-1"
            required
            value={password}
            {...register("password")}
          />
        </div>
        <button className="btn" type="submit" disabled={isLoading ?? false}>
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
