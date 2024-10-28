import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPokemonDetail } from "../interfaces";
import { usePokemon } from "../providers/hooks";
import Image from "../components/Image";

const PokemonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<IPokemonDetail>();

  const { globalPokemons } = usePokemon();

  useEffect(() => {
    const pokemonDetail = globalPokemons.filter((p) => p.id === Number(id));
    setPokemon(pokemonDetail[0]);
  }, []);

  console.log(pokemon);

  return (
    <>
      {pokemon && (
        <div className="flex flex-col">
          <h3 className="text-2xl">#{pokemon.id}</h3>
          <h3 className="text-2xl">{pokemon.name}</h3>
          <div>
            {pokemon.abilities.map((i) => (
              <p key={i.ability.name}>{i.ability.name}</p>
            ))}
          </div>

          <Image
            src={pokemon.sprites.front_default!}
            alt={pokemon.name}
            srcSet="imagem-medio.jpg 2x, imagem-alta.jpg 3x"
            sizes="(max-width: 180px) 20vw"
            width={180}
            height={180}
            objectFit="cover"
            className="rounded-lg bg-cover bg-center"
          />
        </div>
      )}
    </>
  );
};

export default PokemonPage;
