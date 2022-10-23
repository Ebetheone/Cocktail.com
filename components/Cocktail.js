import React, { useState } from "react";
import Link from "next/link";
import styles from "./Cocktail.module.css";

export default function Cocktail(data) {
  console.log(data);
  return (
    <div className={styles.con}>
      <Link href={"/cocktail/" + data.data.strDrink}>
        <a className={styles.link}>
          <div className={styles.cocktailList}>
            <div className={styles.cocktail}>
              <img className={styles.img} src={data.data.strDrinkThumb} />
              <h1>{data.data.strDrink}</h1>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
