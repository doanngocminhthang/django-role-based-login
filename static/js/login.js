function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");
  const button = document.querySelector("button");
  let loading = false;

  if (!username || !password) {
    message.textContent = "Username and password are required";
    message.style.display = "block";
    return;
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)) {
    message.textContent = "Please enter a valid email or username";
    message.style.display = "block";
    return;
  }
  if (password.length < 8) {
    message.textContent = "Password must be at least 8 characters";
    message.style.display = "block";
    return;
  }

  if (loading) return;
  loading = true;
  button.textContent = "Logging in...";
  button.disabled = true;

  fetch("/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      message.textContent = data.message;
      message.className = response.status === 200 ? "success" : "error";
      message.style.display = "block";
      if (response.status === 200) {
        setTimeout(() => (window.location.href = "/user/"), 1000);
      }
    })
    .catch((error) => {
      message.textContent = "An error occurred";
      message.style.display = "block";
    })
    .finally(() => {
      loading = false;
      button.textContent = "Login";
      button.disabled = false;
    });
}
