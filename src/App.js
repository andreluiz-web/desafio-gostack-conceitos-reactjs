import React, { useState, useEffect } from "react";
import "./styles.css";
import api from './services/api';


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('/repositories').then(response => {
          setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {

      const response = await api.post('/repositories', {
          title: `new repository ${Date.now()}`,
          url: 'https://qualquer@hotmail.com',
          techs: [
            'nodejs',
            'reactjs',
            'reactnative'
          ]
      })

      const newRepository = response.data;

      setRepositories([...repositories, newRepository]);
  }
  
  async function handleRemoveRepository(id) {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter(
        item => item.id !== id
      ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(item => <li key={item.id}>
      {item.title}
      <button onClick={() => handleRemoveRepository(item.id)}>
        Remover
      </button>      
      </li>)}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
