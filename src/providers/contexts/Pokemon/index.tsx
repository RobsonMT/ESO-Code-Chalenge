import { useState, createContext, ReactNode } from "react";
import { IPokemon } from "../../../interfaces";
import { api } from "../../../services";

interface IProps {
  children: ReactNode;
}

interface PokemonProviderData {
  loading: boolean;
  globalPokemons: IPokemon[];
  getGlobalPokemons: () => Promise<void>;
}

const PokemonContext = createContext<PokemonProviderData>(
  {} as PokemonProviderData
);

const PokemonProvider = (props: IProps) => {
  return (
    <PokemonContext.Provider
      value={{ loading, globalPokemons, getGlobalPokemons }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
