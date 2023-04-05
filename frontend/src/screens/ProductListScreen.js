import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts , deleteProduct , createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { listStoreDetails } from '../actions/storeActions'
import { listStoreByUser } from '../actions/storeActions'

function ProductListScreen({ match }) {
    let history = useNavigate()

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:lodaingDelete, error:errorDelete , success:successDelete } = productDelete

    const productCreate= useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate , success:successCreate, product:createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const storeByUser = useSelector(state => state.storeByUser)
    const { loading:loadingStore, error:errorStore, store } = storeByUser

    const storeProducts = products.filter(product => product.store === store.name);


    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history('/login')
        }

        if(successCreate){
            history(`/admin/product/edit/${createdProduct._id}/`)
        }else{
            dispatch(listProducts())
            dispatch(listStoreByUser())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }   

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                       <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>


            </Row>

            {lodaingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>AVAILABLE</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {storeProducts.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}DA</td>
                                        <td>{product.category}</td>
                                        
                                        <td>{product.available ? 'true' : 'false'}</td>


                                        <td>
                                            <LinkContainer to={`/admin/product/edit/${product._id}/`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Edit <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default ProductListScreen