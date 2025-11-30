import { ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    address: "",
    mobileNumber: "",
    email: "",
    password: ""
  });
const email=formData.email;
  const [res, setRes] = useState("");
  const [showOtp, setShowOtp] = useState(false);   // 🔥 Added for UI only
  const [otp, setOtp] = useState("");              // 🔥 For OTP input UI
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const checkUser=async()=>{
    try {
      const checkEmail=await axios.get(`https://spring-server-0m1e.onrender.com/auth/check-email?email=${email}`)
      if(checkEmail.status===200){
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message )
      return false;
    }
  }
  const sendOtp = async (e) => {
    e.preventDefault();
    
    // Check for empty fields
    for (let key in formData) {
      if (!formData[key]) {
        toast.error("All fields are required.");
        return;
      }
    }

    try {

      
      if(await checkUser()){
        const otpApi = await axios.post(
          "https://email-service-72rh.onrender.com/otp/send-otp",
          { email: email,
            appName:"Vk store",
            type:"forget"
           }
        );
        
        if (otpApi.status === 200) {
          toast.success("OTP sent to your email!");
          setShowOtp(true);
          setRes("");
        }
      } 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
      setRes("Failed to send OTP. Please try again.");
    }
  };
  const verifyOtp = async () => {
    try {
      const verifyOtpRes = await axios.post(
        `https://email-service-72rh.onrender.com/otp/verify-otp/${email}`,
        { otp: otp }
      );
      
      if (verifyOtpRes.status === 200) {
        toast.success("OTP verified successfully!");
        
        // Call backend to register user
        const signupRes = await axios.post(
          "https://spring-server-0m1e.onrender.com/auth/signup",
          formData
        );
        
        if (signupRes.status === 201) {
          toast.success("Signup successful!");
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      setOtp("");
    }
  };
  return (
    <div className="form-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card p-4">

        <div className="text-center mb-4">
          <h2 className="mb-1 brand-title">
            Vk Store <ShoppingBag size={26} />
          </h2>
          <h5 className="text-muted">
            {!showOtp ? "Sign Up" : "Verify OTP"}
          </h5>
        </div>

        {/* 🔥 If showOtp = false → show signup form */}
        {!showOtp ? (
          <form onSubmit={sendOtp}>
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "fatherName", label: "Father Name", type: "text" },
              { id: "dob", label: "Date of Birth", type: "date" },
              { id: "address", label: "Address", type: "text" },
              { id: "mobileNumber", label: "Mobile Number", type: "number" },
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

            {/* Password */}
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

            {res && <p className="text-danger text-center">{res}</p>}

            <div className="d-grid mb-2">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>

            <div className="d-grid mb-3">
              <Link to="/" className="btn btn-dark">Sign In</Link>
            </div>
          </form>
        ) : (
          // 🔥 OTP Verification UI only
          <div>
            <p className="text-center text-muted mb-3">
              Enter the 6-digit OTP sent to your email
            </p>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control text-center"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label htmlFor="otp">OTP</label>
            </div>

            <div className="d-grid mb-2">
              <button className="btn btn-success" onClick={verifyOtp}>Verify OTP</button>
            </div>

            <div className="d-grid">
              <button className="btn btn-outline-secondary" onClick={sendOtp}>Resend OTP</button>
            </div>
          </div>
        )}

        <footer className="text-center mt-2 small text-muted">
          &copy; 2025 Vk Store. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Signup;
