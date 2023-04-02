import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Image , ListGroup , Button , Card, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

function ProductScreen({match }) {
    let history = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // const loading = productDetails.loading
    // const {loading , product} = productDetails

    useEffect(() =>{
        dispatch(listProductDetails(id))
    }, [dispatch, match])
    // const product = []
    // const loading = null
    // const error = null



    // const { id } = useParams();
    // const product = products.find((p) => String(p._id) === id)

    const addToCartHandler = () => {
        history(`/cart/${id}`)
    }

    
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go back</Link>
        {
            loading ?
                <Loader/>
                : error 
                ? <Message variant='danger'>{error}</Message>
                :(
                    <Row>
        <Col md={3}>
            <Image src={productDetails.product.image} alt={product.name} fluid/>
        </Col>
        <Col md={6}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>{product.store}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h4><Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/></h4>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h4>Price: {product.price}DA</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h4>description: {product.description}</h4>
                </ListGroup.Item>


            </ListGroup>
        </Col>

        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price: </Col>
                            <Col><strong>{product.price} DA</strong> </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Status: </Col>
                            <Col>
                                {product.available == true ? 'In Stock' : 'Out of Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button className='btn btn-lg btn-primary'
                        onClick={addToCartHandler}
                        disabled={product.available == false} 
                        type='button'>
                            Save
                            </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
                )
            
        }

      
    </div>
  )
}

export default ProductScreen
