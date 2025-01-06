import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../assets/img.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import { addProject } from '../../Services/allApi';
import { addResponseContext } from '../context/ContextApi';




function Add() {

  const {addResponse,setAddResponse}=useContext(addResponseContext) 

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({title:"",language:"",github:"",link:"",overview:"",prjctImg:""})
  }
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails]=useState({title:"",language:"",github:"",link:"",overview:"",prjctImg:""})
  console.log(projectDetails)

  const [isValidfile,setIsValidfile]=useState(false);
  const [preview,setPreview]=useState(img)

  useEffect(()=>{
    if(projectDetails.prjctImg.type=="image/png" || projectDetails.prjctImg.type=="image/jpg" || projectDetails.prjctImg.type=="image/jpeg"){
      setIsValidfile(true)
      // temprary store (for only show image)
      setPreview(URL.createObjectURL(projectDetails.prjctImg))

    }else{
      setIsValidfile(false)
      setProjectDetails({...projectDetails,prjctImg:""})
      setPreview(img)
    }
  },[projectDetails.prjctImg])



  // add to db
  const handleAddProject=async()=>{
    const {title,language,github,link,overview,prjctImg}=projectDetails

    if(title && language && github && link && overview && prjctImg){

      // handle image

      // create formdata with object rqbdy

      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("link",link)
      reqBody.append("overview",overview)
      reqBody.append("prjctImg",prjctImg)

      // reqHeader(content-type, token)
      // token for check is user logedin
      const token=sessionStorage.getItem("token")

      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Beror ${token}`
        }


        try{

          const result= await addProject(reqBody,reqHeader)
          console.log(result);
  
          if(result.status==200){
            toast.success("project successfully added")
            handleClose()
            setAddResponse(result.data)

          }else{
            toast.error(result.response.data)
          }
        
  
        }catch(err){
          console.log(err)
        }
      }

     


    }
  }

  return (
    <>
      <div className='mb-2'>
        <Button className='shadow' onClick={handleShow} variant='success'>
          <i class="fa-solid fa-plus"></i> New Project
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>New Projet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={5}>
              <label >
                <input type="file" style={{ display: 'none' }} onChange={(e)=>setProjectDetails({...projectDetails,prjctImg:e.target.files[0]})} />
                <img style={{height:'320px',width:'20rem'}} src={preview} alt="" />
              </label>
              {
                !isValidfile &&
                <div className='text-danger text-center '  style={{fontSize:'14px'}}>
                **upload only the following file type (jpg,jpeg,png)**
              </div>}
            </Col>
            <Col lg={7} className='p-2'>
              <form action="">

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Project title"
                  className="mb-3"
                  style={{fontSize:'13px'}}
                  onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}
                >
                  <Form.Control placeholder="Leave a comment here" />
                </FloatingLabel>


                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Language Used"
                  className="mb-3"
                  style={{fontSize:'13px'}}
                  onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}
                >
                  <Form.Control placeholder="Leave a comment here" />
                </FloatingLabel>


                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Github link"
                  className="mb-3"
                  style={{fontSize:'13px'}}
                  onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}
                >
                  <Form.Control placeholder="Leave a comment here" />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Project Website"
                  className="mb-3"
                  style={{fontSize:'13px'}}
                  onChange={(e)=>setProjectDetails({...projectDetails,link:e.target.value})}
                >
                  <Form.Control placeholder="Leave a comment here" />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Project OverView"
                  className="mb-3"
                  style={{fontSize:'13px'}}
                  onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}
                >
                  <Form.Control placeholder="Leave a comment here" />
                </FloatingLabel>


              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
          <Button onClick={handleAddProject} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add