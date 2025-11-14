import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CustomerCard from "./CustomerCard.jsx";

const CustomerList = ({ customers }) => {
  const navigate = useNavigate();

  const sortedCustomers = useMemo(() => {
    if (!customers) return [];
    return [...customers].sort((a, b) => b.totalPoints - a.totalPoints);
  }, [customers]);

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
        Customer Rewards Summary
      </h2>
      <p className="text-gray-500 mb-8">
        View total points earned over the 3-month period.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCustomers?.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onClick={() => navigate(`/customer/${customer.id}`)}
          />
        ))}
      </div>
    </main>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      totalPoints: PropTypes.number.isRequired,
      monthlyPoints: PropTypes.array,
      transactions: PropTypes.array,
    })
  ),
};

export default CustomerList;
