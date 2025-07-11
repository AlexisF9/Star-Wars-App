import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import SinglePeople from "./pages/SinglePeople";
import SingleFilm from "./pages/SingleFilm";
import SinglePlanet from "./pages/SinglePlanet";
import SingleSpecies from "./pages/SingleSpecies";
import SingleVehicle from "./pages/SingleVehicle";
import SingleStarship from "./pages/SingleStarship";
import SinglePageLayout from "./pages/SinglePageLayout";

function App() {
  const categoriesRoutes = {
    films: SingleFilm,
    people: SinglePeople,
    planets: SinglePlanet,
    species: SingleSpecies,
    vehicles: SingleVehicle,
    starships: SingleStarship,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route element={<SinglePageLayout />}>
            {Object.entries(categoriesRoutes).map(([category, Component]) => (
              <Route
                key={category}
                path={`/${category}/:id`}
                element={<Component />}
              />
            ))}
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
