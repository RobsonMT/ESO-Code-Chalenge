import React, { useState } from "react";
import { usePokemon } from "../providers/hooks";

const SearchForm = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [habitat, setHabitat] = useState<string>("");

  const { types, habitats, handleFilter } = usePokemon();

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    handleFilter(e.target.value, habitat, name);
  };

  const handleHabitat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHabitat(e.target.value);
    handleFilter(type, e.target.value, name);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    handleFilter(type, habitat, e.target.value);
  };

  return (
    <form className="flex flex-col md:flex-row gap-4 mb-8 mt-8">
      <select value={type} onChange={handleType} className="p-2 border">
        <option value="">Select the type</option>
        {types?.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      <select value={habitat} onChange={handleHabitat} className="p-2 border">
        <option value="">Select the habitat</option>
        {habitats?.map((a) => (
          <option key={a.name} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleName}
        className="p-2 border"
      />
    </form>
  );
};

export default SearchForm;
