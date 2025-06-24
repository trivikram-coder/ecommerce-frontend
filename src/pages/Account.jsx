import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import "../styles/account.css";



const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData
  useEffect(() => {
    if (!userData && !localStorage.getItem("user")) {
      navigate("/product", { replace: true });
    }
  }, [userData, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/product", { replace: true, state: null }); // clear state explicitly
    window.location.reload(); // hard reload to clear in-memory state (optional fallback)
  };
  

  if (!userData) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="account-container">
        {userData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="profile-header">
              {item.profileImage ? (
                <img
                  src={item.profileImage}
                  alt={`${item.name}'s profile`}
                  className="profile-image mx-auto d-block"
                />
              ) : (
                <div className="d-flex justify-content-center mb-3">
                  <UserCircle size={120} className="text-secondary" />
                </div>
              )}
              <h2 className="profile-name">{item.name}</h2>
              <p className="profile-email">{item.email}</p>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="info-card">
                  <h4 className="mb-4 text-primary">Personal Information</h4>
                  
                  <div className="info-item">
                    <span className="info-label">Full Name:</span>
                    <span className="info-value">{item.name}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{item.email}</span>
                  </div>
                  
                  
                  
                  <div className="info-item">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{item.mobileNo}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-danger signout-btn mt-3"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;