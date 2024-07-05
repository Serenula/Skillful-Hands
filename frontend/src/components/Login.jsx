import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

const Login = (props) => {
  const auth = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(props.accessToken);

  const { data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await auth("/api/auth/login", "POST", {
          email,
          password,
        });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      console.log(data);
      props.handleToken(data.access);
      const decoded = jwtDecode(data.access);
      console.log(decoded.role);
      props.setRole(decoded.role);
    }
  }),
    [data];

  return (
    <>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} value={email}></input>
      </div>
      <div>
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>

      <div>
        <button onClick={refetch}>Login</button>
      </div>
    </>
  );
};

export default Login;
