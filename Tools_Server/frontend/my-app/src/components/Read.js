import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(`http://localhost:4000/read`);
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }

    if (response.ok) {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }

    if (response.ok) {
      alert("Are you sure you want to remove user data...........!");
      getData();
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='container'>
      <h1 className='bg-dark text-white p-3 text-center'>User Details</h1>

      <div className='row'>

        {data?.map((ele) => {

          return (
            <div key={ele._id} className='col-3'>
              <div className="card">
                <div className="card-body">

                  <h5 className="card-title">{ele.name}</h5>

                  <h6 className="card-subtitle mb-2 text-muted">
                    {ele.email}
                  </h6>

                  <p className="card-text">{ele.age}</p>

                  <Link
                    className="card-link text-decoration-none border rounded-2 bg-danger text-white p-1"
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </Link>

                  <Link
                    to={`/${ele._id}`}
                    className="card-link text-decoration-none border rounded-2 bg-success text-white p-1"
                  >
                    Update
                  </Link>

                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  );
};

export default Read;