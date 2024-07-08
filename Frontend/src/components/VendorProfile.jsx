import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import styles from "./VendorProfile.module.css";
import CreateServiceModal from "./CreateServiceModal";

const VendorProfilePage = () => {
  const [vendorProfile, setVendorProfile] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);

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
          <a href="/" className={styles.link}>
            Log out
          </a>
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
        <div className={styles.profileInfo}>
          <div className={styles.infoText}>{vendorProfile.name}</div>
          <div className={styles.infoLabel}>Username:</div>
          <div className={styles.infoText}>{vendorProfile.username}</div>
          <div className={styles.infoLabel}>Category:</div>
          <div className={styles.infoText}>{vendorProfile.category}</div>
        </div>

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
                  href={`/services/${service._id}`}
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
        vendorCatgeory={vendorProfile.category}
        onSuccess={handleServiceCreationSuccess}
      />
    </div>
  );
};
export default VendorProfilePage;
