import { useParams } from "react-router-dom";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type { Character, Film, Planet, Starships, Vehicle } from "../types";
import { useFetchElementsFromUrls } from "../hooks/useFetchElementsFromUrls";
import { Error } from "../components/error";
import { Tab } from "../components/tab";
import { TabsLoader } from "../components/tabsLoader";

export default function SingleFilm() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useFetchSingleElement<Film>(
    "films",
    id as string
  );

  const { data: characters, isLoading: loadingCharacters } =
    useFetchElementsFromUrls<Character>(data?.characters ?? []);

  const { data: planets, isLoading: loadingPlanets } =
    useFetchElementsFromUrls<Planet>(data?.planets ?? []);

  const { data: starships, isLoading: loadingStarships } =
    useFetchElementsFromUrls<Starships>(data?.starships ?? []);

  const { data: vehicles, isLoading: loadingVehicles } =
    useFetchElementsFromUrls<Vehicle>(data?.vehicles ?? []);

  const loading =
    loadingCharacters || loadingPlanets || loadingStarships || loadingVehicles;

  const formattedDate = data?.release_date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(data.release_date))
    : null;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-4 w-16"></div>
        <div className="skeleton h-24 w-full"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
          <div className="skeleton h-18 w-full"></div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <Error status={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <p>{data.opening_crawl}</p>
      <div className="stats stats-vertical shadow w-full">
        {data.director && (
          <div className="stat">
            <div className="stat-title">Director</div>
            <div className="stat-value font-medium text-base">
              {data.director}
            </div>
          </div>
        )}

        {data.producer && (
          <div className="stat">
            <div className="stat-title">Producer</div>
            <div className="stat-value font-medium text-base">
              {data.producer}
            </div>
          </div>
        )}

        {formattedDate && (
          <div className="stat">
            <div className="stat-title">Release date</div>
            <div className="stat-value font-medium text-base">
              {formattedDate}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <TabsLoader />
      ) : (
        <div className="tabs tabs-border">
          <Tab
            label="Characters"
            elements={characters ?? []}
            defaultChecked={true}
          />
          <Tab label="Planets" elements={planets ?? []} />
          <Tab label="Starships" elements={starships ?? []} />
          <Tab label="Vehicles" elements={vehicles ?? []} />
        </div>
      )}
    </div>
  );
}
