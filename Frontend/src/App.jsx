import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import ServicePage from "./components/ServicePage";
import VendorProfile from "./components/VendorProfile";
import Homepage from "./components/Homepage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
