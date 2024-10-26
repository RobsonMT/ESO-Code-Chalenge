import Pokedex from "../assets/pokedex.png";

const Header = () => {
  return (
    <div>
      <img
        className="image"
        src={Pokedex}
        alt="pokedex-logo"
        style={{ width: "280px" }}
      />
    </div>
  );
};

export default Header;
