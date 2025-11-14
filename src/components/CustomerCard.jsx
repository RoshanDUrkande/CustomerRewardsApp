import React from "react";
import PropTypes from "prop-types";
import { ArrowRight } from "lucide-react";

const CustomerCard = ({ customer, onClick }) => {
  const badgeClasses =
    customer.totalPoints > 200
      ? "bg-green-500 text-white"
      : customer.totalPoints > 100
      ? "bg-yellow-400 text-gray-900"
      : "bg-gray-400 text-white";

  return (
    <div
      className="bg-white rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between"
      onClick={() => onClick(customer.id)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900 truncate max-w-[80%]">
            {customer.name}
          </h2>
          <span
            className={`text-xl font-extrabold px-3 py-1 rounded-full ${badgeClasses}`}
          >
            {customer.totalPoints}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">ID: {customer.id}</p>

        <div className="border-t border-b border-gray-200 divide-y divide-gray-100 mt-4">
          <p className="text-xs font-semibold text-gray-500 py-1 uppercase tracking-wider">
            Last 3 Months Points
          </p>
          {customer.monthlyPoints.slice(-3).map((month) => (
            <div
              key={month.monthKey}
              className="flex justify-between items-center py-1.5"
            >
              <span className="text-sm text-gray-600">
                {month.monthName.split(" ")[0]}
              </span>
              <span className="text-base font-semibold text-indigo-600">
                {month.totalPoints} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="p-3 text-indigo-600 font-semibold flex items-center justify-center hover:bg-indigo-50 transition-colors w-full rounded-b-xl border-t border-gray-100"
        aria-label={`View details for ${customer.name}`}
      >
        View Full Activity
        <ArrowRight />
      </button>
    </div>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalPoints: PropTypes.number.isRequired,
    monthlyPoints: PropTypes.array,
  }),
  onClick: PropTypes.func.isRequired,
};

export default CustomerCard;
