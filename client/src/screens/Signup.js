import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      })
    );
    const response = await fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/api/createuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://media-hosting.imagekit.io//334734f47fc14666/download%20(1).jpeg?Expires=1834428608&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0uvYoUdav17OYl6A5g26OgOUZHqgdxHUFygU7Hxlfk6QMEn1s~gQxDAsghWGs5zCg13aU9gaNMLdnV1bvD0RMR~fAqDzO-MtndhzEERXp6RRSrwWr24H7TpSi-jZm28LouSqfgF8dyW97bWCuZoGpbxVnscbHGcVb7lvuOYz-AsK6VDD9QIIV7AC2bcY60IEWrErqsaAfEZU6m~Cb4txhyw~8drdxA8T-izVQXcSySoECsQHK-ODnNsHKS6FK7ahQYjjr02weSMY9Is6SuVBl-x2ivvo47UR2gJQwjoF26~XLjuwxtfKBVt2PHFjUrJzxW7nuqzKf4TM3UYHQFNi7Q__")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-warning">
            Already a user
          </Link>
        </form>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}
