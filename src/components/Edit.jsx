import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../assets/img.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SERVER_URL from '../../Services/ServerUrl';
import { toast } from 'react-toastify';
import { editProjectApi } from '../../Services/allApi';
import { editResponseContext } from '../context/ContextApi';




function Edit({ project }) {

  const {editResponse,setEditResponse}=useContext(editResponseContext)

  const [projectDetails, setProjectDetails] = useState({ id: project?._id, title: project?.title, language: project?.language, github: project?.github, link: project?.link, overview: project?.overview, prjctImg: "" })

  const [preview, setPreview] = useState(false)
  const [isValidfile, setIsValidfile] = useState(false);



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  useEffect(() => {
    if (projectDetails.prjctImg.type == "image/png" || projectDetails.prjctImg.type == "image/jpg" || projectDetails.prjctImg.type == "image/jpeg") {
      setIsValidfile(true)
      // temprary store (for only show image)
      setPreview(URL.createObjectURL(projectDetails.prjctImg))

    } else {
      setIsValidfile(false)
      setProjectDetails({ ...projectDetails, prjctImg: "" })
      setPreview('')
    }
  }, [projectDetails.prjctImg])


  const handleUpdate = async() => {
    console.log('clicked')
    const { id, title, language, github, link, overview, prjctImg } = projectDetails
    console.log(id, title, language, github, link, overview, prjctImg);
    
    if (title, language, github, link, overview) {


      const reqBody = new FormData()

      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("link", link)
      reqBody.append("overview", overview)

      preview ? reqBody.append("prjctImg", prjctImg) : reqBody.append("prjctImg", project?.prjctImg)


      const token = sessionStorage.getItem("token")

      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Beror ${token}`
        }

        try{
          const result = await editProjectApi(id,reqBody,reqHeader)
          console.log('result')
          console.log(result.data)
          setEditResponse(result.data)
          handleClose()
  
        }catch(err){
          console.log(err)
        }
      }

     
     

    } else {
      toast.warning("enter all data")
    }
  }


  return (
    <>
      <Button onClick={handleShow} variant="outline-dark"><i class="fa-regular fa-pen-to-square"></i></Button>
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
                <input type="file" style={{ display: 'none' }} onChange={(e) => setProjectDetails({ ...projectDetails, prjctImg: e.target.files[0] })} />
                <img style={{ height: '320px', width: '20rem' }} src={preview ? preview : `${SERVER_URL}/uploads/${project.prjctImg}`} alt="" />
              </label>
              {
                !isValidfile &&
                <div className='text-danger text-center ' style={{ fontSize: '14px' }}>
                  **upload only the following file type (jpg,jpeg,png)**
                </div>}
            </Col>
            <Col lg={7} className='p-2'>
              <form action="">

                <FloatingLabel
                  controlId="floatingTextarea1"
                  label="Project title"
                  className="mb-3"
                  style={{ fontSize: '13px' }}
                  onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}

                >
                  <Form.Control value={projectDetails.title} placeholder="Leave a comment here" />
                </FloatingLabel>


                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Language Used"
                  className="mb-3"
                  style={{ fontSize: '13px' }}
                  onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}

                >
                  <Form.Control value={projectDetails.language} placeholder="Leave a comment here" />
                </FloatingLabel>


                <FloatingLabel
                  controlId="floatingTextarea3"
                  label="Github link"
                  className="mb-3"
                  style={{ fontSize: '13px' }}
                  onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })}

                >
                  <Form.Control value={projectDetails.github} placeholder="Leave a comment here" />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea4"
                  label="Project Website"
                  className="mb-3"
                  style={{ fontSize: '13px' }}
                  onChange={(e) => setProjectDetails({ ...projectDetails, link: e.target.value })}

                >
                  <Form.Control value={projectDetails.link} placeholder="Leave a comment here" />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea5"
                  label="Project OverView"
                  className="mb-3"
                  style={{ fontSize: '13px' }}
                  onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}

                >
                  <Form.Control value={projectDetails.overview} placeholder="Leave a comment here" />
                </FloatingLabel>


              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
          <Button onClick={handleUpdate} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit