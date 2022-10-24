import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert , Container} from 'react-bootstrap'
import {signup} from '../firebase'
import {Link} from 'react-router-dom'

function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')

    async function handleSignup(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match!')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            setSuccess('Account created successfully!')

        }
        catch {
            setError('Email already exists!')
            setSuccess('')
        }
        setLoading(false)
    }
    
    
  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
        <div className="w-100" style={{maxWidth: '400px'}}>
        <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {success && <Alert variant='success'>{success}</Alert>}
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSignup}>
                        <Form.Group id='email'>
                            <Form.Label className='text-left'>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id='password' className='mt-3'>
                            <Form.Label className='text-left'>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id='password-confirm' className='mt-3'>
                            <Form.Label className='text-left'>Password Confirmation</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading}  className='w-100 mt-3' type='submit'> Sign Up</Button>

                    </Form>
                </Card.Body>

        </Card>
        <small className='text-right mt-2'>
            Already have an account? <Link to='/'>Sign In</Link>
        </small>

        </div>



        </Container>

        


    </>
  )
}

export default SignUp