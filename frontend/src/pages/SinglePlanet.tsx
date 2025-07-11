import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type { Character, Film, Planet } from "../types";
import { Error } from "../components/error";
import { useFetchElementsFromUrls } from "../hooks/useFetchElementsFromUrls";
import { Tab } from "../components/tab";
import { TabsLoader } from "../components/tabsLoader";

export default function SinglePlanet() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useFetchSingleElement<Planet>(
    "planets",
    id as string
  );

  const { data: peoples, isLoading: loadingPeoples } =
    useFetchElementsFromUrls<Character>(data?.residents ?? []);

  const { data: films, isLoading: loadingFilms } =
    useFetchElementsFromUrls<Film>(data?.films ?? []);

  const loading = loadingFilms || loadingPeoples;

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
        {data.diameter && (
          <div className="stat">
            <div className="stat-title">Diameter</div>
            <div className="stat-value font-medium text-base">
              {data.diameter}
            </div>
          </div>
        )}

        {data.population && (
          <div className="stat">
            <div className="stat-title">Population</div>
            <div className="stat-value font-medium text-base">
              {data.population}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <TabsLoader />
      ) : (
        <div className="tabs tabs-border">
          <Tab label="Residents" elements={peoples ?? []} defaultChecked />
          <Tab label="Films" elements={films ?? []} />
        </div>
      )}
    </div>
  );
}
