import React from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import {nanoid} from "nanoid";

const API_URL="https://www.omdbapi.com?apikey=4b272b37";
//const API_URL2="http://www.omdbapi.com/?i=tt3896198&apikey=5a5a414e";

const App = () => {
    const[movies,setMovies]=React.useState();
    const[searchTerm,setSearchTerm]=React.useState();
    
    const searchMovies=async(title)=>{
      const response =await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    }

  React.useEffect(()=>{
    searchMovies('Avengers');

  },[]);

  return (
  <div className='app'>
      <h1>Movie Land</h1>
        <div className='search'>
          <input
            placeholder='Search For Movies'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <img 
            src={SearchIcon}
            alt="Search"
            onClick={()=>searchMovies(searchTerm)}
          />
        </div>
        {
          movies?.length>0
          ?(
              <div className='container'>
               {movies.map((movie)=>
               <MovieCard movie={movie}
               key={nanoid()}/>)}
              </div>
          ):(
              <div className='empty'>
              <h2>No Movies Found</h2>
              </div>
            )
        }
     
  </div>
    );   
}

export default App;
