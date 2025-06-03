import { ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    DOB: "",
    branch: "",
    rollNo: "",
    section: "",
    address: "",
    email: "",
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

    for (let key in formData) {
      if (!formData[key]) {
        setRes("All fields are required.");
        return;
      }
    }

    try {
      const response = await fetch("https://backend-server-3-ycun.onrender.com/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.status === 201) {
        toast.success("User created successfully");
        navigate("/");
      } else if (response.status === 400) {
        toast.error("User Already Exists");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
    }
  }

  return (
    <div className="form-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card p-4">
        <div className="text-center mb-4">
          <h2 className="mb-1 brand-title">Vk Store <ShoppingBag size={26} /></h2>
          <h5 className="text-muted">Sign Up</h5>
        </div>

        <form onSubmit={signup}>
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "fatherName", label: "Father Name", type: "text" },
            { id: "DOB", label: "Date of Birth", type: "date" },
            { id: "branch", label: "Branch", type: "text" },
            { id: "rollNo", label: "Roll Number", type: "text" },
            { id: "section", label: "Section", type: "text" },
            { id: "address", label: "Address", type: "text" },
            { id: "mobileNo", label: "Mobile Number", type: "number" },
            { id: "email", label: "Email", type: "email" },
          ].map((field) => (
            <div className="form-floating mb-3" key={field.id}>
              <input
                type={field.type}
                className="form-control"
                id={field.id}
                placeholder={field.label}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                required
              />
              <label htmlFor={field.id}>{field.label}</label>
            </div>
          ))}

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              title="Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {res && <p className="text-danger text-center">{res}</p>}

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>

          <div className="d-grid mb-3">
            <Link to="/" className="btn btn-dark">Sign In</Link>
          </div>
        </form>

        <footer className="text-center mt-2 small text-muted">
          &copy; 2025 Vk Store. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Signup;
