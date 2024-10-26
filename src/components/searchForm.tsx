import React, { useState } from "react";

interface SearchFormProps {
  onSearch: (type: string, habitat: string, name: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [type, setType] = useState("");
  const [habitat, setHabitat] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(type, habitat, name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Habitat"
        value={habitat}
        onChange={(e) => setHabitat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;
