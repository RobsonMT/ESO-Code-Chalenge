export interface IPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  };
}

export interface IPokemon {
  name: string;
  url: string;
}

export interface IType {
  name: string;
  url: string;
}

export interface IHabitat {
  name: string;
  url: string;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Cry {
  latest: string;
  legacy: string;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

interface Species {
  name: string;
  url: string;
}

interface Sprite {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonDetail {
  abilities: Ability[];
  base_experience: number;
  cries: Cry;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: Species;
  sprites: Sprite;
  stats: Stat[];
  types: Type[];
  weight: number;
}
