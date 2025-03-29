import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Dashboard = ({ user, setUser }) => {
  const [initialAmount, setInitialAmount] = useState(user.income || 0);
  const [income, setIncome] = useState(user.income || 0);
  const [expenses, setExpenses] = useState(user.expenses || []);
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("essential");
  const [savingsGoals, setSavingsGoals] = useState(user.savingsGoals || []);
  const [goalDesc, setGoalDesc] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [remainingBudget, setRemainingBudget] = useState(user.income || 0);
  const [insightColor, setInsightColor] = useState("green");
  const [bounce, setBounce] = useState(false);
  const [financialTips, setFinancialTips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateBudget();
  }, [expenses, savingsGoals]);

  const updateBudget = () => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalSavings = savingsGoals.reduce(
      (sum, goal) => sum + goal.amount,
      0
    );
    const updatedIncome = initialAmount - totalExpenses - totalSavings;
    setIncome(updatedIncome);
    setRemainingBudget(updatedIncome);
    setInsights(totalExpenses, updatedIncome);
  };

  const setInsights = (totalExpenses, updatedIncome) => {
    if (totalExpenses > updatedIncome) {
      setInsightColor("red");
      setBounce(true);
    } else {
      setInsightColor("green");
      setBounce(true);
    }

    if (totalExpenses > updatedIncome) {
      setFinancialTips([
        "Consider cutting back on non-essential expenses.",
        "Create a strict budget to track spending.",
        "Focus on saving first, then spend on essentials!",
      ]);
    } else {
      setFinancialTips([
        "Good job! Keep monitoring your expenses.",
        "Consider saving more to reach your financial goals.",
        "Avoid unnecessary purchases and stay within your budget.",
      ]);
    }
  };

  const addExpense = () => {
    if (!expenseDesc || !expenseAmount) return;
    const newExpenses = [
      ...expenses,
      {
        description: expenseDesc,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
      },
    ];
    setExpenses(newExpenses);
    setExpenseDesc("");
    setExpenseAmount("");
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const addSavingsGoal = () => {
    if (!goalDesc || !goalAmount) return;
    const newGoal = { description: goalDesc, amount: parseFloat(goalAmount) };
    setSavingsGoals([...savingsGoals, newGoal]);
    setGoalDesc("");
    setGoalAmount("");
  };

  const deleteSavingsGoal = (index) => {
    const newGoals = savingsGoals.filter((_, i) => i !== index);
    setSavingsGoals(newGoals);
  };

  const handleIncomeChange = (e) => {
    const newIncome = parseFloat(e.target.value) || 0;
    setInitialAmount(newIncome);
    setIncome(newIncome);
    setRemainingBudget(newIncome);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}!</h2>
      <h3>Initial Amount: ${initialAmount}</h3>
      <h3>Income Budget: ${income}</h3>
      <input
        type="number"
        placeholder="Set Income Budget"
        value={income}
        onChange={handleIncomeChange}
      />
      <h3>Expense Summary</h3>
      <p>
        Total Expenses: ${expenses.reduce((sum, exp) => sum + exp.amount, 0)}
      </p>
      <p>
        Total Savings: $
        {savingsGoals.reduce((sum, goal) => sum + goal.amount, 0)}
      </p>
      <p>Remaining Budget: ${remainingBudget}</p>
      <h3>Add Expense</h3>
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
        onChange={(e) => setExpenseAmount(e.target.value)}
      />
      <select
        id="category"
        value={expenseCategory}
        onChange={(e) => setExpenseCategory(e.target.value)}
      >
        <option value="essential">Essential</option>
        <option value="non-essential">Non-Essential</option>
      </select>
      <button onClick={addExpense}>Add Expense</button>
      <h3>Expenses</h3>
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>
            {exp.description}: ${exp.amount} - {exp.category}{" "}
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Savings Goals</h3>
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
      <button onClick={addSavingsGoal}>Add Savings Goal</button>
      <ul>
        {savingsGoals.map((goal, index) => (
          <li key={index}>
            {goal.description}: ${goal.amount}{" "}
            <button onClick={() => deleteSavingsGoal(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Smart Insights Section */}
      <div>
        <h3>Smart Insights</h3>
        <p
          className={`insight-message ${insightColor} ${
            bounce ? "bounce-alert" : ""
          }`}
        >
          {insightColor === "green"
            ? `Great job! You're within your budget! 👍`
            : `You're overspending! Consider cutting back! 😞`}
        </p>
      </div>

      {/* Financial Tips Section */}
      <h3>Financial Tips</h3>
      <ul>
        {financialTips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
