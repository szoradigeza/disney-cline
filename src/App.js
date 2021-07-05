import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Detail from './components/Detail';
import Login from './components/Login';
import db from './firebase'
import { useDispatch } from 'react-redux';
import { setMovies } from './features/movie/movieSlice';



function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      let tempMovies = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      dispatch(setMovies(tempMovies));
    })
  }, [])


  return (
    <div className="App">
    <Router>
      <Header />
      <Switch>
      <Route path="/login">
          <Login />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
