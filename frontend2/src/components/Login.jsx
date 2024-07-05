import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getToken = useFetch();

  const { data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await getToken(
          "/api/auth/login",
          "POST",
          { email, password },
          undefined
        );
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      const decoded = jwtDecode(data.access);
      props.handleToken(data.access, decoded.role);
    }
  }, [data]);

  // console.log(data);

  return (
    <>
      <h2> Login </h2>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <button onClick={refetch}>Login</button>
      </div>
    </>
  );
};

export default Login;
