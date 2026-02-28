const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submitBtn");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const themeToggle = document.getElementById("themeToggle");

/* DARK MODE */
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

passwordInput.oninput = () => {
  if (passwordInput.value.length > 0) {
    // Change 'eye' to 'togglePassword' to match your other code
    togglePassword.style.display = "inline-block";
  } else {
    togglePassword.style.display = "none";
  }
};

/* TOGGLE ONLY IF PASSWORD IS SET */
togglePassword.onclick = () => {
  // 1. Check if the password field is empty
  if (passwordInput.value.length === 0) {
    return; // Do nothing if no password is typed
  }

  // 2. Toggle the input type
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  // 3. Toggle the Font Awesome classes
  if (isPassword) {
    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
  }
};
//extra tips*****
// /* 1. PASSWORD EYE LOGIC */
// passwordInput.oninput = () => {
//   // Show/Hide icon
//   togglePassword.style.display = passwordInput.value.length > 0 ? "inline-block" : "none";

//   // Your existing strength bar logic here...
// };

// togglePassword.onclick = () => {
//   const isPassword = passwordInput.type === "password";
//   passwordInput.type = isPassword ? "text" : "password";
//   togglePassword.classList.toggle("fa-eye");
//   togglePassword.classList.toggle("fa-eye-slash");
// };

/* 2. CONFIRM PASSWORD EYE LOGIC */
confirmInput.oninput = () => {
  // Show/Hide icon
  toggleConfirmPassword.style.display =
    confirmInput.value.length > 0 ? "inline-block" : "none";
  validateForm();
};

toggleConfirmPassword.onclick = () => {
  const isPassword = confirmInput.type === "password";
  confirmInput.type = isPassword ? "text" : "password";
  toggleConfirmPassword.classList.toggle("fa-eye");
  toggleConfirmPassword.classList.toggle("fa-eye-slash");
};

/* PASSWORD STRENGTH */
passwordInput.addEventListener("input", () => {
  let p = passwordInput.value;
  let strength = 0;

  if (p.length >= 8) strength++;
  if (/[a-z]/.test(p)) strength++;
  if (/[A-Z]/.test(p)) strength++;
  if (/\d/.test(p)) strength++;
  if (/[^A-Za-z0-9]/.test(p)) strength++;

  const levels = ["0%", "25%", "50%", "75%", "100%"];
  const colors = ["red", "orange", "yellow", "lightgreen", "green"];

  strengthFill.style.width = levels[strength];
  strengthFill.style.background = colors[strength];

  validateForm();
});

/* VALIDATION */
function validateForm() {
  let valid = true;

  // NAME
  if (!/^[A-Za-z\s]{3,}$/.test(nameInput.value)) {
    nameInput.className = "invalid";
    valid = false;
  } else nameInput.className = "valid";

  // EMAIL
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.className = "invalid";
    valid = false;
  } else emailInput.className = "valid";

  // PASSWORD MATCH
  if (passwordInput.value !== confirmInput.value || confirmInput.value === "") {
    confirmInput.className = "invalid";
    valid = false;
  } else confirmInput.className = "valid";

  submitBtn.disabled = !valid;
}

[nameInput, emailInput, confirmInput].forEach((i) =>
  i.addEventListener("input", validateForm)
);
