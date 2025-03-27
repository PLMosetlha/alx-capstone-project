import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Dashboard = ({ user, setUser }) => {
  const [income, setIncome] = useState(user.income || 0);
  const [expenses, setExpenses] = useState(user.expenses || []);
  const [savingsGoals, setSavingsGoals] = useState(user.savingsGoals || []);
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [goalDesc, setGoalDesc] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [saveMessage, setSaveMessage] = useState(""); // State for save notification
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
      setIncome(storedUser.income);
      setExpenses(storedUser.expenses);
      setSavingsGoals(storedUser.savingsGoals);
    }
  }, [setUser]);

  // Update local storage with updated user data
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addExpense = () => {
    if (
      !expenseDesc ||
      !expenseAmount ||
      isNaN(expenseAmount) ||
      expenseAmount <= 0
    )
      return;

    const newExpense = {
      description: expenseDesc,
      amount: parseFloat(expenseAmount),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);

    // Update income after expense is added
    setIncome((prevIncome) => {
      const newIncome = prevIncome - parseFloat(expenseAmount);
      return newIncome >= 0 ? newIncome : 0;
    });

    updateUser({ ...user, expenses: updatedExpenses, income });
    setExpenseDesc("");
    setExpenseAmount("");
  };

  const handleExpenseAmountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setExpenseAmount(value);
    } else {
      setExpenseAmount("");
    }
  };

  const handleIncomeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setIncome(value);
    }
  };

  const handleSaveChanges = () => {
    // Save updated expenses and income to localStorage
    updateUser({ ...user, expenses, income, savingsGoals });
    console.log("Changes saved to localStorage");

    // Set save message notification
    setSaveMessage("Changes have been saved!");

    // Hide the message after 3 seconds
    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const addSavingsGoal = () => {
    if (!goalDesc || !goalAmount || isNaN(goalAmount) || goalAmount <= 0)
      return;

    const newGoal = { goal: goalDesc, amount: parseFloat(goalAmount) };
    const updatedGoals = [...savingsGoals, newGoal];
    setSavingsGoals(updatedGoals);
    updateUser({ ...user, savingsGoals: updatedGoals });

    setGoalDesc("");
    setGoalAmount("");
  };

  const deleteSavingsGoal = (index) => {
    const updatedGoals = savingsGoals.filter((goal, i) => i !== index);
    setSavingsGoals(updatedGoals);
    updateUser({ ...user, savingsGoals: updatedGoals });
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((expense, i) => i !== index);
    setExpenses(updatedExpenses);

    // Recalculate income after deleting an expense
    const expenseToDelete = expenses[index];
    setIncome((prevIncome) => prevIncome + expenseToDelete.amount);

    updateUser({ ...user, expenses: updatedExpenses, income });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <h3>Income: ${income}</h3>
      <input
        type="number"
        value={income}
        onChange={handleIncomeChange}
        placeholder="Enter budget"
      />
      <h3>Expenses</h3>
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>
            {exp.description}: ${exp.amount}
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Expense Description"
        value={expenseDesc}
        onChange={(e) => setExpenseDesc(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={expenseAmount}
        onChange={handleExpenseAmountChange}
      />
      <button onClick={addExpense}>Add Expense</button>

      <h3>Savings Goals</h3>
      <ul>
        {savingsGoals.map((goal, index) => (
          <li key={index}>
            {goal.goal}: ${goal.amount}
            <button onClick={() => deleteSavingsGoal(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Goal Description"
        value={goalDesc}
        onChange={(e) => setGoalDesc(e.target.value)}
      />
      <input
        type="number"
        placeholder="Goal Amount"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
      />
      <button onClick={addSavingsGoal}>Add Goal</button>

      <button onClick={handleSaveChanges}>Save Changes</button>

      {/* Display save message */}
      {saveMessage && <p className="save-message">{saveMessage}</p>}

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
