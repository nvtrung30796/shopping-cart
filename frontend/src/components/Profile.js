import React from 'react'
import {Button, Card, Container} from 'react-bootstrap'
import {useAuth} from '../firebase'
import {useNavigate} from 'react-router-dom'
function Profile() {
  const currentUser = useAuth()
  const navigate = useNavigate()

  const handleGoToUpdatePage = () => {
     navigate('/content/update-profile')
  }
  

  return (
    <>
<Container className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
    <div className="w-100" style={{maxWidth: '400px'}}>

    <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Profile</h2>
                <strong className='text-left'>Name:</strong>&#8212; <br />
                <strong className='text-left'>Phone:</strong>&#8212;  <br />
                <strong className='text-left'>DOB:</strong> &#8212; <br />
                <strong className='text-left'>Email:</strong> {currentUser?.email}
                <Button onClick={handleGoToUpdatePage} className='btn btn-primary w-100 mt-3' to='update-profile'>Update Profile</Button>
            </Card.Body>
    </Card>
    </div>

    </Container>

    </>
  )
}

export default Profile