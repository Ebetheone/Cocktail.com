import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./style.module.css";

export default function Home() {
  const router = useRouter();
  const { slug } = router.query;
  const [singleCocktail, setSingleCocktail] = useState(null);
  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + slug)
    .then((response: any) => {
      setSingleCocktail(response.data);
      console.log(singleCocktail);
    });

  return (
    <body className={styles.body}>
      <div className={styles.header}>
        <a className={styles.link} href="/">
          Cocktail bla2 tseg com
        </a>
      </div>
      <div className={styles.container}>
        <title>Cocktail information</title>

        <h1 className={styles.title}>How to make beautiful {slug} cocktail</h1>
        <p>Оруулсан: {singleCocktail?.drinks?.[0]?.dateModified}</p>
        <div className={styles.singleCocktail}>
          <p>
            <img src={singleCocktail?.drinks?.[0]?.strDrinkThumb} />
          </p>
          <div className={styles.text}>
            <p className={styles.subtitle}>ID:</p>
            <p>{singleCocktail?.drinks?.[0]?.idDrink}</p>
            <p className={styles.subtitle}>Category:</p>
            <p>{singleCocktail?.drinks?.[0]?.strCategory}</p>
            <div className={styles.instructions}>
              <div>
                <p className={styles.subtitle}>Ingredient:</p>
                <ul>
                  <li>{singleCocktail?.drinks?.[0]?.strIngredient1}</li>
                  <li>{singleCocktail?.drinks?.[0]?.strIngredient2}</li>
                  <li>{singleCocktail?.drinks?.[0]?.strIngredient3}</li>
                </ul>
              </div>
              <div>
                <p className={styles.subtitle}>Measure:</p>
                <ul>
                  <li>{singleCocktail?.drinks?.[0]?.strMeasure1}</li>
                  <li>{singleCocktail?.drinks?.[0]?.strMeasure2}</li>
                  <li>{singleCocktail?.drinks?.[0]?.strMeasure3}</li>
                </ul>
              </div>
            </div>

            <p className={styles.subtitle}>Instructions:</p>
            <p>{singleCocktail?.drinks?.[0]?.strInstructions}</p>
            <p className={styles.subtitle}>Creative Commons Confirmed:</p>
            <p>{singleCocktail?.drinks?.[0]?.strCreativeCommonsConfirmed}</p>
          </div>
          <div></div>
        </div>
      </div>
    </body>
  );
}
