import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const Register = (props) => {
  const createUsers = useFetch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");

  const mutation = useMutation({
    mutationFn: async () =>
      await createUsers(
        "api/auth/register",
        "PUT",
        {
          username,
          email,
          password,
          role,
          address,
        },
        undefined
      ),
    onSuccess: () => props.setShowLogin(true),
  });

  return (
    <>
      <h2> Register </h2>
      <div>
        <label>Role</label>
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>
      </div>
      <div>
        <div>
          <label>Name</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <label>Address</label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        ></input>

        <div>
          <button>Register</button>
          <button>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default Register;
