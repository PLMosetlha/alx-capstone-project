import React from "react";

const ExpenseList = ({ expenses, deleteExpense }) => {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {expense.name}: ${expense.amount}
          <button onClick={() => deleteExpense(expense.id)}>Delete</button>{" "}
          {/* Delete button */}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
