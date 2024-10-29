import { Link } from "react-router-dom";
import { IPokemonDetail } from "../interfaces";
import { FaInfoCircle } from "react-icons/fa";
import { colorTypeGradients } from "../utils";
import Image from "./Image";

interface IProps {
  pokemon: IPokemonDetail;
}

const PokemonCard = ({ pokemon }: IProps) => {
  let finalColor;

  if (pokemon.types.length === 2) {
    finalColor = colorTypeGradients(
      pokemon.types[0].type.name,
      pokemon.types[1].type.name,
      pokemon.types.length
    );
  } else {
    finalColor = colorTypeGradients(
      pokemon.types[0].type.name,
      pokemon.types[0].type.name,
      pokemon.types.length
    );
  }

  return (
    <div
      key={pokemon.id}
      className="min-[300px]: border relative flex flex-col items-center p-4 rounded-lg shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
      }}
    >
      <Link to={`pokemon/${pokemon.id}`}>
        <div className="absolute left-0 top-0 p-4 w-10 h-10">#{pokemon.id}</div>
        <div className="absolute right-0 top-0 p-4 w-10 h-10">
          <FaInfoCircle />
        </div>
        <div className="flex justify-center items-center">
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
        <hr className="mb-4" />
        <div>
          <h2 className="text-2xl font-bold">{pokemon.name}</h2>
          <div className="display inline-flex gap-2 mt-2">
            {pokemon.types.map((p) => (
              <p key={p.type.name} className="border w-20 rounded-md">
                {p.type.name}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
