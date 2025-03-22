import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import useStore from "./useStore";

const BudgetTracker = () => {
  const { budget, expenses, setBudget } = useStore((state) => state);
  const [newBudget, setNewBudget] = useState(budget);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const balance = budget - totalExpenses;

  const handleBudgetChange = (e) => {
    setNewBudget(e.target.value);
  };

  const updateBudget = () => {
    setBudget(Number(newBudget));
  };

  return (
    <div className="budget-tracker">
      <h1>Budget Tracker</h1>
      <div className="budget-summary">
        <p>Budget: ${budget}</p>
        <p>Expenses: ${totalExpenses}</p>
        <p>Balance: ${balance}</p>
      </div>

      <div className="budget-update">
        <input
          type="number"
          value={newBudget}
          onChange={handleBudgetChange}
          placeholder="Enter new budget"
        />
        <button onClick={updateBudget}>Update Budget</button>
      </div>

      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default BudgetTracker;
