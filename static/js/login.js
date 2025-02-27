function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  if (!username || !password) {
    message.textContent = "Username and password are required";
    message.style.display = "block";
    return;
  }

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
    });
}
