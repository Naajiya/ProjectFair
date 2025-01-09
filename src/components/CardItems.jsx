import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import ProjectCate from '../assets/ProjectCatolog.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
// import { getHomeProject } from '../../Services/allApi';
import SERVER_URL from '../../Services/ServerUrl';


function CardItems({ proj }) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <Row>

        <Col lg={4} className='m-2'>
          <Card style={{ width: '16rem' }} onClick={handleShow} className='m-3 shadow'>
            <Card.Img className='img-fluid' style={{ height: '300px' }} variant="top" src={`${SERVER_URL}/uploads/${proj.prjctImg}`} />
            <Card.Body>
              <Card.Title>{proj.title}</Card.Title>
              <Card.Text>

              </Card.Text>
              {/* <Button variant="primary">Go</Button> */}
            </Card.Body>
          </Card>
        </Col>



      </Row>




      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <div >
          <Modal.Header closeButton>
            <Modal.Title className='fw-bold text-success'>{proj.overview}</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <div style={{ height: '200px', width: '320px' }}>
                  <img className='img-fluid' src={`${SERVER_URL}/uploads/${proj.prjctImg}`} alt="" />
                </div>
                <div>
                  <Button className='m-2' variant="primary"><i class="fa-brands fa-git-alt"></i></Button>
                  <Button variant="primary"><i class="fa-solid fa-link"></i></Button>
                </div>

              </Col>
              <Col>
                <h1 className='text-success '>{proj.title}</h1>
                <h5 className='fw-bold' >Language Used:
                  <span className='text-danger'>React,redux toolkit</span>
                </h5>
                <p>
                  <span className='fs-5 fw-bold'>Project Overview : </span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit assumenda nobis ipsa aut doloribus tenetur, itaque nemo, optio aliquid quam laboriosam at cum iste dolor fugiat excepturi eum hic voluptas
                </p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default CardItems