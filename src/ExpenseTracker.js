import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  // State to store expenses for each month
  const [expenses, setExpenses] = useState({});
  // State to store total income for each month
  const [income, setIncome] = useState({});
  // State to store selected month
  const [selectedMonth, setSelectedMonth] = useState('');
  // State to store salary for the selected month
  const [salary, setSalary] = useState(0);
  // State to store remaining balance for the selected month
  const [remainingBalance, setRemainingBalance] = useState(0);
  // State to store expense details
  const [expenseDetails, setExpenseDetails] = useState({
    date: '',
    name: '',
    amount: 0
  });
  // State to track the index of the expense being edited
  const [editIndex, setEditIndex] = useState(null);

  // Update remaining balance whenever expenses or income change, or when the selected month changes
useEffect(() => {
    if (selectedMonth && income[selectedMonth] !== undefined) {
      const totalExpenses = calculateTotalExpenses(expenses[selectedMonth]);
      const remaining = income[selectedMonth] - totalExpenses;
      setRemainingBalance(remaining);
    } else {
      setRemainingBalance(0); // Set remaining balance to 0 if no income is set for the selected month
  }
  }, [expenses, income, selectedMonth]);
  
  // Update remaining balance whenever expenses or income change
  useEffect(() => {
    if (selectedMonth && income[selectedMonth] !== undefined) {
      const totalExpenses = calculateTotalExpenses(expenses[selectedMonth]);
      const remaining = income[selectedMonth] - totalExpenses;
      setRemainingBalance(remaining);
    }
  }, [expenses, income, selectedMonth]);

  // Function to add expense for a specific month
  const addExpense = () => {
    const expense = { ...expenseDetails };
    const updatedExpenses = { ...expenses, [selectedMonth]: [...(expenses[selectedMonth] || []), expense] };
    setExpenses(updatedExpenses);
    // Update local storage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    // Reset expense details
    setExpenseDetails({
      date: '',
      name: '',
      amount: 0
    });
  };

  // Function to handle adding income for a specific month
  const handleAddIncome = () => {
    const updatedIncome = { ...income, [selectedMonth]: salary };
    setIncome(updatedIncome);
    // Update local storage
    localStorage.setItem('income', JSON.stringify(updatedIncome));
  };

  // Function to calculate the total expense amount for a given list of expenses
  const calculateTotalExpenses = (expenses) => {
    if (!expenses || expenses.length === 0) return 0;
    return expenses.reduce((total, exp) => total + exp.amount, 0);
  };

  // Function to handle editing an expense
  const handleEditExpense = (index) => {
    setEditIndex(index);
    const expenseToEdit = expenses[selectedMonth][index];
    setExpenseDetails({ ...expenseToEdit });
  };

  // Function to handle deleting an expense
  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses[selectedMonth]];
    updatedExpenses.splice(index, 1);
    const updatedExpenseObj = { ...expenses, [selectedMonth]: updatedExpenses };
    setExpenses(updatedExpenseObj);
    // Update local storage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenseObj));
  };

  // Function to save the edited expense
  const saveEditedExpense = () => {
    const updatedExpenses = [...expenses[selectedMonth]];
    updatedExpenses[editIndex] = { ...expenseDetails };
    const updatedExpenseObj = { ...expenses, [selectedMonth]: updatedExpenses };
    setExpenses(updatedExpenseObj);
    // Update local storage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenseObj));
    // Reset edit state
    setEditIndex(null);
    setExpenseDetails({
      date: '',
      name: '',
      amount: 0
    });
  };

  // Render expenses for the selected month
  const renderExpenses = () => {
    const monthExpenses = expenses[selectedMonth] || [];
    const totalExpenses = calculateTotalExpenses(monthExpenses);

    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-black">Expenses for {selectedMonth}</h3>
          <h4 className="card-subtitle mb-2 text-muted">Total Expense Amount: ${totalExpenses}</h4>
          <h4 className="card-subtitle mb-2 text-muted">Remaining Balance: ${remainingBalance}</h4>
          <div className="table-responsive">
  <table className="table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Expense Name</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {monthExpenses.map((expense, index) => (
        <tr key={index}>
          <td>{expense.date}</td>
          <td>
            {editIndex === index ? (
              <input
                type="text"
                value={expenseDetails.name}
                onChange={(e) => setExpenseDetails({ ...expenseDetails, name: e.target.value })}
                className="form-control"
              />
            ) : (
              expense.name
            )}
          </td>
          <td>
            {editIndex === index ? (
              <input
                type="number"
                value={expenseDetails.amount}
                onChange={(e) => setExpenseDetails({ ...expenseDetails, amount: parseFloat(e.target.value) })}
                className="form-control"
              />
            ) : (
              `$${expense.amount}`
            )}
          </td>
          <td>
            <div className="btn-group" role="group" aria-label="Expense Actions">
              {editIndex === index ? (
                <>
                  <button onClick={saveEditedExpense} className="btn btn-primary">Save</button>
                  <button onClick={() => setEditIndex(null)} className="btn btn-secondary">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditExpense(index)} className="btn btn-warning">Edit</button>
                  <button onClick={() => handleDeleteExpense(index)} className="btn btn-danger">Delete</button>
                </>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Expense Tracker</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title text-black">Select Month and Add Income</h3>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="form-select mb-3">
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>

              </select>
              <input type="number" value={salary} onChange={(e) => setSalary(parseFloat(e.target.value))} className="form-control mb-3" />
              <button onClick={handleAddIncome} className="btn btn-success">Add Income</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {selectedMonth && (
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title text-black">Total Income: ${income[selectedMonth] || 0}</h3>
                <div className="mb-3">
  <h3 className="card-title text-black">Add Expense</h3>
  <label htmlFor="expenseDate" className="form-label  text-black">Date:</label>
  <input type="date" id="expenseDate" value={expenseDetails.date} onChange={(e) => setExpenseDetails({ ...expenseDetails, date: e.target.value })} className="form-control mb-2" />
  <label htmlFor="expenseName" className="form-label  text-black">Name Of Expense:</label>
  <input type="text" id="expenseName" value={expenseDetails.name} onChange={(e) => setExpenseDetails({ ...expenseDetails, name: e.target.value })} className="form-control mb-2" />
  <label htmlFor="expenseAmount" className="form-label  text-black">Amount:</label>
  <input type="number" id="expenseAmount" value={expenseDetails.amount} onChange={(e) => setExpenseDetails({ ...expenseDetails, amount: parseFloat(e.target.value) })} className="form-control mb-2" />
  <button onClick={addExpense} className="btn btn-primary">Add Expense</button>
</div>


                {renderExpenses()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
