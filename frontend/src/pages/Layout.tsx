import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default function Layout() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-5xl mx-auto px-4">
          <Outlet />
        </div>
      </div>

      <Footer />
    </main>
  );
}
