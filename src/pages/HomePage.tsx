import { useEffect } from "react";
import { api } from "../services";
import { usePokemon } from "../providers/hooks";
import { IPokemon } from "../interfaces";

const HomePage = () => {
  const { globalPokemons } = usePokemon();

  const getGlobalPokemons = async () => {
    const response = await api.get("pokemon?limit=100000&offset=0");

    const promises = response.data.results.map(async (pokemon: IPokemon) => {
      const res = await api.get(pokemon.url);
      const data = await res.data;
      return data;
    });
    const results = await Promise.all(promises);
    console.log(results);
  };

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  console.log(globalPokemons);

  return <div>HomePage</div>;
};

export default HomePage;
