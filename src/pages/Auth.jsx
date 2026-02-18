import React, { useState,useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/forms.css";
import { toast } from "react-toastify";
import axios from "axios";
import {apiUrl,emailUrl}  from "../service/api";
const Auth = () => {
  const location=useLocation();
  const navigate = useNavigate();
  const [user,setUser]=useState(null)
  /* ================= MODE STATE ================= */
  // signin | signup | otp
  const [mode, setMode] = useState("signin");

  /* ================= SIGNIN STATE ================= */
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  /* ================= SIGNUP STATE ================= */
  const [signupData, setSignupData] = useState({
    userName: "",
    fatherName: "",
    dob: "",
    address: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
/* ================= HANDLE NAV STATE ================= */
useEffect(() => {
  if (location.state?.mode === "signup") {
    setMode("signup");
  }
}, [location.state]);

  /* ================= HANDLERS ================= */
  const handleSigninChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  /* ================= SIGN IN ================= */
  const handleSignin = async (e) => {
    e.preventDefault();
    toast.info("Redirecting....")
    if (!signinData.email || !signinData.password) {
      toast.error("Please enter all fields");
      return;
    }

    try {
      const res = await fetch(
        `${apiUrl}/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signinData),
        }
      );
    let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
      
      if (!res.ok) {
        
        toast.error(data?.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);

      const userRes = await fetch(
        `${apiUrl}/auth/users/me`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const userData = await userRes.json();
      localStorage.setItem("user", JSON.stringify(userData.user));
      setUser(userData.user)
      toast.success("Signin successful!");
    window.dispatchEvent(new Event("storage"));
      navigate("/products");
    } catch {
      toast.error("Network error. Try again.");
    }
  };

  /* ================= CHECK USER ================= */
  const checkUser = async () => {
    try {
      const res=await axios.get(
        `${apiUrl}/auth/check-email/${signupData.email}`
      );
      if(res.data.message.includes("not found")){
        return true
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return false;
    }
  };

  /* ================= SEND OTP ================= */
  const sendOtp = async (e) => {
    e.preventDefault();

    for (let key in signupData) {
      if (!signupData[key]) {
        toast.error("All fields are required");
        return;
      }
    }

    if (!(await checkUser())) return;

    try {
      await axios.post(
        `${emailUrl}/otp/send-otp`,
        {
          email: signupData.email,
          appName: "Vk Store",
          type: "signup",
        }
      );

      toast.success("OTP sent to email");
      setMode("otp");
    } catch {
      toast.error("Failed to send OTP");
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    try {
      await axios.post(
        `${emailUrl}/otp/verify-otp/${signupData.email}`,
        { otp }
      );

      await axios.post(
        `${apiUrl}/auth/signup`,
        signupData
      );

      toast.success("Signup successful!");
      window.location.reload()
      navigate("/");
    } catch {
      toast.error("Invalid OTP");
      setOtp("");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="form-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card p-4">
        <div className="text-center mb-4">
          <h2 className="brand-title">
            Vk Store <ShoppingBag size={26} />
          </h2>
          <h5 className="text-muted text-capitalize">
            {mode === "signin" && "Sign In"}
            {mode === "signup" && "Sign Up"}
            {mode === "otp" && "Verify OTP"}
          </h5>
        </div>

        {/* ================= SIGN IN ================= */}
        {mode === "signin" && (
          <form onSubmit={handleSignin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={handleSigninChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                name="password"
                placeholder="Password"
                onChange={handleSigninChange}
                required
              />
              <label>Password</label>

              <button
                type="button"
                className="btn toggle-password position-absolute top-50 end-0 translate-middle-y me-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔒" : "👁️"}
              </button>
            </div>

            <div className="d-grid mb-2">
              <button className="btn btn-primary">Sign In</button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setMode("signup")}
              >
                Create an account
              </button>
            </div>
          </form>
        )}

        {/* ================= SIGN UP ================= */}
        {mode === "signup" && (
          <form onSubmit={sendOtp}>
            {[
              { id: "userName", label: "Username" },
              { id: "fatherName", label: "Father Name" },
              { id: "dob", label: "Date of Birth", type: "date" },
              { id: "address", label: "Address" },
              { id: "mobileNumber", label: "Mobile Number" },
              { id: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div className="form-floating mb-3" key={f.id}>
                <input
                  type={f.type || "text"}
                  className="form-control"
                  name={f.id}
                  placeholder={f.label}
                  onChange={handleSignupChange}
                  required
                />
                <label>{f.label}</label>
              </div>
            ))}

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={handleSignupChange}
                required
              />
              <label>Password</label>
            </div>

            <div className="d-grid mb-2">
              <button className="btn btn-primary">Send OTP</button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setMode("signin")}
              >
                Already have an account?
              </button>
            </div>
          </form>
        )}

        {/* ================= OTP ================= */}
        {mode === "otp" && (
          <>
            <p className="text-center text-muted mb-3">
              Enter OTP sent to your email
            </p>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control text-center"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label>OTP</label>
            </div>

            <div className="d-grid mb-2">
              <button className="btn btn-success" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>

            <div className="d-grid">
              <button
                className="btn btn-outline-secondary"
                onClick={sendOtp}
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        <footer className="text-center mt-3 small text-muted">
          © {new Date().getFullYear()} Vk Store. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Auth;
