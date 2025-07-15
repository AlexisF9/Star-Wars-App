import { useParams } from "react-router-dom";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import type { Character, Film, Species } from "../types";
import { useFetchElementsFromUrls } from "../hooks/useFetchElementsFromUrls";
import { Tab } from "../components/tab";
import { TabsLoader } from "../components/tabsLoader";
import NotFound from "./NotFound";

export default function SingleSpecies() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleElement<Species>(
    "species",
    id as string
  );

  const { data: peoples, isLoading: loadingPeoples } =
    useFetchElementsFromUrls<Character>(data?.people ?? []);

  const { data: films, isLoading: loadingFilms } =
    useFetchElementsFromUrls<Film>(data?.films ?? []);

  const loading = loadingFilms || loadingPeoples;

  if (isLoading) {
    return <div className="skeleton h-4 w-16"></div>;
  }

  if (isError || !data) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{data.name}</h2>

      {loading ? (
        <TabsLoader />
      ) : (
        <div className="tabs tabs-border">
          <Tab label="People" elements={peoples ?? []} defaultChecked />
          <Tab label="Films" elements={films ?? []} />
        </div>
      )}
    </div>
  );
}
