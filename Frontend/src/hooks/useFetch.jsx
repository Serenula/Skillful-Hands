import React from "react";

const useFetch = () => {
  const fetchData = async (endpoint, method, body, token) => {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("database error");
    }

    const resData = await res.json();
    return resData;
  };

  return fetchData;
};

export default useFetch;
