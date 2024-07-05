import React from "react";

const useFetch = () => {
  const fetchData = async (endpoint, method, body, token) => {
    console.log("hi1");
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("database error");
    }
    console.log("hi2");
    const data = await res.json();
    console.log(data);
    return data;
  };
  return fetchData;
};

export default useFetch;
