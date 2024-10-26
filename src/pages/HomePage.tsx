import { useEffect } from "react";
import { usePokemon } from "../providers/hooks";
import Header from "../components/Header";
import Image from "../components/Imagen";
import { FaInfoCircle } from "react-icons/fa";

const HomePage = () => {
  const { loading, globalPokemons, getGlobalPokemons } = usePokemon();

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center container">
      <Header />
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <p>Carregando...</p>
          <img
            src="https://i.gifer.com/VgI.gif"
            alt="loading-gif"
            className="w-[200px]"
          ></img>
        </div>
      ) : (
        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-4">
          {globalPokemons.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="border relative flex flex-col items-center p-4 rounded-lg shadow-lg"
              >
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
                    className="rounded-lg border"
                  />
                </div>

                <div>
                  <h2 className="text-xl">{pokemon.name}</h2>
                  <div>
                    {pokemon.types.map((p) => (
                      <p key={p.type.name}>{p.type.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
