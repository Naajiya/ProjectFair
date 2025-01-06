import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, ToastContainer } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Add from './Add'
// import Table from 'react-bootstrap/Table';
import Edit from './Edit'
import { getUserProject } from '../../Services/allApi';
import { toast } from 'react-toastify';
import CardItems from '../components/CardItems'
import { addResponseContext } from '../context/ContextApi';


function View() {

  const {addResponse,setAddResponse}=useContext(addResponseContext) //destructuring

  const [userProject,setUserProject]=useState()
  console.log('userproject')
  console.log(userProject)


  useEffect(() => {
      getUserProjectss()
    }, [addResponse])
  
  
  
  
    const getUserProjectss = async () => {
  
      const token = sessionStorage.getItem("token")
  
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Beror ${token}`
        }
  
  
        try {
  
          const result = await getUserProject(reqHeader)
          console.log(result.data);
  
          if (result.status == 200) {
            setUserProject(result.data)
          } else {
            toast.error(result.response.data)
          }
  
  
        } catch (err) {
          // console.log(err)
        }
      }
    }


  return (
    <>
      <div>
        <Row className='d-flex justify-content-between align-items-between'>
          <div className='d-flex justify-content-between align-items-between mt-3'>
            <h4>All Projects</h4>

            {
              userProject?.map(proj => (

                <CardItems proj={proj} />
              ))
            }
            {/* <CardItems proj={}/> */}

            <div className='me-5'><Add /></div>
          </div>
        </Row>
        <div className='d-flex w-100 justify-content-between border p-2'>
          <div>
            <h4> Title</h4>
          </div>
          <div className='d-flex w-50 justify-content-between '>
            <div>

            {
              userProject?.map(project => (

                <Edit project={project} />
              ))
            }

            

            </div >
            <div className='mt-2'>
            <i class="fa-brands fa-github"></i>
            </div>
            <div className='mt-2'>
            <i class="fa-solid fa-trash "></i>
            </div>
          </div>
        </div>
        <Row>

        </Row>
      </div>
    </>
  )
}

export default View