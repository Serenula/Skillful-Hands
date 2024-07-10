import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

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
  const decodedToken = jwtDecode(token); // Decode token once

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
      <h2>Vendor Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Service Name:
          <input
            type="text"
            name="name"
            value={serviceData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={serviceData.category}
            onChange={handleInputChange}
            disabled
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleInputChange}
            required
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
          />
        </label>
        <label>
          Availability (comma-separated dates):
          <input
            type="date"
            name="availability"
            value={serviceData.availability.join(", ")}
            onChange={handleAvailabilityChange}
            required
          />
        </label>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Creating..." : "Create Service"}
        </button>
        {mutation.isError && <div>Error: {mutation.error.message}</div>}
      </form>
    </div>
  );
};

export default VendorProfilePage;
