import Logo from "../assets/pokedex.png";

const Header = () => {
  return (
    <div>
      <img className="w-[220px]" src={Logo} alt="pokedex-logo" />
    </div>
  );
};

export default Header;
