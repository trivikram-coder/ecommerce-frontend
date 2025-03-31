import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/account.css'
const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData; // Get user details from navigation

  function signout() {
    localStorage.removeItem("user");
    navigate("/product");
  }

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-primary fw-bold mb-3">Account Details</h2>

      {userData ? (
        userData.map((item, index) => (
          <div key={index} className="w-100 text-center">
            <div className="profile-section">
              
              <h4 className="fw-bold text-dark">{item.name}</h4>
              <p className="text-muted">{item.email}</p>
            </div>

            <div className="info-section">
              <p><strong>Roll No:</strong> {item.rollNo}</p>
              <p><strong>Phone:</strong> {item.mobileNo}</p>
            </div>

            <button className="btn btn-danger fw-bold px-5 mt-3" onClick={signout}>
              Sign Out
            </button>
          </div>
        ))
      ) : (
        <p className="text-danger">No user data found</p>
      )}
    </div>
  );
};

export default Account;
