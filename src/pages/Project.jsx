import React, { useEffect, useState } from 'react'
import { getAllProject } from '../../Services/allApi';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardItems from '../components/CardItems';
import { toast, ToastContainer } from 'react-toastify';





function Project() {

  const [searchkey,setSearchKey]=useState("")
  console.log(searchkey)

  const [allProject, setAllProject] = useState()
  console.log(allProject)

  useEffect(() => {
    getAllProjects()
  }, [searchkey])




  const getAllProjects = async () => {

    const token = sessionStorage.getItem("token")

    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Beror ${token}`
      }


      try {

        const result = await getAllProject(searchkey,reqHeader)
        console.log(result);

        if (result.status == 200) {
          setAllProject(result.data)
        } else {
          toast.error(result.response.data)
        }


      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <div>

        <div className='text-center d-flex flex-column justify-content-center align-items-center'>
          <h2>All PROJECTS</h2>
          <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search projects by langauage' className='w-50 form-control m-3' />
        </div>

        <div className='d-flex flex-wrap '>



          {
            allProject?.length > 0 &&
            allProject.map(proj => (
              <CardItems proj={proj} />
            ))


          }


        </div>
      </div>
    </>
  )
}

export default Project