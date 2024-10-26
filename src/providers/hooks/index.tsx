import { useContext } from "react";
import { PokemonContext } from "../contexts/Pokemon";

const usePokemon = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemon must be used within an PokemonProvider");
  }

  return context;
};

export { usePokemon };
