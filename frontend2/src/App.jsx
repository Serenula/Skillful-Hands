import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/Auth";
import User from "./pages/User";
const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const handleToken = (newToken, role, id) => {
    console.log(newToken);
    console.log(role);
    console.log(id);
    setAccessToken(newToken);
    setRole(role);
    setId(id);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!role && !accessToken && (
        <Auth
          setAccessToken={setAccessToken}
          setRole={setRole}
          setId={setId}
          handleToken={handleToken}
        />
      )}
      {role === "user" && accessToken && (
        <User id={id} accessToken={accessToken} />
      )}
    </QueryClientProvider>
  );
}
export default App;
