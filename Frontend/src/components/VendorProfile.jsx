import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import styles from "./VendorProfile.module.css";
import CreateServiceModal from "./CreateServiceModal";
import Logout from "./Logout";

const VendorProfilePage = () => {
  const [vendorProfile, setVendorProfile] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }

        const cachedData = queryClient.getQueryData("/api/auth/profile");

        if (cachedData) {
          setVendorProfile(cachedData);
          return;
        }

        const response = await fetchData(
          "/api/auth/profile",
          "GET",
          undefined,
          token
        );
        console.log("Vendor profile fetch:", response);

        queryClient.setQueryData("/api/auth/profile", response);

        setVendorProfile(response);

        if (response._id) {
          const servicesResponse = await fetchData(
            `/api/services/${response._id}`,
            "GET"
          );
          setVendorProfile((prevProfile) => ({
            ...prevProfile,
            services: servicesResponse,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    if (token && Object.keys(vendorProfile).length === 0) {
      fetchVendorProfile();
    }
  }, [fetchData, queryClient, token, vendorProfile]);

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleServiceCreationSuccess = () => {
    const fetchServices = async () => {
      const servicesResponse = await fetchData(
        `/api/services/${vendorProfile._id}`,
        "GET"
      );
      setVendorProfile((prevProfile) => ({
        ...prevProfile,
        services: servicesResponse,
      }));
    };
    fetchServices();
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setUpdatedProfile(vendorProfile);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setUpdatedProfile({});
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetchData(
        "/api/vendor/edit",
        "PUT",
        { about: updatedProfile.about },
        token
      );

      if (response && response.success) {
        setEditMode(false);
        setVendorProfile({ ...vendorProfile, about: updatedProfile.about });
        console.log("Profile updated successfully");
      } else {
        throw new Error(response.message || "Failed to update");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logoLink}>
          <img src="Skilfull Hands.png" alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.navLinks}>
          <a href="/profile" className={styles.link}>
            Profile
          </a>
          <Logout onLogout={handleLogout} />
        </div>
      </nav>

      <div className={styles.hero}>
        <img src="heroimage.jpg" alt="Hero" className={styles.heroImage} />
        <img
          src={vendorProfile.profilePicture || "vendorprofilepic.jpg"}
          alt="Profile"
          className={styles.profilePicture}
        />
      </div>

      <div className={styles.profileContainer}>
        {!editMode ? (
          <div className={styles.profileInfo}>
            <div className={styles.infoText}>{vendorProfile.name}</div>
            <div className={styles.infoLabel}>Username:</div>
            <div className={styles.infoText}>{vendorProfile.username}</div>
            <div className={styles.infoLabel}>Category:</div>
            <div className={styles.infoText}>{vendorProfile.category}</div>
            <div className={styles.infoLabel}>About Us:</div>
            <div className={styles.infoText}>{vendorProfile.about}</div>
            <button onClick={handleEditProfile}>Edit Profile</button>
          </div>
        ) : (
          <div className={styles.profileEdit}>
            <h2>Edit Profile</h2>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={updatedProfile.username}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={updatedProfile.category}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="aboutUs">About Us:</label>
            <textarea
              id="aboutUs"
              name="aboutUs"
              value={updatedProfile.aboutUs}
              onChange={handleInputChange}
              required
            />
            <div className={styles.buttonContainer}>
              <button onClick={handleSaveProfile}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        )}
        <div className={styles.servicesContainer}>
          {vendorProfile.services &&
            vendorProfile.services.map((service) => (
              <div key={service._id} className={styles.serviceBox}>
                <div className={styles.serviceTitle}>{service.name}</div>
                <div className={styles.serviceDescription}>
                  {service.description}
                </div>
                <div className={styles.servicePrice}>${service.price}</div>
                <a
                  href={`api/services/${service._id}`}
                  className={styles.serviceLink}
                >
                  View Service
                </a>
              </div>
            ))}
          <div
            className={styles.createServiceBox}
            onClick={() => setIsModalOpen(true)}
          >
            Create New Service
          </div>
        </div>
      </div>

      <CreateServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vendorCategory={vendorProfile.category}
        onSuccess={handleServiceCreationSuccess}
      />
    </div>
  );
};
export default VendorProfilePage;
