import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, UserCircle } from "lucide-react";
import "../styles/account.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {apiUrl}  from "../service/api";
const Account = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const user = storedUser;

  const [showSignout, setShowSignout] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");

  // Redirect if no user
  useEffect(() => {
    if (!user) navigate("/products", { replace: true });
  }, [user, navigate]);

  // -------- SIGN OUT --------
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.dispatchEvent(new Event("storage"));
    navigate("/", { replace: true });
  };

  // -------- UPDATE USER --------
  const updateUser = async () => {
    if (!updatedUser.name || !updatedUser.mobileNumber) {
      toast.error("Name and mobile number cannot be empty");
      return;
    }

    const payload = {
      name: updatedUser.name,
      mobileNumber: updatedUser.mobileNumber,
    };

    try {
      setIsUpdating(true);

      const res = await fetch(
        `${apiUrl}/auth/update?email=${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const newdata = await res.json();

      if (res.ok && newdata.account) {
        localStorage.setItem("user", JSON.stringify(newdata.account));
        setUpdatedUser(newdata.account);

        window.dispatchEvent(new Event("storage"));
        toast.success("Profile updated successfully ✅");
        setShowEdit(false);
      } else {
        toast.error(newdata.message || "Update failed");
      }
    } catch (error) {
      console.error("Update API failed:", error);
      toast.error("Failed to connect to server");
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading state
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
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* PROFILE CARD */}
          <div className="card account-card mb-4">
            <div className="card-body text-center">
              {updatedUser.profileImage ? (
                <img
                  src={updatedUser.profileImage}
                  alt="Profile"
                  className="profile-image mb-3"
                />
              ) : (
                <UserCircle size={110} className="text-secondary mb-3" />
              )}

              <h3 className="fw-bold mb-1">{updatedUser.name}</h3>
              <p className="text-muted mb-0">{updatedUser.email}</p>
            </div>
          </div>

          {/* INFO CARD */}
          <div className="card account-card position-relative">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0 text-primary">
                  Personal Information
                </h5>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setShowEdit(true)}
                >
                  <Pencil size={16} className="me-1" />
                  Edit
                </button>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="info-box">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{updatedUser.name}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="info-box">
                    <span className="info-label">Email</span>
                    <span className="info-value">{updatedUser.email}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="info-box">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{updatedUser.mobileNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIGN OUT */}
          <div className="text-center mt-4">
            <button
              className="btn btn-danger px-5 py-2 fw-semibold"
              onClick={() => setShowSignout(true)}
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal show={showEdit} centered onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={updatedUser.name || ""}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                value={updatedUser.mobileNumber || ""}
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    mobileNumber: e.target.value,
                  })
                }
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEdit(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={updateUser}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SIGN OUT MODAL */}
      <Modal show={showSignout} centered onHide={() => setShowSignout(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Sign Out</Modal.Title>
        </Modal.Header>
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
