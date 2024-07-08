import React, { useEffect, useState } from "react";
import styles from "./CreateServiceModal.module.css";
import useFetch from "../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateServiceModal = ({ isOpen, onClose, vendorCatgeory, onSuccess }) => {
  const [serviceData, setServiceData] = useState({
    name: "",
    category: vendorCatgeory,
    description: "",
    price: 0,
    availability: [],
  });

  const fetchData = useFetch();
  const token = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchVendorCategory = async () => {
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
        if (response && response.category) {
          setServiceData((prevData) => ({
            ...prevData,
            category: response.category,
          }));
        } else {
          console.error("No category found in vendor");
        }
      } catch (error) {
        console.error("Error fetching vendor profile");
      }
    };

    if (isOpen) {
      fetchVendorCategory();
    }
  }, [fetchData, queryClient, isOpen, token]);

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
        category: vendorCatgeory,
        description: "",
        price: 0,
        availability: [],
      });
      onSuccess();
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
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Create New Service</h2>
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
          <input type="hidden" name="category" value={serviceData.category} />
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
              value={serviceData.availability}
              onChange={handleAvailabilityChange}
              required
              className={styles.infoInput}
            />
          </label>
          <button type="submit" className={styles.createButton}>
            Create Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
