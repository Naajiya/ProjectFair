import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import projectImg from '../assets/project.png'
import CardItems from '../components/CardItems';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { getHomeProject } from '../../Services/allApi';
import { toast } from 'react-toastify';






function Home() {

  const navigate = useNavigate()

  const [homeProj, setHomeProj] = useState()
  console.log(homeProj)

  useEffect(() => {
    getHomeProjects()
  }, [])

  const getHomeProjects = async () => {
    try {
      const res = await getHomeProject()

      if (res.status == 200) {
        setHomeProj(res.data)
      }

      // console.log(res)
    } catch (err) {
      console.log(err)
    }
  }


  const handleProjects = () => {
    if (sessionStorage.getItem("token")) {
      navigate('/project')
    } else {
      toast.warning("please login")

    }
  }

  return (
    <>
      <Container >
        <div className='m-2 mb-5'>
          <Row style={{ marginTop: '120px' }}>
            <Col lg={6} md={12} sm={12} className='mb-5'>
              <div style={{ textAlign: 'justify' }}>
                <h1 className='' style={{ color: 'green' }}>Project Fair</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi obcaecati aliquam hic? Doloremque at ratione necessitatibus eius id aliquid, eveniet nulla laboriosam. Magnam repellat eligendi numquam error, </p>

                {/* check user login , if login goto dashboard else goto login */}
                {
                  sessionStorage.getItem("token") ?
                    <Link to={'/dashboard'}><Button variant="success">Manage Your Project</Button></Link>
                    :
                    <Link to={'/login'}><Button variant="success">Start to Explore</Button></Link>
                }

              </div>
            </Col>
            <Col>
              <div className='justify-content-start' style={{ height: '100%', width: '100%' }}>
                <img style={{ width: '100%' }} className='img-fluid' src={projectImg} alt="" />
              </div>
            </Col>
          </Row>
        </div >

        <Row className='mt-5 d-flex flex-colum justify-content-center align-items-center text-center mb-5'>
          <div>
            <h2 style={{ color: 'green' }} className=' fs-1'>Explore Our Projects</h2>
          </div>
          <marquee>
            <div className='d-flex'>
              <div className='d-flex'>
                {
                  homeProj?.map(proj => (

                    <CardItems proj={proj} />
                  ))
                }
              </div>
            </div>
          </marquee>

          <p>
            <button className='btn' onClick={handleProjects}>
              <Link to={'/project'}>
                <div className='d-flex justify-content-end m-3 me-5'>
                  <p>View More</p>
                </div>
              </Link>
            </button>
          </p>

        </Row>


        <Row>
          <div className='text-center text-success'>
            <h1>Our Testimonial</h1>
          </div>
          <div>
            <div className='d-flex row m-5'>
              <div className='col'>
                <Card style={{ width: '14rem' }} className='text-center d-flex justify-content-center m-2 shadow'>
                  <div className='d-flex justify-content-center mt-3' style={{ borderRadius: '50%' }}>
                    <Card.Img className='roundedCircle d-flex justify-content-center' style={{ height: '100%', width: '50%', borderRadius: '50%' }} variant="top" src="https://cdn.pixabay.com/photo/2021/02/27/16/25/woman-6055084_1280.jpg" roundedCircle />

                  </div>
                  <Card.Body>
                    <Card.Title>Max miller</Card.Title>
                    <p className='text-warning'>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </p>
                    <Card.Text>
                      Some quick example text to build on the card
                    </Card.Text>

                  </Card.Body>
                </Card>
              </div>

              <div className='col'>
                <Card style={{ width: '14rem' }} className='text-center d-flex justify-content-center m-2'>
                  <div className='d-flex justify-content-center mt-3' style={{ height: '100%', width: '100%', borderRadius: '50%' }}>
                    <Card.Img className='roundedCircle d-flex justify-content-center' style={{ height: '100%', width: '50%', borderRadius: '50%' }} variant="top" src="https://cdn.pixabay.com/photo/2021/02/27/16/25/woman-6055084_1280.jpg" roundedCircle />

                  </div>
                  <Card.Body>
                    <Card.Title>Max miller</Card.Title>
                    <p className='text-warning'>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </p>
                    <Card.Text>
                      Some quick example text to build on the card
                    </Card.Text>

                  </Card.Body>
                </Card>
              </div>

              <div className='col'>
                <Card style={{ width: '14rem' }} className='text-center d-flex justify-content-center m-2'>
                  <div className='d-flex justify-content-center mt-3' style={{ height: '100%', width: '100%', borderRadius: '50%' }}>
                    <Card.Img className='roundedCircle d-flex justify-content-center' style={{ height: '100%', width: '50%', borderRadius: '50%' }} variant="top" src="https://cdn.pixabay.com/photo/2021/02/27/16/25/woman-6055084_1280.jpg" roundedCircle />

                  </div>
                  <Card.Body>
                    <Card.Title>Max miller</Card.Title>
                    <p className='text-warning'>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </p>
                    <Card.Text>
                      Some quick example text to build on the card
                    </Card.Text>

                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </Row>


      </Container>
    </>
  )
}

export default Home