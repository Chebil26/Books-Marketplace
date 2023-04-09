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
import SelectProduct from '../components/SelectProduct'
import Paginate from '../components/Paginate'

function HomeScreen() {

  let history = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages } = productList

  let keyword = location.search
  useEffect(() =>{
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

 
  return (
    <div>
      
      {!keyword && <ProductCarousel/> }
      
      <h1>Latest Books</h1>

      
      {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : 

          <div>
          <Row   >
            {products.map(product => (
              // sm={12} md={6} lg={4} xl={3}
              <Col key={product._id} >
                  <Product product={product} />
              </Col>
            ))}

          </Row>
          <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
      }
      
    </div>
  )
}

export default HomeScreen
