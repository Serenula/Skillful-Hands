import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import styles from "./VendorProfile.module.css";

const VendorProfilePage = () => {
  const [vendorProfile, setVendorProfile] = useState({});
  const [serviceData, setServiceData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    availability: [],
  });
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
          setServiceData((prevData) => ({
            ...prevData,
            category: cachedData.category,
          }));
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

        setServiceData((prevData) => ({
          ...prevData,
          category: response.category,
        }));

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

  const mutation = useMutation({
    mutationFn: async (newService) => {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetchData(
        "/api/services/create",
        "POST",
        newService,
        token
      );
      return response.data;
    },
    onSuccess: () => {
      setServiceData({
        name: "",
        category: vendorProfile.category,
        description: "",
        price: 0,
        availability: [],
      });
    },
    onError: (error) => {
      console.error("Error creating service:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    const { value } = e.target;
    const availabilityDates = value.split(",").map((date) => date.trim());
    setServiceData((prevData) => ({
      ...prevData,
      availability: availabilityDates,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(serviceData);
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

      <div className={styles.profileInfo}>
        <div className={styles.infoLabel}>Username:</div>
        <input
          type="text"
          name="username"
          value={vendorProfile.username || ""}
          className={styles.infoInput}
          readOnly
        />
        <div className={styles.infoLabel}>Email:</div>
        <input
          type="email"
          name="email"
          value={vendorProfile.email || ""}
          className={styles.infoInput}
          readOnly
        />
        <div className={styles.infoLabel}>Category:</div>
        <input
          type="text"
          name="category"
          value={serviceData.category || ""}
          className={styles.infoInput}
          readOnly
        />
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Service Name:
          <input
            type="text"
            name="name"
            value={serviceData.name}
            onChange={handleInputChange}
            required
            className={styles.infoInput}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleInputChange}
            required
            className={styles.infoInput}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleInputChange}
            required
            className={styles.infoInput}
          />
        </label>
        <label>
          Availability (comma-separated dates):
          <input
            type="text"
            name="availability"
            value={serviceData.availability.join(", ")}
            onChange={handleAvailabilityChange}
            required
            className={styles.dateInput}
          />
        </label>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Creating..." : "Create Service"}
        </button>
        {mutation.isError && <div>Error: {mutation.error.message}</div>}
      </form>

      <div className={styles.serviceContainer}>
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
          onClick={() => console.log("Open CreateServiceModal")}
        >
          Create New Service
        </div>
      </div>
    </div>
  );
};
export default VendorProfilePage;
