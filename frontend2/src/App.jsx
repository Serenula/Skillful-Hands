import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/Auth";
import User from "./pages/User";
const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  const handleToken = (newToken, role, userId, email) => {
    console.log(newToken);
    console.log(role);
    console.log(userId);
    setAccessToken(newToken);
    setRole(role);
    setUserId(userId);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!role && !accessToken && (
        <Auth
          setAccessToken={setAccessToken}
          setRole={setRole}
          setUserId={setUserId}
          handleToken={handleToken}
        />
      )}
      {role === "user" && accessToken && (
        <User userId={userId} accessToken={accessToken} />
      )}
    </QueryClientProvider>
  );
}
export default App;
