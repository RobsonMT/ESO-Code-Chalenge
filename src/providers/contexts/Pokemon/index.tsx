import { useState, createContext, ReactNode, useCallback } from "react";
import { IPokemon } from "../../../interfaces";
import { api } from "../../../services";

interface IProps {
  children: ReactNode;
}

interface PokemonProviderData {
  loading: boolean;
  nextPage: string;
  previousPage: string | null;
  allPokemons: IPokemon[];
  globalPokemons: IPokemon[];
  getGlobalPokemons: () => Promise<void>;
  getAllPokemons: (url: string) => Promise<void>;
}

const PokemonContext = createContext<PokemonProviderData>(
  {} as PokemonProviderData
);

const PokemonProvider = (props: IProps) => {
  const [allPokemons, setAllPokemons] = useState<IPokemon[]>([]);
  const [globalPokemons, setGlobalPokemons] = useState<IPokemon[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  );
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const getAllPokemons = useCallback(async (url: string) => {
    if (url !== null) {
      const response = await api.get(url);

      console.log(response.data);

      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);

      const promises = response.data.results.map(
        async (pokemon: { url: string }) => {
          const res = await api.get(pokemon.url);
          return await res.data;
        }
      );

      const results = await Promise.all(promises);

      setAllPokemons(results);
      setLoading(false);
    }
  }, []);

  const getGlobalPokemons = async () => {
    const response = await api.get("pokemon?limit=100000&offset=0");

    const promises = response.data.results.map(
      async (pokemon: { url: string }) => {
        const res = await api.get(pokemon.url);
        return await res.data;
      }
    );
    const results = await Promise.all(promises);

    setGlobalPokemons(results);
    setLoading(false);
  };

  return (
    <PokemonContext.Provider
      value={{
        loading,
        nextPage,
        previousPage,
        allPokemons,
        globalPokemons,
        getAllPokemons,
        getGlobalPokemons,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
