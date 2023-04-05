import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listStoreDetails } from '../actions/storeActions';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';


function StoreDetailScreen(props) {
  // const [store, setStore] = useState(null);
  // const [productList, setProductList] = useState(null);
  const { id } = useParams()
  const dispatch = useDispatch()

  const storeDetails = useSelector(state => state.storeDetails)
  const { error, loading, store } = storeDetails

  const productList = useSelector(state => state.productList)
  const { loading:loadingProducts, error:errorProducts , products } = productList


  useEffect(() => {


            dispatch(listStoreDetails(id))
            dispatch(listProducts())

}, [dispatch])

const storeProducts = products.filter(product => product.store === store.name);





  if (!store) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h1>{store.name}</h1>
      
      <p>{store.wilaya}</p>
      <p>{store.id}</p>

      <Row>
            {storeProducts.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
              </Col>
            ))}
          </Row>


    </div>
  );
}

export default StoreDetailScreen;