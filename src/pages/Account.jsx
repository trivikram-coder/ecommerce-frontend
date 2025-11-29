import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, UserCircle } from "lucide-react";
import "../styles/account.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.userData;
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const token=localStorage.getItem('token')
  useEffect(() => {

    if (!user && !localStorage.getItem("user")) {
      navigate("/products", { replace: true });
    }
  }, [user, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true }); // Go to login screen
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const updateUser = async() => {
    console.log("Updated User:", updatedUser);
    const res=await fetch(`https://spring-server-0m1e.onrender.com/auth/update?email=${user.email}`,{
      method:"PUT",
      headers:{
        "content-type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({name:updateUser.name,mobileNumber:updateUser.mobileNumber})
    })
    const newdata=await res.json()
    console.log(newdata)
    if(res.status===200 || res.status===201){

      localStorage.setItem("user", newdata);
    }
    setShowEdit(false);
  };

  if (!user) {
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
        <div className="text-center">
          <div className="profile-header">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                className="profile-image mx-auto d-block"
              />
            ) : (
              <div className="d-flex justify-content-center mb-3">
                <UserCircle size={120} className="text-secondary" />
              </div>
            )}
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="info-card">
                <h4 className="mb-4 text-primary">Personal Information</h4>
                <div className="d-flex justify-content-end">
                  <Pencil size={40}
                    className="btn btn-success rounded"
                    onClick={handleShowEdit}
                  >
                   
                  </Pencil>
                </div>

                <div className="info-item">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{updatedUser.name}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{updatedUser.email}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{updatedUser.mobileNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="btn btn-danger signout-btn mt-3"
            onClick={handleShow}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEdit} centered onHide={handleShowEdit}>
        <Modal.Header closeButton>
          <p>Edit details</p>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              value={updatedUser.name}
              placeholder="Enter name"
              className="form-control mb-3"
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, name: e.target.value })
              }
            />
            <input
              type="number"
              value={updatedUser.mobileNumber}
              placeholder="Enter phone"
              className="form-control"
              onChange={(e) =>
                setUpdatedUser({
                  ...updatedUser,
                  mobileNumber: e.target.value,
                })
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowEdit}>
            Cancel
          </Button>
          <Button variant="warning" onClick={updateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Signout Modal */}
      <Modal show={show} centered onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Sign Out</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to sign out?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Account;
