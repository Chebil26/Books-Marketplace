import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate,useLocation  } from 'react-router-dom'

function SearchBox() {
    let history = useNavigate()
    const location = useLocation();

    const [keyword, setKeyword] = useState('')    
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}`)
            
        }else{
            history(location.pathname)
        }
    }
    return (
        <Form onSubmit={submitHandler}  className='d-flex '>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                search  <i className="fas fa-search"></i>
            </Button>
        </Form>
    )
}



export default SearchBox
