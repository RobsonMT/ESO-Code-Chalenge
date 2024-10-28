import React, { useState } from "react";
import { usePokemon } from "../providers/hooks";

// interface SearchFormProps {
//   onSearch: (type: string, ability: string, name: string) => void;
// }

const SearchForm = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [habitat, setHabitat] = useState<string>("");

  const { types, habitats, handleFilter } = usePokemon();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter(type, habitat, name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-4 mb-8 mt-8">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border"
      >
        <option value="">Select the type</option>
        {types?.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      <select
        value={habitat}
        onChange={(e) => setHabitat(e.target.value)}
        className="p-2 border"
      >
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
        onChange={(e) => setName(e.target.value)}
        className="p-2 border"
      />

      <button type="submit" className="bg-blue-500 text-white p-2">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
