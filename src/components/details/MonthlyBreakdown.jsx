import PropTypes from "prop-types";

export const MonthlyBreakdown = ({ monthlyPoints }) => (
  <div className="divide-y divide-gray-100">
    {monthlyPoints?.map((month) => (
      <div
        key={month.monthKey}
        className="flex justify-between items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-indigo-50 transition duration-150"
      >
        <span className="font-medium text-gray-700">{month.monthName}</span>
        <div className="text-right">
          <span className="text-xl font-extrabold text-indigo-600 block leading-none">
            {month.totalPoints} pts
          </span>
          <p className="text-xs text-gray-500 mt-0.5">
            (${month.totalSpending.toFixed(2)} spent)
          </p>
        </div>
      </div>
    ))}
  </div>
);

MonthlyBreakdown.propTypes = {
  monthlyPoints: PropTypes.arrayOf(
    PropTypes.shape({
      monthKey: PropTypes.string.isRequired,
      monthName: PropTypes.string.isRequired,
      totalPoints: PropTypes.number.isRequired,
      totalSpending: PropTypes.number.isRequired,
    })
  ).isRequired,
};
