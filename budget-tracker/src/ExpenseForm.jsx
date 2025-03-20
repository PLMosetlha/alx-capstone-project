import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && amount) {
      addExpense({ name, amount: parseFloat(amount) }); // Call addExpense function passed as a prop
      setName("");
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
