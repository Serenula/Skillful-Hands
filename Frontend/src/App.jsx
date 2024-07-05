import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
