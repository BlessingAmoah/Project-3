import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BoardView from './components/BoardView';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';


const BoardData = [
  { id: 1, image: 'https://www.codepath.org/hubfs/homepage_ftl.png', title: 'Celebration', description: "Celebrating Success", Author: "Jane Doe", category: "Celebration", upvotes: 0 },
  { id: 2, image: 'https://www.codepath.org/hubfs/homepage_ftl.png', title: 'Thank You', description: "Thanks for the Hardwork", Author: "Blessing", category: "Thank You", upvotes: 0 },
  { id: 3, image: 'https://www.codepath.org/hubfs/homepage_ftl.png', title: 'Inspiration', description: "Motivation for the day", Author: "Jane Doe", category: "Inspirational", upvotes: 0 },
  { id: 4, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmJ1dTRod2c1Y3dqcnJmczN5YThtbm0zZXhlOTdod2Rmb3puYXJsMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SggILpMXO7Xt6/giphy.gif', title: 'Recent', description: "Recent Cards", Author: "Gideon", category: "Recent", upvotes: 0 },
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


  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard  boards={boards} setBoards={setBoards}/>} />
        <Route path="/board/:id" element={<BoardView boards={boards}/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
