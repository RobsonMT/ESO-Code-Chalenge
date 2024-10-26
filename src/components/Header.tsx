import Pokedex from "../assets/pokedex.png";

const Header = () => {
  return (
    <div>
      <img className="w-[220px]" src={Pokedex} alt="pokedex-logo" />
    </div>
  );
};

export default Header;
