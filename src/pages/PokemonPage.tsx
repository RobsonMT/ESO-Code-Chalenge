import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPokemonDetail } from "../interfaces";
import { usePokemon } from "../providers/hooks";
import Image from "../components/Image";
import { colorTypeGradients } from "../utils";

const PokemonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<IPokemonDetail>();

  const { globalPokemons } = usePokemon();

  let finalColor;

  if (pokemon?.types.length === 2) {
    finalColor = colorTypeGradients(
      pokemon?.types[0].type.name,
      pokemon?.types[1].type.name,
      pokemon?.types.length
    );
  } else {
    finalColor = colorTypeGradients(
      pokemon?.types[0].type.name as string,
      pokemon?.types[0].type.name as string,
      pokemon?.types.length as number
    );
  }

  useEffect(() => {
    const pokemonDetail = globalPokemons.filter((p) => p.id === Number(id));
    setPokemon(pokemonDetail[0]);
  }, []);

  console.log(pokemon);

  return (
    <>
      {pokemon && (
        <div
          className="p-6 flex flex-col justify-center items-center rounded-lg"
          style={{
            background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
          }}
        >
          <h3 className="text-2xl">#{pokemon.id}</h3>

          <Image
            src={pokemon.sprites.front_default!}
            alt={pokemon.name}
            srcSet="imagem-medio.jpg 2x, imagem-alta.jpg 3x"
            sizes="(max-width: 280px) 20vw"
            width={280}
            height={280}
            objectFit="cover"
            className="rounded-lg bg-cover bg-center"
          />

          <hr className="text-zinc-50 mb-4 w-48" />

          <h3 className="text-3xl font-bold">{pokemon.name}</h3>

          <div className="display inline-flex gap-2 mt-2">
            {pokemon.types.map((t) => {
              return (
                <p key={t.type.name} className="border w-20 rounded-md">
                  {t.type.name}
                </p>
              );
            })}
          </div>

          <div className="m-2 flex flex-col">
            <div className="inline-flex gap-2">
              <p className="text-md">Height </p> {pokemon.height}
            </div>
            <div className="inline-flex gap-2">
              <p className="text-md">Weight </p> {pokemon.weight}
            </div>
          </div>

          <div>
            <h3 className="text-2xl">abilities</h3>
            {pokemon.abilities.map((i) => (
              <p key={i.ability.name}>{i.ability.name}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonPage;
