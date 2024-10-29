import { useEffect } from "react";
import { usePokemon } from "../providers/hooks";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IPokemonDetail } from "../interfaces";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import PokemonCard from "../components/PokemonCard";

const HomePage = () => {
  const {
    loading,
    searching,
    currentPage,
    setCurrentPage,
    globalPokemons,
    filteredPokemons,
    getGlobalPokemons,
  } = usePokemon();

  const getPaginatedItems = (page: number, items: IPokemonDetail[]) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return items.slice(startIndex, endIndex);
  };

  const paginatedGlobalItems = getPaginatedItems(currentPage, globalPokemons);
  const paginatedFilteredItems = getPaginatedItems(
    currentPage,
    filteredPokemons
  );

  const totalGlobalItemsPages = Math.ceil(globalPokemons.length / 10);
  const totalFilteredItemsPages = Math.ceil(filteredPokemons.length / 10);

  const handleNextPage = () => {
    if (filteredPokemons.length) {
      if (currentPage < totalFilteredItemsPages) {
        setCurrentPage(currentPage + 1);
      } else {
        return false;
      }
    }
    if (currentPage < totalGlobalItemsPages) {
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <p>Carregando...</p>
        <img
          src="https://i.gifer.com/VgI.gif"
          alt="loading-gif"
          className="w-[200px]"
        ></img>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center container">
      <Header />
      <SearchForm />
      {Boolean(filteredPokemons.length) && searching && (
        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-4">
          {paginatedFilteredItems.map((pokemon) => {
            return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      )}

      {searching && Boolean(filteredPokemons.length === 0) && (
        <div>No pokemon found for search</div>
      )}

      {!searching && (
        <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-4">
          {paginatedGlobalItems.map((pokemon) => {
            return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      )}

      <div className="container flex flex-row justify-between w-full mt-4">
        <button
          className="border p-2 rounded-lg shadow-lg inline-flex justify-center align-baseline"
          onClick={handlePrevPage}
        >
          <FaAngleLeft className="w-6 h-6" />
          Previous
        </button>
        <div>
          Page {currentPage} of{" "}
          {searching && filteredPokemons.length && totalFilteredItemsPages}
          {!searching && totalGlobalItemsPages}
        </div>
        <button
          className="border p-2 rounded-lg shadow-lg inline-flex justify-center align-baseline"
          onClick={handleNextPage}
        >
          Next <FaAngleRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
