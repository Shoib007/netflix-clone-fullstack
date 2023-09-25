import { useState, useEffect, useContext } from "react";
import Billboard from "./components/Billboard"
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import { AuthContext } from "./Contexts/AuthContext";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profiles from './components/Profile'
import Watch from "./components/Watch";
import Auth from "./components/LoginRegister";
import Protected from "./components/ProtectedRoute";

function App() {
  const [Movies, setMovie] = useState([{}]);
  const { favoriteMovies, isAuthenticated } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/allmovies`)
      .then((res) => {
        console.log("From Movie List")
        setMovie(res.data);
      })
      .catch((err) => console.log(err.message))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/profile' element={<Profiles />} />
        <Route path='/watch/:id' element={<Watch />} />
        <Route exact path='/auth' element={<Auth />} />

        <Route exact path='/' element={
          <Protected isLoggedIn={isAuthenticated}>
            <Navbar />
            <Billboard />
            <MovieList title={"Trending Movies"} Movies={Movies} />
            <MovieList title={"Favorite Movies"} Movies={favoriteMovies} />
          </Protected>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
