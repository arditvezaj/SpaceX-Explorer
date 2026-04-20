import type { Metadata } from "next";
import FavoritesClient from "@/components/favorites/FavoritesClient";

export const metadata: Metadata = {
  title: "Favorites — SpaceX Explorer",
  description: "Your saved SpaceX launches",
};

const FavoritesPage = () => {
  return <FavoritesClient />;
};

export default FavoritesPage;
