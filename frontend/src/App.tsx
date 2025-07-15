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
import Category from "./pages/Category";
import type {
  Character,
  Film,
  Planet,
  Species,
  Starships,
  Vehicle,
} from "./types";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { PrivateRoute } from "./components/privateRoute";

export const categories = {
  films: { label: "Films", name: "films", type: {} as Film },
  people: { label: "People", name: "people", type: {} as Character },
  planets: { label: "Planets", name: "planets", type: {} as Planet },
  species: { label: "Species", name: "species", type: {} as Species },
  vehicles: { label: "Vehicles", name: "vehicles", type: {} as Vehicle },
  starships: { label: "Starships", name: "starships", type: {} as Starships },
};

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

          <Route path={`/:category`} element={<Category />} />

          {Object.entries(categoriesRoutes).map(([category, Component]) => (
            <Route
              key={category}
              path={`/${category}/:id`}
              element={<Component />}
            />
          ))}

          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
