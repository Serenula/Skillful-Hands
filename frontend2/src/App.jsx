import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/Auth";
const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");

  const handleToken = (newToken, role) => {
    console.log(newToken);
    console.log(role);
    setAccessToken(newToken);
    setRole(role);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Auth
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        setRole={setRole}
        handleToken={handleToken}
      />
    </QueryClientProvider>
  );
}
export default App;
