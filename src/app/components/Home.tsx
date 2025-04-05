import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Jelly Queue</h1>
        <h3 className="home-subtitle">Schedule your meeting with a single prompt!</h3>
      </div>
    </div>
  );
};

export default Home;

