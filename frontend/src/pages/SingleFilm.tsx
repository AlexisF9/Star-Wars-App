import { useNavigate, useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";
import { MoveRight } from "lucide-react";
import { Loader } from "../components/loader";
import type { Character, Film, Planet, Starships, Vehicle } from "../types";
import { useFetchElementsFromUrls } from "../hooks/useFetchElementsFromUrls";

export default function SingleFilm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchSingleElement<Film>(
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
