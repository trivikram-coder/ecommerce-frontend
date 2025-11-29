import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, UserCircle } from "lucide-react";
import "../styles/account.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();

 const storedUser = JSON.parse(localStorage.getItem("user"));
const user = storedUser; // NEVER use location.state for account data


  const [showSignout, setShowSignout] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) navigate("/products", { replace: true });
  }, [user, navigate]);

  // -------- SIGN OUT --------
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Notify layout
    window.dispatchEvent(new Event("storage"));
    navigate("/", { replace: true });
  };

  // -------- UPDATE USER --------
  const updateUser = async () => {
    const res = await fetch(
      `https://spring-server-0m1e.onrender.com/auth/update?email=${user.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedUser.name,
          mobileNumber: updatedUser.mobileNumber,
        }),
      }
    );

    const newdata = await res.json();

    if (res.ok && newdata.account) {
      localStorage.setItem("user", JSON.stringify(newdata.account));
      setUpdatedUser(newdata.account);

      // Notify layout to refresh instantly
      window.dispatchEvent(new Event("storage"));
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
          <p className="text-muted">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="account-container">
        <div className="text-center">
          <div className="profile-header">
            {updatedUser.profileImage ? (
              <img
                src={updatedUser.profileImage}
                alt=""
                className="profile-image mx-auto d-block"
              />
            ) : (
              <div className="d-flex justify-content-center mb-3">
                <UserCircle size={120} className="text-secondary" />
              </div>
            )}

            <h2 className="profile-name">{updatedUser.name}</h2>
            <p className="profile-email">{updatedUser.email}</p>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="info-card">
                <h4 className="mb-4 text-primary">Personal Information</h4>

                <div className="d-flex justify-content-end">
                  <Pencil
                    size={40}
                    className="btn btn-success rounded"
                    onClick={() => setShowEdit(true)}
                  />
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
            className="btn btn-danger mt-3"
            onClick={() => setShowSignout(true)}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal show={showEdit} centered onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>Edit details</Modal.Header>
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
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={updateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SIGN OUT MODAL */}
      <Modal show={showSignout} centered onHide={() => setShowSignout(false)}>
        <Modal.Header closeButton>Sign Out</Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignout(false)}>
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
