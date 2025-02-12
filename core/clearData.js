document.getElementById('clearDataBtn').addEventListener('click', function () {
  const confirmation = confirm('Are you sure you want to clear all data? This action cannot be undone.');

  if (confirmation) {
    // Clear all local storage data
    localStorage.removeItem('terminalBalance');
    localStorage.removeItem('cashAtHand');
    localStorage.removeItem('transactionHistory');
    
    // Reset balances and refresh the page
    terminalBalance = 0;
    cashAtHand = 0;
    document.querySelector('tbody').innerHTML = '<tr><td colspan="5">No transactions yet.</td></tr>';
    updateBalances();
    
    alert('All data has been cleared.');
    location.reload();  // Reload the page to reflect the reset state
  }
});