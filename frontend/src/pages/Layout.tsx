import { Outlet } from "react-router";
import { Header } from "../components/header";

export default function Layout() {
  return (
    <main className="max-w-4xl mx-auto px-2 pb-6">
      <Header />
      <Outlet />
    </main>
  );
}
