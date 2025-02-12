let terminalBalance = 0;
let cashAtHand = 0;
const transactionForm = document.getElementById('transactionForm');
const terminalBalanceDisplay = document.getElementById('terminalBalance');
const cashAtHandDisplay = document.getElementById('cashAtHand');
const transactionTable = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];

transactionForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const transactionType = document.getElementById('transactionType').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const narration = document.getElementById('narration').value;

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }
  if (!narration) {
    alert('Please enter a narration.');
    return;
  }

  let newBalance = terminalBalance;
  switch (transactionType) {
    case 'deposit-in-cash':
      cashAtHand += amount;
      break;
    case 'deposit':
      newBalance += amount;
      cashAtHand += amount;
      break;
    case 'withdrawal':
      if (amount > cashAtHand) {
        alert('Insufficient cash at hand.');
        return;
      }
      newBalance -= amount;
      cashAtHand -= amount;
      break;
    case 'transfer':
      newBalance -= amount;
      break;
    case 'savings':
      newBalance -= amount;
      break;
  }

  terminalBalance = newBalance;

  updateBalances();
  addTransactionToTable(transactionType, amount, terminalBalance, cashAtHand, narration);

  transactionForm.reset();
});

function updateBalances() {
  terminalBalanceDisplay.textContent = `₦${terminalBalance.toFixed(2)}`;
  cashAtHandDisplay.textContent = `₦${cashAtHand.toFixed(2)}`;
}

function addTransactionToTable(type, amount, balance, cashAtHand, narration) {
  
  const noTransactionRow = document.querySelector('#transactionTable tbody tr');
  
  // Remove "No transactions yet." message if it exists
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

  const currentDate = new Date().toLocaleString();
  dateCell.textContent = currentDate;
  typeCell.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  amountCell.textContent = `₦${amount.toFixed(2)}`;
  balanceCell.textContent = `₦${balance.toFixed(2)}`;
  cashAtHandCell.textContent = `₦${cashAtHand.toFixed(2)}`;
  narrationCell.textContent = narration;
}
