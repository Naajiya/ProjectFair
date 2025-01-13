import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import avatar from '../assets/avatar.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SERVER_URL from '../../Services/ServerUrl';
import { updateProfile } from '../../Services/allApi';



function Profile() {

    const [userDetails, setUserDetails] = useState({ username: '', email: '', pssword: '', github: '', linkedin: '', Profile: '' })
    const [existingImg, setExistingImg] = useState()
    const [open, setOpen] = useState(false);
    const [preview,setPreview]=useState()


    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            const existingUser = JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({ ...userDetails, username: existingUser?.username, email: existingUser?.email, password: existingUser?.password, github: existingUser?.github, linkedin: existingUser?.linkedin })
            setExistingImg(existingUser?.profile)
        }
    }, [open])

    // when user update profile pic
    useEffect(()=>{
        if(userDetails.profile){
            setPreview(URL.createObjectURL(userDetails.profile))
        }else{
            setPreview("")
        }
    },[userDetails.profile])

    const handleUpdate=async()=>{
        const {username,email,password,github,linkedin,profile}=userDetails

        if(github && linkedin){
            const reqBody = new FormData()

            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview ? reqBody.append("profile",profile):reqBody.append("profile",existingImg)

            const token= sessionStorage.getItem("token")
            if(token){
                const reqHeader ={
                    "Content-Type":preview?"multipart/form-data":"application/json",
                    "Authorization":`Beror ${token}`
                }

                try{

                    const result = await updateProfile(reqBody,reqHeader)
                    console.log(result);

                    if(result.status ==200){
                        setOpen(!open)
                        sessionStorage.setItem("user",JSON.stringify(result.data))
                    }

                }catch(err){
                    console.log(err)
                }

            }
        }
    }

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
                               <label>
                                   <input type='file' onChange={(e) => setUserDetails({ ...userDetails, profile: e.target.files[0] })} style={{display:'none'}}/>
                                        { existingImg=='' ?
                                            <img className='img-fluid' src={preview?preview:avatar} />
                                            :
                                            <img className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`}/>
        
                                        }
                                   
                               </label>
                            </div>
                            <div>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="GitHub Url"
                                    className="mb-3"
                                    style={{ fontSize: '13px' }}

                                >
                                    <Form.Control placeholder="Leave a comment here"
                                        onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })}
                                        value={userDetails.github}
                                    />
                                </FloatingLabel>
                            </div>
                            <div>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="LikedIn Url"
                                    className="mb-3"
                                    style={{ fontSize: '13px' }}
                                >
                                    <Form.Control placeholder="Leave a comment here"
                                        onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })}
                                        value={userDetails?.linkedin}
                                    />
                                </FloatingLabel>
                            </div>
                            <div>
                                <Button onClick={handleUpdate} variant="warning">Update Profile</Button>
                            </div>
                        </div>
                    </div>
                </Collapse>

            </div>
        </>
    )
}

export default Profile