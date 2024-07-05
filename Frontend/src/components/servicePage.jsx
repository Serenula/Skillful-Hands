import React from "react";
import useFetch from "../hooks/useFetch";

const ServicePage = ({ token }) => {
  const { data: services, error, isLoading } = useFetch(token);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.Map((service) => {
          <li key={service._id}>{service.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default ServicePage;
