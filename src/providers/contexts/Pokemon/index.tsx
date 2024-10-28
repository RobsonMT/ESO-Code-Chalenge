import {
  useState,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { IHabitat, IPokemonDetail, IType } from "../../../interfaces";
import { api } from "../../../services";

interface IProps {
  children: ReactNode;
}

interface PokemonProviderData {
  loading: boolean;
  globalPokemons: IPokemonDetail[];
  filteredPokemons: IPokemonDetail[];
  types: IType[];
  habitats: IHabitat[];
  getGlobalPokemons: () => Promise<void>;
  handleFilter: (type: string, habitat: string, name: string) => void;
}

const PokemonContext = createContext<PokemonProviderData>(
  {} as PokemonProviderData
);

const PokemonProvider = (props: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [globalPokemons, setGlobalPokemons] = useState<IPokemonDetail[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<IPokemonDetail[]>(
    []
  );

  const [types, setTypes] = useState<IType[]>([]);
  const [habitats, setHabitats] = useState<IHabitat[]>([]);

  const getGlobalPokemons = useCallback(async () => {
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
  }, []);

  const fetchAllTypes = useCallback(async () => {
    const response = await api.get("type?offset=0&limit=100");
    setTypes(response.data.results);
  }, []);

  const fetchAllHabitat = useCallback(async () => {
    const response = await api.get("pokemon-habitat");
    setHabitats(response.data.results);
  }, []);

  const handleFilter = async (type: string, habitat: string, name: string) => {
    if (type) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((x) => x.type.name).includes(type)
      );
      setFilteredPokemons(filteredResults);
    }
    if (name) {
      const filteredResults = globalPokemons.filter((pokemon) =>
        pokemon.name.includes(name)
      );
      setFilteredPokemons(filteredResults);
    }
    if (habitat) {
      const response = await api.get(`pokemon-habitat/${habitat}`);

      const promises = response.data.pokemon_species.map(
        async (pokemon: { url: string }) => {
          const res = await api.get(
            pokemon.url.replace("pokemon-species", "pokemon")
          );
          return await res.data;
        }
      );
      const results = await Promise.all(promises);
      setFilteredPokemons(results);
    }
    if (type && name) {
      const filteredTypeResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((x) => x.type.name).includes(type)
      );
      const filteredResults = filteredTypeResults.filter((pokemon) =>
        pokemon.name.includes(name)
      );
      setFilteredPokemons(filteredResults);
    }
    if (type && habitat) {
      const response = await api.get(`pokemon-habitat/${habitat}`);

      const promises = response.data.pokemon_species.map(
        async (pokemon: { url: string }) => {
          const res = await api.get(
            pokemon.url.replace("pokemon-species", "pokemon")
          );
          return await res.data;
        }
      );
      const results = await Promise.all(promises);

      const filteredResults = results.filter((pokemon) =>
        pokemon.types
          .map((x: { type: { name: string } }) => x.type.name)
          .includes(type)
      );

      setFilteredPokemons(filteredResults);
    }
    if (name && habitat) {
      const response = await api.get(`pokemon-habitat/${habitat}`);

      const promises = response.data.pokemon_species.map(
        async (pokemon: { url: string }) => {
          const res = await api.get(
            pokemon.url.replace("pokemon-species", "pokemon")
          );
          return await res.data;
        }
      );
      const results = await Promise.all(promises);

      const filteredResults = results.filter((pokemon) =>
        pokemon.name.includes(name)
      );

      setFilteredPokemons(filteredResults);
    }
    if (type && name && habitat) {
      const response = await api.get(`pokemon-habitat/${habitat}`);

      const promises = response.data.pokemon_species.map(
        async (pokemon: { url: string }) => {
          const res = await api.get(
            pokemon.url.replace("pokemon-species", "pokemon")
          );
          return await res.data;
        }
      );
      const results = await Promise.all(promises);

      const filteredTypeResults = results.filter((pokemon) =>
        pokemon.types
          .map((x: { type: { name: string } }) => x.type.name)
          .includes(type)
      );

      const filteredResults = filteredTypeResults.filter((pokemon) =>
        pokemon.name.includes(name)
      );

      setFilteredPokemons(filteredResults);
    }
    if (!type && !habitat && !name) {
      setFilteredPokemons(globalPokemons);
    }
  };

  useEffect(() => {
    fetchAllTypes();
    fetchAllHabitat();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        loading,
        globalPokemons,
        types,
        habitats,
        filteredPokemons,
        getGlobalPokemons,
        handleFilter,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
