export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}
