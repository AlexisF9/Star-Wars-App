import { NavLink, useParams } from "react-router-dom";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type {
  Character,
  Film,
  Planet,
  Species,
  Starships,
  Vehicle,
} from "../types";
import { Error } from "../components/error";
import { useFetchElementsFromUrls } from "../hooks/useFetchElementsFromUrls";
import { Tab } from "../components/tab";
import { useFetchElementFromUrl } from "../hooks/useFetchElementFromUrl";
import { MoveRight } from "lucide-react";
import { TabsLoader } from "../components/tabsLoader";

export default function SinglePeople() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useFetchSingleElement<Character>(
    "people",
    id as string
  );

  const { data: homeworld, isLoading: loadingHomeworld } =
    useFetchElementFromUrl<Planet>(data?.homeworld ?? "");

  const { data: films, isLoading: loadingFilms } =
    useFetchElementsFromUrls<Film>(data?.films ?? []);

  const { data: species, isLoading: loadingSpecies } =
    useFetchElementsFromUrls<Species>(data?.species ?? []);

  const { data: vehicles, isLoading: loadingVehicles } =
    useFetchElementsFromUrls<Vehicle>(data?.vehicles ?? []);

  const { data: starships, isLoading: loadingStarships } =
    useFetchElementsFromUrls<Starships>(data?.starships ?? []);

  const loading =
    loadingFilms || loadingSpecies || loadingStarships || loadingVehicles;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-4 w-16"></div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="skeleton flex-1 h-18"></div>
          <div className="skeleton flex-1 h-18"></div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <Error status={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <div className="stats stats-vertical md:stats-horizontal shadow">
        {data.height && (
          <div className="stat">
            <div className="stat-title">Height</div>
            <div className="stat-value font-medium text-base">
              {data.height}
            </div>
          </div>
        )}

        {data.mass && (
          <div className="stat">
            <div className="stat-title">Mass</div>
            <div className="stat-value font-medium text-base">{data.mass}</div>
          </div>
        )}
      </div>

      {loadingHomeworld ? (
        <div className="flex w-full flex-col gap-2">
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-18 w-full"></div>
        </div>
      ) : homeworld ? (
        <div>
          <p>Home world :</p>
          <div className="list bg-base-100 rounded-box shadow-md">
            <p className="list-row flex items-center flex-wrap justify-between">
              <span>
                <span>{homeworld.name}</span>
              </span>
              <NavLink to={`/${homeworld.category}/${homeworld.id}`}>
                <button className="btn btn-square btn-ghost">
                  <MoveRight />
                </button>
              </NavLink>
            </p>
          </div>
        </div>
      ) : null}

      {loading ? (
        <TabsLoader />
      ) : (
        <div className="tabs tabs-border">
          <Tab label="Films" elements={films ?? []} defaultChecked />
          <Tab label="Species" elements={species ?? []} />
          <Tab label="Vehicles" elements={vehicles ?? []} />
          <Tab label="Starships" elements={starships ?? []} />
        </div>
      )}
    </div>
  );
}
