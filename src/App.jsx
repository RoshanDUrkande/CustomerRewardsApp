import React, { useMemo } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useRewardsData } from "./hooks/useRewardsData.jsx";
import Header from "./components/Header.jsx";
import CustomerList from "./components/CustomerList.jsx";
import CustomerDetails from "./components/CustomerDetails.jsx";

export default function App() {
  const { customersData, error } = useRewardsData();

  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-bold text-xl bg-red-100 rounded-lg m-8">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans antialiased">
      <Header title="Customer Rewards Dashboard" />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<CustomerList customers={customersData} />}
          />
          <Route
            path="/customer/:id"
            element={<CustomerDetailsWrapper customersData={customersData} />}
          />
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-red-600 font-bold text-xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </div>

      <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-200 mt-auto bg-white">
        &copy; 2025 Rewards Program Analytics. All rights reserved.
      </footer>
    </div>
  );
}

/**
 * Wrapper component for /customer/:id route
 */
function CustomerDetailsWrapper({ customersData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = useMemo(
    () => customersData.find((c) => c.id === id),
    [id, customersData]
  );

  return (
    <>
      <CustomerDetails customer={customer} onBack={() => navigate("/")} />
    </>
  );
}
