import React from "react";

const useFetch = () => {
  const fetchData = async (endpoint, method, body, token) => {
    const res = await fetch(process.env.VITE_SERVER + endpoint, {
      method,
      header: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("database error");
    }
    const data = await res.json();
    console.log(data);
    return data;
  };
  return fetchData;
};

export default useFetch;
