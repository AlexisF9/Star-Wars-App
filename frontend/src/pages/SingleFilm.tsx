import { useParams } from "react-router";
import { useFetchSingleElement } from "../hooks/useFetchSingleElement";

export default function SingleFilm() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleElement(
    "films",
    id as string
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error</p>;
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(data.release_date));

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
      <div>
        {data.characters.map((item: any, index: number) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
    </div>
  );
}
