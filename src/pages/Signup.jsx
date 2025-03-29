import { ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    DOB: "",
    branch: "",
    rollNo: "",
    section: "",
    address: "",
    email:"",
    mobileNo: "",
    password: ""
  });

  const [res, setRes] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function signup(e) {
    e.preventDefault();
console.log(formData)
    // Check if all fields are filled
    for (let key in formData) {
      if (!formData[key]) {
        setRes("All fields are required.");
        return;
      }
    }
    const response=await fetch("http://localhost:3000/user/signup",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    if(response.status===201){
      console.log("Created")
    }
    else if(response.status===400){
      setRes("User Already Exists")
    }
  }
  return (
    <>
      <div className="body">
        <div className="form">
          <form className="inputs" onSubmit={signup}>
            <h2>
              Vk Store <ShoppingBag size={28} />
            </h2>
            <h3>Sign up</h3>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="fatherName"
                  placeholder="Father Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="fatherName">Father Name</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="DOB"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="DOB">Date Of Birth</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="branch"
                  placeholder="Branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="branch">Branch</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="rollNo"
                  placeholder="Roll Number"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="rollNo">Roll Number</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="section"
                  placeholder="Section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="section">Section</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="address">Address</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="mobileNo"
                  placeholder="Mobile Number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="mobileNo">Mobile Number</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            {res && <p className="text-danger mt-2">{res}</p>}

            <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={signup}>
                Sign up
              </button>
              <Link to="/" className="btn btn-dark">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="footer" style={{ textAlign: "center", padding: "10px", marginTop: "40px" }}>
        <p>&copy; 2025 Vk Store. All Rights Reserved</p>
      </div>
    </>
  );
};

export default Signup;
