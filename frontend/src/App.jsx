import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./pages/Auth";
const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");

  const handleToken = (newToken) => {
    console.log(newToken);
    setAccessToken(newToken);
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
