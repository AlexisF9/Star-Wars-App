import { useParams } from "react-router-dom";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type { Character, Film, Vehicle } from "../types";
import { TabsLoader } from "../components/tabsLoader";
import { Tab } from "../components/tab";
import { useFetchElementsFromUrls } from "../hooks/useFetchElementsFromUrls";
import NotFound from "./NotFound";

export default function SingleVehicle() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleElement<Vehicle>(
    "vehicles",
    id as string
  );

  const { data: films, isLoading: loadingFilms } =
    useFetchElementsFromUrls<Film>(data?.films ?? []);

  const { data: pilots, isLoading: loadingPilots } =
    useFetchElementsFromUrls<Character>(data?.pilots ?? []);

  const loading = loadingFilms || loadingPilots;

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-4 w-16"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="skeleton w-full h-18"></div>
          <div className="skeleton w-full h-18"></div>
          <div className="skeleton w-full h-18"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="skeleton w-full h-18"></div>
          <div className="skeleton w-full h-18"></div>
          <div className="skeleton w-full h-18"></div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <div className="stats stats-vertical shadow">
        {data.model && (
          <div className="stat">
            <div className="stat-title">Model</div>
            <div className="stat-value font-medium text-base">{data.model}</div>
          </div>
        )}

        {data.manufacturer && (
          <div className="stat">
            <div className="stat-title">Manufacturer</div>
            <div className="stat-value font-medium text-base">
              {data.manufacturer}
            </div>
          </div>
        )}

        {data.vehicle_class && (
          <div className="stat">
            <div className="stat-title">Vehicle class</div>
            <div className="stat-value font-medium text-base">
              {data.vehicle_class}
            </div>
          </div>
        )}
      </div>
      <div className="stats stats-vertical md:stats-horizontal shadow">
        {data.cost_in_credits && data.cost_in_credits !== "unknown" && (
          <div className="stat">
            <div className="stat-title">Cost in credits</div>
            <div className="stat-value font-medium text-base">
              {data.cost_in_credits}
            </div>
          </div>
        )}

        {data.length && (
          <div className="stat">
            <div className="stat-title">Length</div>
            <div className="stat-value font-medium text-base">
              {data.length}
            </div>
          </div>
        )}

        {data.passengers && (
          <div className="stat">
            <div className="stat-title">Passengers</div>
            <div className="stat-value font-medium text-base">
              {data.passengers}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <TabsLoader />
      ) : (
        <div className="tabs tabs-border">
          <Tab label="Films" elements={films ?? []} defaultChecked />
          <Tab label="Pilots" elements={pilots ?? []} />
        </div>
      )}
    </div>
  );
}
