export const allCategoriesType = {} as
  | Film
  | Character
  | Planet
  | Species
  | Vehicle
  | Starships;

export interface Film {
    title: string,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    characters: string[],
    planets: string[],
    starships: string[],
    vehicles: string[],
    url: string,
    category: 'films',
    id: string
}

export interface Character {
    name: string,
    height: string,
    mass: string,
    homeworld: string,
    films: string[],
    species: string[],
    vehicles: string[],
    starships: string[],
    url: string,
    category: 'people',
    id: string
}

export interface Planet {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: string[],
    films: string[],
    url: string,
    category: 'planets',
    id: string
}

export interface Species {
    name: string,
    average_height: string,
    homeworld: string,
    language: string,
    people: string[],
    films: string[],
    url: string,
    category: 'species',
    id: string
}

interface GlobalVehicle {
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    max_atmosphering_speed: string,
    crew: string,
    passengers: string,
    cargo_capacity: string,
    consumables: string,
    pilots: string[],
    films: string[],
    url: string,
    id: string
}

export interface Vehicle extends GlobalVehicle {
    vehicle_class: string,
    category: 'vehicles',
}

export interface Starships extends GlobalVehicle {
    hyperdrive_rating: string,
    starship_class: string,
    category: 'starships',
}