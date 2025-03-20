import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique IDs
import ExpenseForm from "./ExpenseForm"; // Import ExpenseForm component
import ExpenseList from "./ExpenseList"; // Import ExpenseList component

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: uuidv4() }]); // Add a new expense
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id)); // Delete an expense
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div>
      <h1>Budget Tracker</h1>
      <input
        type="number"
        placeholder="Enter Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        min="0"
      />
      <h2>Budget: ${budget}</h2>
      <h3>Total Expenses: ${calculateTotalExpenses()}</h3>
      <h3>Remaining Budget: ${budget - calculateTotalExpenses()}</h3>
      <ExpenseForm addExpense={addExpense} /> {/* Render ExpenseForm */}
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />{" "}
      {/* Render ExpenseList */}
    </div>
  );
};

export default BudgetTracker;
