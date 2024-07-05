import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

const FetchServices = () => {
  const fetchData = useFetch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSvc, setFilteredSvc] = useState([]);

  const {
    data: services,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await fetchData("/api/services");
      return response;
    },
  });

  const handleSearch = () => {
    if (services) {
      const filtered = services.filtered((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase)
      );
      setFilteredSvc(filtered);
    }
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
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for services"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>Price:${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchServices;
