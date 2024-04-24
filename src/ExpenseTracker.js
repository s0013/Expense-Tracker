import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [editTransactionId, setEditTransactionId] = useState(null);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    const storedTotalIncome = JSON.parse(localStorage.getItem('totalIncome'));

    if (storedTransactions) {
      setTransactions(storedTransactions);
    }

    if (storedTotalIncome !== null) {
      setTotalIncome(storedTotalIncome);
    } else {
      setTotalIncome(0); // Prompt user to input total income again
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('totalIncome', JSON.stringify(totalIncome));
    calculateRemainingBalance();
  }, [transactions, totalIncome]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (text.trim() === '' || amount.trim() === '') return;
  
    if (editTransactionId !== null) {
      // Edit mode
      const updatedTransactions = transactions.map(transaction =>
        transaction.id === editTransactionId
          ? { ...transaction, text, amount: +amount }
          : transaction
      );
      setTransactions(updatedTransactions);
      setEditTransactionId(null); // Exit edit mode
  
      // Recalculate total expense after editing
      const updatedExpense = updatedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
      setExpense(updatedExpense);
    } else {
      // Add mode
      const newTransaction = {
        id: Math.floor(Math.random() * 1000000),
        text,
        amount: +amount
      };
      setTransactions([...transactions, newTransaction]);
      setExpense(expense + Number(amount));
    }
  
    setText('');
    setAmount('');
  };
  
  const editTransaction = (id) => {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);
    if (transactionToEdit) {
      setText(transactionToEdit.text);
      setAmount(transactionToEdit.amount.toString());
      setEditTransactionId(id);
    }
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    // Recalculate expense after deleting the transaction
    const updatedExpense = updatedTransactions.reduce((acc, curr) => acc + curr.amount, 0);
    setExpense(updatedExpense);
  };

  const calculateRemainingBalance = () => {
    const remaining = totalIncome - expense;
    setRemainingBalance(remaining);
  };

  const handleTotalIncomeSubmit = (e) => {
    e.preventDefault();
    setTotalIncome(Number(amount));
    setRemainingBalance(Number(amount));
    setAmount('');
  };
  return (
    <div className="container mt-5" style={{
        height: '92vh'
      }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="border p-4">
            <h2>Expense Tracker</h2>
            {totalIncome === 0 && (
              <div className="row mb-4">
                <div className="col">
                  <form onSubmit={handleTotalIncomeSubmit}>
                    <label htmlFor="income" className="form-label">Enter Total Income:</label>
                    <input type="number" id="income" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control mb-3" />
                    <button type="submit" className="btn btn-primary">Add</button>
                  </form>
                </div>
              </div>
            )}
            {totalIncome > 0 && (
              <div>
               <div className="row mb-4">
  <div className="col">
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title" style={{ color: 'black' }}>Total Income</h5>
        <p className="card-text" style={{ color: 'black' }}>${totalIncome}</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title" style={{ color: 'black' }}>Total Expense</h5>
        <p className="card-text" style={{ color: 'black' }}>${expense}</p>
      </div>
    </div>
  </div>
  <div className="w-100"></div> {/* Add a line break on small devices */}
  <div className="col">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title" style={{ color: 'black' }}>Remaining Balance</h5>
        <p className="card-text" style={{ color: 'black' }}>${remainingBalance}</p>
      </div>
    </div>
  </div>
</div>


                <div className="row">
                  <div className="col">
                    <form onSubmit={addTransaction}>
                      <div className="mb-3">
                        <label htmlFor="text" className="form-label">Transaction Description:</label>
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Transaction Amount:</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control" />
                      </div>
                      <button type="submit" className="btn btn-primary">{editTransactionId !== null ? 'Edit Transaction' : 'Add Transaction'}</button>
                    </form>
                  </div>
                  <div className="col">
                    <div>
                      <h3 className="mt-4">Transactions</h3>
                      <ul className="list-group">
                        {transactions.map(transaction => (
                          <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              {transaction.text} (${transaction.amount})
                            </div>
                            <div className="col">
                             <div className="d-flex justify-content-end">
                              <button className="btn btn-warning btn-sm me-2" onClick={() => editTransaction(transaction.id)}>Edit</button>
                              <button className="btn btn-danger btn-sm" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                             </div>
                            </div>

                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default ExpenseTracker;
