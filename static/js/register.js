function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const message = document.getElementById("message");

  if (!username || !password) {
    message.textContent = "Username and password are required";
    message.style.display = "block";
    return;
  }

  fetch("/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  })
    .then((response) => response.json())
    .then((data) => {
      message.textContent = data.message;
      message.className = response.status === 201 ? "success" : "error";
      message.style.display = "block";
      if (response.status === 201) {
        setTimeout(() => (window.location.href = "/login/"), 1000); // Chuyển hướng sau 1 giây
      }
    })
    .catch((error) => {
      message.textContent = "An error occurred";
      message.style.display = "block";
    });
}
