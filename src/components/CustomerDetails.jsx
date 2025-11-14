import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";
import { StatCard } from "./shared/StatCard.jsx";
import { MonthlyBreakdown } from "./details/MonthlyBreakdown.jsx";
import { TransactionTable } from "./details/TransactionTable.jsx";

const CustomerDetails = ({ customer, onBack }) => {
  if (!customer)
    return (
      <div className="p-10 text-center text-gray-500">
        Customer data not found.
      </div>
    );

  const totalSpending = customer.transactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft className="mr-2" />
        Back to List
      </button>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Activity for {customer.name}
      </h2>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Points"
          value={customer.totalPoints}
          unit="pts"
          color="indigo"
        />
        <StatCard
          title="Total Spent"
          value={`$${totalSpending.toFixed(2)}`}
          color="green"
        />
        <StatCard
          title="Transactions"
          value={customer.transactions.length}
          unit="txns"
          color="yellow"
        />
        <StatCard title="Customer ID" value={customer.id} color="gray" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Breakdown */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h5 className="text-xl font-semibold text-gray-800">
              Monthly Points Breakdown
            </h5>
            <p className="text-sm text-gray-500">
              Points earned each month based on spending.
            </p>
          </div>
          <MonthlyBreakdown monthlyPoints={customer.monthlyPoints} />
        </section>

        {/* Transaction History */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h5 className="text-xl font-semibold text-gray-800">
              Transaction History
            </h5>
            <p className="text-sm text-gray-500">
              Details of recent transactions and points awarded.
            </p>
          </div>
          <TransactionTable transactions={customer.transactions} />
        </section>
      </div>
    </main>
  );
};

CustomerDetails.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalPoints: PropTypes.number.isRequired,
    transactions: PropTypes.array.isRequired,
    monthlyPoints: PropTypes.array.isRequired,
  }),
  onBack: PropTypes.func.isRequired,
};

export default CustomerDetails;
