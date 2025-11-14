import { useState, useEffect } from "react";
import { mockTransactionData } from "../data/mockData";
import { calculateRewardPoints } from "../utils/rewardCalculator";

export const useRewardsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // default false
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockTransactionData), 100);
      });
    };

    const processData = (transactions) => {
      const customersMap = new Map();

      transactions.forEach((transaction) => {
        const { customerId, customerName, amount, date } = transaction;
        const transactionPoints = calculateRewardPoints(amount);
        const monthKey = date.substring(0, 7);
        const monthName = new Date(date + "T00:00:00").toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

        if (!customersMap.has(customerId)) {
          customersMap.set(customerId, {
            id: customerId,
            name: customerName,
            transactions: [],
            monthlyPoints: new Map(),
            totalPoints: 0,
          });
        }

        const customer = customersMap.get(customerId);
        const monthData = customer.monthlyPoints.get(monthKey) || {
          totalPoints: 0,
          totalSpending: 0,
        };
        monthData.totalPoints += transactionPoints;
        monthData.totalSpending += amount;
        monthData.monthName = monthName;
        customer.monthlyPoints.set(monthKey, monthData);

        customer.totalPoints += transactionPoints;
        customer.transactions.push({
          ...transaction,
          points: transactionPoints,
        });
      });

      return Array.from(customersMap.values()).map((customer) => ({
        ...customer,
        monthlyPoints: Array.from(customer.monthlyPoints.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([monthKey, data]) => ({ monthKey, ...data })),
        transactions: customer.transactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
      }));
    };

    fetchData()
      .then((rawTransactions) => setData(processData(rawTransactions)))
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setError("Failed to load rewards data. Please check your connection.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { customersData: data, loading, error };
};
