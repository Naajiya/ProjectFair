import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import avatar from '../assets/avatar.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';



function Profile() {

    const [userDetails,setUserDetails]=useState({username:'',email:'',pssword:'',github:'',linkedin:'',Profile:''})
    const [existingImg,setExistingImg]=useState()
    const [open, setOpen] = useState(false);


    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            const existingUser = JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({...userDetails,username:existingUser?.username, email:existingUser?.email, password:existingUser?.password, github:existingUser?.github, linkedin:existingUser?.linkedin})
            setExistingImg(existingUser?.profile)
        }
    },[])

    return (
        <>
            <div className='border m-2 p-3'>
                <div className='d-flex justify-content-between'>
                    <h3>Profile</h3>
                    <div className='mt-1'>
                        <Button variant="" size="sm" onClick={() => setOpen(!open)}>
                            <i class="fa-solid fa-chevron-down"></i>
                        </Button>

                    </div>
                </div>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <div style={{ height: '80%', width: '80%' }} className='text-center'>
                                <img className='img-fluid' src={avatar} alt="" />
                            </div>
                            <div>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="GitHub Url"
                                    className="mb-3"
                                    style={{ fontSize: '13px' }}
                                >
                                    <Form.Control placeholder="Leave a comment here" />
                                </FloatingLabel>
                            </div>
                            <div>
                            <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="LikedIn Url"
                                    className="mb-3"
                                    style={{ fontSize: '13px' }}
                                >
                                    <Form.Control placeholder="Leave a comment here" />
                                </FloatingLabel>
                            </div>
                            <div>
                            <Button variant="warning">Update Profile</Button>
                            </div>
                        </div>
                    </div>
                </Collapse>

            </div>
        </>
    )
}

export default Profile