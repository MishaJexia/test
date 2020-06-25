import React, { useEffect, useState } from 'react';
import Recipe from '../Recipe';


const Api = () => {
  const APP_ID = "39194b34";
  const APP_KEY = "d9b9ed29c355e57b53807408c9bb0a7a";

  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState('');

  const[query, setQuery] = useState('');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

const updateSearch = e => {
  setSearch(e.target.value);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');

}

  return (
    <div className="App">
      <form onSubmit= {getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="an ingredient, a recipe of your choice ..."/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
          button={recipe.recipe.button}
        />
      ))}
      </div>
    </div>

  );
};

export default Api;