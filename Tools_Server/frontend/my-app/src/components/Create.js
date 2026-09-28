import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [age, setage] = useState(0)

  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault()

    const adduser = { name, email, age }

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(adduser),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }

    if (response.ok) {
      console.log(result)
      navigate("/all")
    }
  }

  return (
    <div className='container my-2'>

      <h1 className='bg-dark text-white p-3 text-center'>
        Enter User Data Here...
      </h1>

      <form onSubmit={handlesubmit} className='border p-4 m-3 shadow'>

        <div className="mb-3">
          <label className="form-label">User Name</label>

          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">User Email</label>

          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>

          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>
    </div>
  )
}

export default Create