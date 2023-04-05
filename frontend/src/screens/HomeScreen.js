import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useLocation  } from 'react-router-dom'

import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'


function HomeScreen() {

  let history = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList

  let keyword = location.search
  console.log(keyword)
  useEffect(() =>{
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

 
  return (
    <div>
      {!keyword && <ProductCarousel/> }
      
      <h1>Latest Books</h1>
      {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
              </Col>
            ))}
          </Row>
      }
      
    </div>
  )
}

export default HomeScreen
