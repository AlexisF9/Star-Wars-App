export interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
  [key: string]: any;
}

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  [key: string]: any;
}