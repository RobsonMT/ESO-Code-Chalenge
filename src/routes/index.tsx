import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PokemonPage from "../pages/PokemonPage";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
