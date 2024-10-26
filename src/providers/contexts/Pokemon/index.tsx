import { useState, createContext, ReactNode } from "react";
import { IPokemon } from "../../../interfaces";

interface IProps {
  children: ReactNode;
}

interface PokemonProviderData {
  globalPokemons: IPokemon[];
  getGlobalPokemons: () => Promise<void>;
}

const PokemonContext = createContext<PokemonProviderData>(
  {} as PokemonProviderData
);

const PokemonProvider = (props: IProps) => {
  const [globalPokemons, setGlobalPokemons] = useState<IPokemon[]>([]);
  const [offset] = useState(0);

  const [loading, setLoading] = useState(true);

  console.log(loading, offset);

  const getGlobalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon: IPokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);

    console.log(results);

    setGlobalPokemons(results);
    setLoading(false);
  };

  return (
    <PokemonContext.Provider value={{ globalPokemons, getGlobalPokemons }}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
