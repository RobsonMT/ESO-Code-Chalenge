import { ReactNode } from "react";

/*PROVIDERS*/
import { PokemonProvider } from "./contexts/Pokemon";

interface IProps {
  children: ReactNode;
}

const AppProviders = (props: IProps) => {
  return <PokemonProvider>{props.children}</PokemonProvider>;
};

export default AppProviders;
