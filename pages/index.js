import React, { useState, useEffect } from "react";
import axios from "axios";
import Cocktail from "../components/Cocktail.js";

import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
export default function Home() {
  const [myCocktailData, setMyCocktailData] = useState([]);
  const [value, setValue] = useState();
  const [filter, setFilter] = useState();
let submit = false;
    

    
    
       useEffect(() => {
          if(filter == "Letter"){
       axios
       .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`)
      .then((response) => {
       setMyCocktailData(response.data.drinks);
       });
      }
       else if(filter=="Name"){
        axios
       .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => {
       setMyCocktailData(response.data.drinks);
       });
      }
      else if(filter=="Ingredient"){
        axios
       .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${value}`)
      .then((response) => {
       setMyCocktailData(response.data.drinks);
       });
      }
      else if(filter=="Random"){
        axios
       .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then((response) => {
       setMyCocktailData(response.data.drinks);
       });
      }
      else{
         axios
       .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=ad`)
      .then((response) => {
       setMyCocktailData(response.data.drinks);
       });
      }
    }, [value])

    
  function handleChange(event){
    const name = event.target.value;
 
     setValue(name); 

   
  }
  function handlerChange(event){
    const type = event.target.value;
    setFilter(type);
  }
  function handleSubmit(event){
   event.preventDefault();

    
  }
  return (
    <body className={styles.body}>
      <div className={styles.header}>
         <a className={styles.link} href="/">Cocktail bla2 tseg com</a>
        <div className={styles.search}>
          <select className={styles.dropdown} onChange={handlerChange} selected> fdgfd
          <option value="Filter">Filter</option>
          <option value="Name">Name</option>
          <option value="Letter">First letter</option>
          <option value="Ingredient">Ingredient</option>
          <option value="Random">Random</option>
        </select>
        <input type="text" className={styles.input} onChange={handleChange}/>
        <button onClick={handleSubmit}><FontAwesomeIcon icon={faSearch} className={styles.icons} /></button>
        
        </div>
        
      </div>
      <div className={styles.container}>
        
      <div className={styles.up}>
        <div className={styles.title}>
          Cocktail film  
          үзүүлж байна...
        </div>
      
        <img className={styles.headerimg} src="https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG.png"/>
      </div>
      
      <div className={styles.cocktailList}>
        {myCocktailData?.map(function (item, id) {
        return <Cocktail key={id} data={item} />;
      })}  
      </div>
        
     
    </div>
    </body>
    
  );
}
