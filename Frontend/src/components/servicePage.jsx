import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import styles from "./ServicePage.module.css";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ServicePage = () => {
  const fetchData = useFetch();
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
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
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    console.log("Logout complete");
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
          <Link to={`/users/${userId}`} className={styles.link}>
            Profile
          </a>
          <Logout onLogout={handleLogout} />
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
            <h3 className={styles.serviceTitle}>{service.name}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
            <p className={styles.servicePrice}>Price: ${service.price}</p>
            {/* link to dedicated service page */}
            <Link
              to={`/services/${service._id}`}
              className={styles.serviceLink}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
