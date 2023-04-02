import { Container } from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

import BooksScreen from './screens/BooksScreen'
import BookDetailScreen from './screens/BookDetailScreen'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

import StoresScreen from './screens/StoresScreen'





function App() {
  return (
    <Router>
      
      <Header />
      
      <main>
        <Container>
        <Routes>
          <Route path='/' Component={HomeScreen} exact/>
          <Route path='/login' Component={LoginScreen} />
          <Route path='/register' Component={RegisterScreen} />
          <Route path='/profile' Component={ProfileScreen} />
          
          <Route path='/product/:id' Component={ProductScreen} />

          <Route path='/cart/:id?' Component={CartScreen} />

          <Route path='/books' Component={BooksScreen} />
          <Route path='/books/:id' Component={BookDetailScreen} />

          <Route path='/admin/productlist' Component={ProductListScreen} />
          <Route path='/admin/product/edit/:id/' Component={ProductEditScreen} />

          <Route path='/stores' Component={StoresScreen} />
        </Routes>
        </Container>
      </main>
      
      <Footer />
      
    </Router>
  );
}

export default App;
