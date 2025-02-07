import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    fetchFurniture();
  }, []);

  const fetchFurniture = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/furniture');
      setFurniture(response.data);
    } catch (error) {
      console.error('Error fetching furniture:', error);
    }
  };

  return (
    <div className="App">
      <h1>Furniture Shop</h1>
    </div>
  );
}

export default App;