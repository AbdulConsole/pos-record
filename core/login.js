document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('auth.json');
    const data = await response.json();
    
    // Check if the email and password match any user in the JSON file
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));  // Store user info if needed
      window.location.href = 'index.html';
    } else {
      document.getElementById('errorMsg').style.display = 'block';
    }
  } catch (error) {
    document.getElementById('loginError').textContent = 'Invalid email 📨 or password 🔑', error;
  }
});
