import { useNavigate, useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import { Loader } from "../components/loader";

export default function SingleFilm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<
    { name: string; category: string; id: string }[] | null
  >(null);
  const [planets, setPlanets] = useState<
    { name: string; category: string; id: string }[] | null
  >(null);
  const [starships, setStarships] = useState<
    { name: string; category: string; id: string }[] | null
  >(null);
  const [vehicles, setVehicles] = useState<
    { name: string; category: string; id: string }[] | null
  >(null);

  const { data, isLoading, isError } = useFetchSingleElement(
    "films",
    id as string
  );

  const fetchFromUrls = async (
    urls: string[]
  ): Promise<{ name: string; category: string; id: string }[]> => {
    const results = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/search/url?q=${url}`
        );
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        const json = await res.json();
        return json;
      })
    );

    return results;
  };

  useEffect(() => {
    if (!data) return;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const sets = [
          { key: "characters", setter: setCharacters },
          { key: "planets", setter: setPlanets },
          { key: "starships", setter: setStarships },
          { key: "vehicles", setter: setVehicles },
        ];

        for (const { key, setter } of sets) {
          const urls = data[key as keyof typeof data] as string[];
          if (urls?.length > 0) {
            const results = await fetchFromUrls(urls);
            setter(results);
          }
        }

        setLoading(false);

        if (data.release_date) {
          setFormattedDate(
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(data.release_date))
          );
        }
      } catch (err) {
        console.error("Failed to fetch film data", err);
      }
    };

    fetchAll();
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{data.title}</h2>
      <p>{data.opening_crawl}</p>
      <div className="stats stats-vertical shadow w-full">
        <div className="stat">
          <div className="stat-title">Director</div>
          <div className="stat-value font-medium text-base">
            {data.director}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Producer</div>
          <div className="stat-value font-medium text-base">
            {data.producer}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Release date</div>
          <div className="stat-value font-medium text-base">
            {formattedDate}
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="tabs tabs-border">
          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Characters"
            defaultChecked
          />
          <div className="tab-content bg-base-100 py-4">
            {characters ? (
              <ul className="list bg-base-100 rounded-box shadow-md">
                {characters.map((character, index) => {
                  return (
                    <li
                      key={index}
                      className="list-row flex items-center flex-wrap justify-between"
                    >
                      <div>
                        <div>{character.name}</div>
                      </div>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          navigate(`/${character.category}/${character.id}`)
                        }
                      >
                        <MoveRight />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No characters</p>
            )}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Planets"
          />
          <div className="tab-content bg-base-100 py-4">
            {planets ? (
              <ul className="list bg-base-100 rounded-box shadow-md">
                {planets.map((planet, index) => {
                  return (
                    <li
                      key={index}
                      className="list-row flex items-center flex-wrap justify-between"
                    >
                      <div>
                        <div>{planet.name}</div>
                      </div>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          navigate(`/${planet.category}/${planet.id}`)
                        }
                      >
                        <MoveRight />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No planets</p>
            )}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Starships"
          />
          <div className="tab-content bg-base-100 py-4">
            {starships ? (
              <ul className="list bg-base-100 rounded-box shadow-md">
                {starships.map((starship, index) => {
                  return (
                    <li
                      key={index}
                      className="list-row flex items-center flex-wrap justify-between"
                    >
                      <div>
                        <div>{starship.name}</div>
                      </div>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          navigate(`/${starship.category}/${starship.id}`)
                        }
                      >
                        <MoveRight />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No starships</p>
            )}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Vehicles"
          />
          <div className="tab-content bg-base-100 py-4">
            {vehicles ? (
              <ul className="list bg-base-100 rounded-box shadow-md">
                {vehicles.map((vehicle, index) => {
                  return (
                    <li
                      key={index}
                      className="list-row flex items-center flex-wrap justify-between"
                    >
                      <div>
                        <div>{vehicle.name}</div>
                      </div>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          navigate(`/${vehicle.category}/${vehicle.id}`)
                        }
                      >
                        <MoveRight />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No vehicles</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
