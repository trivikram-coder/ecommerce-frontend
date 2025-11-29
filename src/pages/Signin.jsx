import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/forms.css';
import { toast } from 'react-toastify';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter all fields");
      return;
    }

    try {
      toast.success("Redirecting...")
      const res = await fetch("https://spring-server-0m1e.onrender.com/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // SAFE PARSE JSON OR STRING
      let loginData;
      try {
        loginData = await res.json();
      } catch {
        loginData = null;
      }

      if (res.ok) {
        // Success login
        const token = loginData.token;
        localStorage.setItem("token", token);
        toast.success("Login successful!");

        // Fetch user details
        const userDetails = await fetch("https://spring-server-0m1e.onrender.com/auth/details", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        let userData;
        try {
          userData = await userDetails.json();
        } catch {
          userData = null;
        }

        if (userDetails.ok) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          toast.error("Failed to load user info");
        }

        navigate("/products");
      } else {
        // If backend returns string or JSON
        const msg = loginData?.message || "Invalid email or password";
        toast.error(msg);
      }

    } catch (err) {
      toast.error("Network error. Try again.");
    }
  };

  return (
    <div className="form-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card p-4">
        <div className="text-center mb-4">
          <h2 className="mb-1 brand-title">
            Vk Store <ShoppingBag size={26} />
          </h2>
          <h5 className="text-muted">Sign In</h5>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
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

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>

          <div className="d-grid mb-3">
            <Link to="/signup" className="btn btn-dark">Sign Up</Link>
          </div>
        </form>

        <footer className="text-center mt-2 small text-muted">
          © {new Date().getFullYear()} Vk Store. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Signin;
