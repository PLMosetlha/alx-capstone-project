import { create } from "zustand";
const useStore = create((set) => ({
  expenses: [],
  budget: 0,
  user: null,
  setBudget: (budget) => set({ budget }), // Add this line to set the budget
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
  deleteExpense: (expenseName) =>
    set((state) => ({
      expenses: state.expenses.filter(
        (expense) => expense.name !== expenseName
      ),
    })),
  setUser: (user) => set({ user }),
}));

export default useStore;
