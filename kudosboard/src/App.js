import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BoardView from './components/BoardView';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login'
import useToken from './components/useToken';
import './App.css';



const BoardData = [
  { id: 1, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjZpN29wdm45NGpxMWJpNzNrdnQxYjZ0d2l3a2t0MndhaGd2dmFmdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/q4QfjGnFKryzjosj1g/giphy.gif', title: 'Celebration', description: "Won 2024 Champions League", Author: "Blessing", category: "Celebration", upvotes: 0 },
  { id: 2, image: 'https://media.giphy.com/media/fxI1G5PNC5esyNlIUs/giphy.gif?cid=790b7611wxv3hp47gcsfl7rzoatfrpp28jad1ophugyhp57b&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Thank You', description: "Thanks for the Hardwork", Author: "Blessing", category: "Thank You", upvotes: 0 },
  { id: 3, image: 'https://media.giphy.com/media/GFHJXPCoVQEec/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Recent', description: "Recent Cards", Author: "Gideon", category: "Recent", upvotes: 0 },
  { id: 4, image: 'https://media.giphy.com/media/gj0QdZ9FgqGhOBNlFS/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Recent', description: "Hahaha", Author: "Gideon", category: "IRecent", upvotes: 0 },
  { id: 5, image: 'https://media.giphy.com/media/wW95fEq09hOI8/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Inspiration', description: "Motivation", Author: "Gideon", category: "Inspiration", upvotes: 0 },
  { id: 6, image: 'https://media.giphy.com/media/K4M39IfnOAgww/giphy.gif?cid=790b76112buu4hwg5cwjrrfs3ya8mnm3exe97hwdfoznarl2&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Inspiration', description: "Motivation", Author: "Gideon", category: "Inspiration", upvotes: 0 },
  { id: 7, image: 'https://media.giphy.com/media/pgWYgzHX5cWheQUDwo/giphy.gif?cid=ecf05e473npo7b2xafm3tlddyhoantobuknvdmw2j0pgm611&ep=v1_gifs_search&rid=giphy.gif&ct=g', title: 'Celebration', description: "Lets celebrate", Author: "Gideon", category: "Celebration", upvotes: 0 },
  { id: 8, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3h2M2hwNDdnY3NmbDdyem9hdGZycHAyOGphZDFvcGh1Z3locDU3YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sjkl9MJD57BWersvzJ/giphy.gif', title: 'Thank You', description: "Thanks", Author: "Gideon", category: "Thank You", upvotes: 0 },
];

const App = () => {
  const [boards, setBoards] = useState(BoardData);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/boards');
      if (response.ok) {
        throw new Error(`Something went wrong ${response.status}`);
    }
    const data = await response.json();
    setBoards(data);
    } catch (error) {
      console.error('Error fetching boards: ', error);
    }
  };

  const { token, setToken, removeToken } = useToken();


  if (!token) {
    return <Login setToken={setToken} />;
  }

  const handleLogout = () => {
    removeToken();
  };



  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard boards={boards} setBoards={setBoards}/>} />
        <Route path="/board/:id" element={<BoardView boards={boards}/>} />
        <Route
            path="/"
            element={<Dashboard onLogout={handleLogout} />}
          ></Route>
          <Route
            path="/dashboard"
            element={<Dashboard onLogout={handleLogout} />}
          ></Route>
      </Routes>
      <Footer />
    </Router>
  );
};



export default App;
