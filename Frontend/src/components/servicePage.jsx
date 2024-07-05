import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const ServicePage = () => {
  const fetchData = useFetch();
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const fetchServices = async () => {
    const response = await fetchData("/api/services", "GET");
    return response;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    onSuccess: (data) => {
      setServices(data);
      setFilteredServices(data);
    },
  });

  useEffect(() => {
    if (data) {
      setServices(data);
      setFilteredServices(data);
    }
  }, [data]);

  const handleSearch = () => {
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Services</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for services"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {filteredServices.map((service) => (
          <li key={service._id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicePage;
