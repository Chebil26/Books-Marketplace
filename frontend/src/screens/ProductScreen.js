import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Image ,Form, ListGroup , Button , Card, ListGroupItem, Badge, FormGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen({match }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    let history = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading:loadingProductReview, error:errorProductReview, success:successProductReview } = productReviewCreate


    useEffect(() =>{
        if (successProductReview){
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(id))
    }, [dispatch, match, successProductReview])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id, {
                rating,
                comment
            }
        ))
    }



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
                    <div>
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
                    <p>description: {product.description}</p>
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
                            {/* <Col>
                                {product.available == true ? 'In Stock' : 'Out of Stock'}
                            </Col> */}
                            <Badge className='danger' style={{height: '50px'}}>
                                <h5>{product.available ? 'Available' : 'unavailable'}</h5>
                            </Badge>
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


                    <Row>
                        <Col md={6}>
                            <h4>Reviews</h4>
                            {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                            
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <storng>{review.name}</storng>
                                        <Rating value={review.rating} color={'#f8e825'}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    <h4>Write a review</h4>
                                    {loadingProductReview && <Loader/>}
                                    {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >

                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='5'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                >
                                                </Form.Control>
                                            </Form.Group>

                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='success'
                                            >
                                                Submit
                                            </Button>

                                        </Form>
                                    ) : (
                                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                    )}
                                </ListGroup.Item>


                            </ListGroup>
                        </Col>
                    </Row>
                    </div>
                )
            
        }

      
    </div>
  )
}

export default ProductScreen


// const products = await axios.get(`/api/products/store/${store.id}/`);