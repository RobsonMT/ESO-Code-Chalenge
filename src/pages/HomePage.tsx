import { useEffect, useState } from "react";
import { usePokemon } from "../providers/hooks";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineNavigateNext, MdOutlineSkipPrevious } from "react-icons/md";
import Header from "../components/Header";
import Image from "../components/Image";
import SearchForm from "../components/searchForm";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { loading, globalPokemons, filteredPokemons, getGlobalPokemons } =
    usePokemon();

  const getPaginatedItems = (page: number) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return globalPokemons.slice(startIndex, endIndex);
  };

  const paginatedItems = getPaginatedItems(currentPage);

  const totalPages = Math.ceil(globalPokemons.length / 10);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center container">
      <Header />
      <SearchForm />
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <p>Carregando...</p>
          <img
            src="https://i.gifer.com/VgI.gif"
            alt="loading-gif"
            className="w-[200px]"
          ></img>
        </div>
      ) : (
        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-4">
          {filteredPokemons.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="border relative flex flex-col items-center p-4 rounded-lg shadow-lg"
              >
                <Link to={`pokemon/${pokemon.id}`}>
                  <div className="absolute left-0 top-0 p-4 w-10 h-10">
                    #{pokemon.id}
                  </div>
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

                  <div>
                    <h2 className="text-xl">{pokemon.name}</h2>
                    <div>
                      {pokemon.types.map((p) => (
                        <p key={p.type.name}>{p.type.name}</p>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div className="container flex justify-between w-full mt-4">
        <button
          className="border p-2 rounded-lg shadow-lg inline-flex justify-center align-baseline"
          onClick={handlePrevPage}
        >
          <MdOutlineSkipPrevious className="w-6 h-6" />
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          className="border p-2 rounded-lg shadow-lg inline-flex justify-center align-baseline"
          onClick={handleNextPage}
        >
          Next <MdOutlineNavigateNext className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
