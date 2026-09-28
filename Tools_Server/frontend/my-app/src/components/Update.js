import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

  const[name,setname] = useState("")
  const[email,setemail] = useState("")
  const[age,setage] = useState(0);

  const {id} = useParams();

  const navigate = useNavigate();

  const handleUpdate = async(e) =>{
    e.preventDefault();
  
    const updateUser = {name,email,age}

    const response = await fetch (`http://localhost:4000/${id}`,{
      method:"PATCH",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json"
      },
    });

    const result = await response.json();

    if(!response.ok){
      console.log(result.error);
    }

    if(response.ok){
      alert("Are you sure you want to update user data.....?")
      navigate("/all")
    }
  }

  useEffect(() => {

    const getSingleUser = async() => {
      const response = await fetch(`http://localhost:4000/${id}`)
      const result = await response.json()

      if(!response.ok){
        console.log(result.error)
      }

      if(response.ok){
        console.log("Updated User",result)
        setname(result.name);
        setemail(result.email);
        setage(result.age)
      }
    }

    getSingleUser()

  }, [id])

  return (
    <div className='container my-2'>
      <h1 className='bg-dark text-white p-3 text-center'>
        Edit your details here....
      </h1>

      <form onSubmit={handleUpdate} className='border p-4 m-3 shadow'>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e)=>setname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e)=>setage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update User
        </button>

      </form>
    </div>
  )
}

export default Update