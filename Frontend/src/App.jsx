import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServicePage from "./components/servicePage";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <ServicePage value={{ accessToken, setAccessToken }}></ServicePage>
    </QueryClientProvider>
  );
}

export default App;
