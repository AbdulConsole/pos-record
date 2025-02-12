//Logout Function
document.getElementById('logoutBtn').addEventListener('click', function () {
  localStorage.removeItem('authenticated');
  window.location.href = 'login.html';
});
// Grabbing DOM form, balances, history
const transactionForm = document.getElementById('transactionForm');
const terminalBalanceDisplay = document.getElementById('terminalBalance');
const cashAtHandDisplay = document.getElementById('cashAtHand');
const transactionTable = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
// LocalStorage Items initialization 
var terminalBalance = parseFloat(localStorage.getItem('terminalBalance')) || 0;
let cashAtHand = parseFloat(localStorage.getItem('cashAtHand')) || 0;
var transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
// Invoking Instantiation functions
updateBalances();
loadTransactionHistory();
// Update local storage while recording a transaction
transactionForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const transactionType = document.getElementById('transactionType').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const narration = document.getElementById('narration').value.trim();
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }
  if (!narration) {
    alert('Please enter a narration.');
    return;
  }
  // switch for functions
  let newBalance = terminalBalance;
  switch (transactionType) {
    case 'deposit-in-cash':
      cashAtHand += amount;
      break;
    case 'deposit':
      newBalance += amount;
      //cashAtHand += amount;
      break;
    case 'withdrawal':
      if (amount > cashAtHand) {
        alert('Insufficient cash at hand.');
        return;
      }
      newBalance += amount;
      cashAtHand -= amount;
      break;
    case 'transfer':
      if (amount > newBalance) {
        alert('Insufficient cash on machine.');
        return;
      }
      newBalance -= amount;
      break;
    case 'savings':
      newBalance -= amount;
      break;
  }

  terminalBalance = newBalance;
  updateBalances();

  const transaction = {
    date: new Date().toLocaleString(),
    type: transactionType,
    amount: amount.toFixed(2),
    balance: terminalBalance.toFixed(2),
    cashAtHand: cashAtHand.toFixed(2),
    narration: narration
  };

  transactionHistory.push(transaction);
  localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
  addTransactionToTable(transaction);

  transactionForm.reset();
});

function updateBalances() {
  terminalBalanceDisplay.textContent = `₦${terminalBalance.toFixed(2)}`;
  cashAtHandDisplay.textContent = `₦${cashAtHand.toFixed(2)}`;
  // Persist balances in local storage
  localStorage.setItem('terminalBalance', terminalBalance.toFixed(2));
  localStorage.setItem('cashAtHand', cashAtHand.toFixed(2));
}

function loadTransactionHistory() {
  transactionHistory.forEach(addTransactionToTable);
}

function addTransactionToTable(transaction) {
  const noTransactionRow = document.querySelector('#transactionTable tbody tr');
  if (noTransactionRow && noTransactionRow.cells.length === 1) {
    noTransactionRow.remove();
  }

  const row = transactionTable.insertRow();
  const dateCell = row.insertCell(0);
  const typeCell = row.insertCell(1);
  const amountCell = row.insertCell(2);
  const balanceCell = row.insertCell(3);
  const cashAtHandCell = row.insertCell(4);
  const narrationCell = row.insertCell(5);

  dateCell.textContent = transaction.date;
  typeCell.textContent = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);
  amountCell.textContent = `₦${transaction.amount}`;
  balanceCell.textContent = `₦${transaction.balance}`;
  cashAtHandCell.textContent = `₦${cashAtHand.toFixed(2)}`;
  narrationCell.textContent = transaction.narration;
}

