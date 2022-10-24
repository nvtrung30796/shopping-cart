import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert, Container} from 'react-bootstrap'
import { login} from '../firebase'
import {Link, useNavigate} from 'react-router-dom'


function SignIn() {
  const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value);
            navigate('/content/basket')

        }
        catch {
            setError('Failed to Sign In')
        }
        setLoading(false)
    }
    
  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
    <div className="w-100" style={{maxWidth: '400px'}}>

    <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign In</h2>
               
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group id='email'>
                        <Form.Label className='text-left'>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id='password' className='mt-3'>
                        <Form.Label className='text-left'>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required/>
                    </Form.Group>
                    
                    <Button disabled={loading} className='w-100 mt-3' type='submit'> Sign In</Button>

                </Form>
            </Card.Body>

    </Card>
    <small className='text-right mt-2'>
       Need an account? <Link to='/signup'>Sign up</Link>
    </small>

    </div>

    </Container>

    


</>
  )
}

export default SignIn