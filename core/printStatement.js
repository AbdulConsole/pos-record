document.getElementById('printBtn').addEventListener('click', async function () {
  // Fetch the email from auth.json
  const response = await fetch('auth.json');
  const credentials = await response.json();
  const businessName = credentials.username;

  // Create the print content
  let printContent = `
    <h1 style="text-align: center;">${businessName}</h1>
    <h2 style="text-align: center;">Transaction History</h2>
    <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Narration</th>
        </tr>
      </thead>
      <tbody>
  `;

  transactionHistory.forEach(transaction => {
    printContent += `
      <tr>
        <td>${transaction.date}</td>
        <td>${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
        <td>₦${transaction.amount}</td>
        <td>₦${transaction.balance}</td>
        <td>${transaction.narration}</td>
      </tr>
    `;
  });

  printContent += `
      </tbody>
    </table>
  `;

  // Open a new window for the print view
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Transactions</title>
        <style>
          table { margin: 20px 0; }
          th, td { padding: 8px 12px; border: 1px solid #ddd; }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
});