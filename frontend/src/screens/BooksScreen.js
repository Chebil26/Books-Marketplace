import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

function BooksScreen() {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:8000/api/books/')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.log(error));
    }, []);
  
    return (
      <div>
        <h1>Books</h1>
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Description: {book.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default BooksScreen
  