import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/forms.css';
import { toast } from 'react-toastify';

const Signin = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Redirecting")

    try {
      const res = await fetch("https://backend-server-3-ycun.onrender.com/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Login successful!");
        navigate('/product');
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    }
  };

  return (
    <div className="form-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card p-4">
        <div className="text-center mb-4">
          <h2 className="mb-1 brand-title">Vk Store <ShoppingBag size={26} /></h2>
          <h5 className="text-muted">Sign In</h5>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="rollNo"
              name="rollNo"
              placeholder="Roll Number"
              onChange={handleChange}
              required
            />
            <label htmlFor="rollNo">Roll Number</label>
          </div>

          <div className="mb-3 position-relative">
            <div className="form-floating">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="btn btn-sm toggle-password position-absolute top-50 end-0 translate-middle-y me-2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? "🔒" : "👁️"}
              </button>
            </div>
          </div>

          {message && <p className="text-danger text-center">{message}</p>}

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>

          <div className="d-grid mb-3">
            <Link to="/signup" className="btn btn-dark">Sign Up</Link>
          </div>
        </form>

        <footer className="text-center mt-2 small text-muted">
          &copy; {new Date().getFullYear()} Vk Store. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Signin;
