import { MoveRight } from "lucide-react";
import type { allCategoriesType, Film } from "../types";
import { NavLink } from "react-router-dom";
import { categories } from "../App";

export function Tab({
  elements,
  label,
  defaultChecked = false,
}: {
  elements: (typeof allCategoriesType)[];
  label: string;
  defaultChecked?: boolean;
}) {
  const isFilm = (el: typeof allCategoriesType): el is Film => {
    return el.category === categories.films.name;
  };

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
                    <div>{isFilm(element) ? element.title : element.name}</div>
                  </div>
                  <NavLink to={`/${element.category}/${element.id}`}>
                    <button className="btn btn-square btn-ghost">
                      <MoveRight />
                    </button>
                  </NavLink>
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
