import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

function StoresScreen() {
    const [stores, setStores] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:8000/api/stores/')
        .then(response => response.json())
        .then(data => setStores(data))
        .catch(error => console.log(error));
    }, []);
  
    return (
      <div>
        <h1>Stores</h1>
        <ul>
          {stores.map(store => (
            <li key={store.id}>
              <h2>{store.name}</h2>

            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default StoresScreen
  