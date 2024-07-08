import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import styles from "./ServicePage.module.css";

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
        <div className={styles.searchBox}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for services..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className={styles.serviceContainer}>
        {filteredServices.map((service) => (
          <div key={service._id} className={styles.serviceBox}>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
            <p className={styles.servicePrice}>Price: ${service.price}</p>
            {/* link to dedicated service page */}
            <a href={`/service/${service._id}`} className={styles.serviceLink}>
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
