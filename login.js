document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Fetch credentials from auth.json
  const response = await fetch('auth.json');
  const credentials = await response.json();

  if (email === credentials.email && password === credentials.password) {
    localStorage.setItem('authenticated', true);
    window.location.href = 'index.html';  // Redirect to the main app
  } else {
    document.getElementById('loginError').textContent = 'Invalid email or password.';
  }
});