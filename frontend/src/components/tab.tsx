import { MoveRight } from "lucide-react";
import type {
  Character,
  Film,
  Planet,
  Species,
  Starships,
  Vehicle,
} from "../types";
import { useNavigate } from "react-router";

export function Tab({
  elements,
  label,
  defaultChecked = false,
}: {
  elements: (Film | Character | Planet | Species | Starships | Vehicle)[];
  label: string;
  defaultChecked?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <>
      <input
        type="radio"
        name="tabs_infos"
        className="tab"
        aria-label={`${label} (${elements.length})`}
        defaultChecked={defaultChecked}
      />
      <div className="tab-content bg-base-100 py-4">
        {elements?.length > 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md">
            {elements.map((element, index) => {
              return (
                <li
                  key={index}
                  className="list-row flex items-center flex-wrap justify-between"
                >
                  <div>
                    <div>
                      {element.category === "films"
                        ? element.title
                        : element.name}
                    </div>
                  </div>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() =>
                      navigate(`/${element.category}/${element.id}`)
                    }
                  >
                    <MoveRight />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm">No {label.toLowerCase()}</p>
        )}
      </div>
    </>
  );
}
