import { useContext, useState } from "react";
import { FavouritesContext } from "../context/FavouritesContext";
import { Header, FavouriteButton } from "../components/UI";
import styles from "./Favourites.module.css";

export default function Favourites() {
  const { favourites } = useContext(FavouritesContext);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>My Favourites</h1>
      <p className={styles.Subtitle}> Your favourite episodes in one place </p>
    </main>
  );
}
