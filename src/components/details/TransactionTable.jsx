import React from "react";
import PropTypes from "prop-types";

export const TransactionTable = ({ transactions }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Points
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {transactions?.map((transaction, index) => (
          <tr
            key={transaction.id}
            className={index % 2 === 0 ? "bg-white" : "bg-indigo-50/50"}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {new Date(transaction.date + "T00:00:00").toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              ${transaction.amount.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-indigo-600">
              {transaction.points}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired,
    })
  ),
};
