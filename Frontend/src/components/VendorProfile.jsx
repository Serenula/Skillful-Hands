import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const VendorProfilePage = () => {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: 0,
    availability: [],
  });
  const fetchData = useFetch();

  const mutation = useMutation({
    mutationFn: async (newService) => {
      const response = await fetchData("/api/services", "POST", newService);
      return response.data;
    },
    onSuccess: () => {
      setServiceData({
        title: "",
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
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleAvailabilityChange = (e) => {
    const { value } = e.target;
    const availabilityDates = value.split(",").map((date) => date.trim());
    setServiceData({ ...serviceData, availability: availabilityDates });
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
          Service Title:
          <input
            type="text"
            name="title"
            value={serviceData.title}
            onChange={handleInputChange}
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
            type="text"
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
