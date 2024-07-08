import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ServicePage from "./components/servicePage";
import VendorProfile from "./components/VendorProfile";
import Homepage from "./components/Homepage";
import DetailsPage from "./components/DetailsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
          <Route path="/services/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
