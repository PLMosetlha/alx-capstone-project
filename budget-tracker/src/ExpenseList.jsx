import React from "react";
import useStore from "./useStore";
const ExpenseList = () => {
  const { expenses, deleteExpense } = useStore((state) => state);

  const handleDelete = (expenseName) => {
    deleteExpense(expenseName); // Call the deleteExpense function
  };

  return (
    <ul className="expense-list">
      {expenses.map((expense, index) => (
        <li key={index}>
          {expense.name}: ${expense.amount}{" "}
          <button onClick={() => handleDelete(expense.name)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
