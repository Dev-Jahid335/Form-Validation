/* DOM ELEMENTS */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submitBtn");
const strengthFill = document.getElementById("strengthFill");
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const themeToggle = document.getElementById("themeToggle");
const myForm = document.getElementById("myForm");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const confirmError = document.getElementById("confirmError");

/* DARK MODE */
themeToggle.onclick = () => document.body.classList.toggle("dark");

/* 1. PASSWORD EYE LOGIC */
const handleEyeToggle = (input, icon) => {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
};

togglePassword.onclick = () => handleEyeToggle(passwordInput, togglePassword);
toggleConfirmPassword.onclick = () =>
  handleEyeToggle(confirmInput, toggleConfirmPassword);

[passwordInput, confirmInput].forEach((input) => {
  input.oninput = () => {
    const icon =
      input.id === "password" ? togglePassword : toggleConfirmPassword;
    icon.style.display = input.value.length > 0 ? "inline-block" : "none";
    validateField(input); // Immediate validation
  };
});

/* 2. STRENGTH BAR */
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
});

/* 3. IMMEDIATE VALIDATION LOGIC */
function validateField(input) {
  if (input === nameInput) {
    nameError.innerText =
      input.value.trim().length < 3 ? "Name must be at least 3 chars." : "";
  }

  if (input === emailInput) {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    emailError.innerText = !input.value.match(emailPattern)
      ? "Enter a valid email."
      : "";
  }

  if (input === confirmInput || input === passwordInput) {
    if (passwordInput.value.length < 8) {
      confirmError.innerText = "Password must be at least 8 characters.";
    } else if (passwordInput.value !== confirmInput.value) {
      confirmError.innerText = "Passwords do not match!";
    } else {
      confirmError.innerText = "";
    }
  }
}

// Attach immediate validation to all inputs
[nameInput, emailInput, passwordInput, confirmInput].forEach((i) =>
  i.addEventListener("input", () => validateField(i))
);

/* 4. SUBMIT LOGIC (ALWAYS ACTIVE) */
submitBtn.disabled = false; // Ensure button is always enabled

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Trigger all validations
  validateField(nameInput);
  validateField(emailInput);
  validateField(confirmInput);

  // Check if any errors exist
  const hasErrors =
    nameError.innerText !== "" ||
    emailError.innerText !== "" ||
    confirmError.innerText !== "";

  if (hasErrors) {
    // 1. Add the shake class to the container or form
    const container = document.querySelector(".container");
    container.classList.add("shake-error");

    // 2. Remove the class after animation ends (400ms) so it can shake again later
    setTimeout(() => {
      container.classList.remove("shake-error");
    }, 400);
  } else {
    alert("Form submitted successfully!");
    myForm.reset();
    strengthFill.style.width = "0%";
  }
});

// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const confirmInput = document.getElementById("confirmPassword");
// const submitBtn = document.getElementById("submitBtn");

// const strengthFill = document.getElementById("strengthFill");
// const strengthText = document.getElementById("strengthText");

// const togglePassword = document.getElementById("togglePassword");
// const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
// const themeToggle = document.getElementById("themeToggle");

// const myForm = document.getElementById("myForm");
// const nameError = document.getElementById("nameError");
// const emailError = document.getElementById("emailError");
// const password = document.getElementById("password");
// const confirmPassword = document.getElementById("confirmPassword");
// const confirmError = document.getElementById("confirmError");
// /* DARK MODE */
// themeToggle.onclick = () => {
//   document.body.classList.toggle("dark");
// };

// passwordInput.oninput = () => {
//   if (passwordInput.value.length > 0) {
//     // Change 'eye' to 'togglePassword' to match your other code
//     togglePassword.style.display = "inline-block";
//   } else {
//     togglePassword.style.display = "none";
//   }
// };

// /* TOGGLE ONLY IF PASSWORD IS SET */
// togglePassword.onclick = () => {
//   // 1. Check if the password field is empty
//   if (passwordInput.value.length === 0) {
//     return; // Do nothing if no password is typed
//   }

//   // 2. Toggle the input type
//   const isPassword = passwordInput.type === "password";
//   passwordInput.type = isPassword ? "text" : "password";

//   // 3. Toggle the Font Awesome classes
//   if (isPassword) {
//     togglePassword.classList.replace("fa-eye", "fa-eye-slash");
//   } else {
//     togglePassword.classList.replace("fa-eye-slash", "fa-eye");
//   }
// };

// /* 2. CONFIRM PASSWORD EYE LOGIC */
// confirmInput.oninput = () => {
//   // Show/Hide icon
//   toggleConfirmPassword.style.display =
//     confirmInput.value.length > 0 ? "inline-block" : "none";
//   validateForm();
// };

// toggleConfirmPassword.onclick = () => {
//   const isPassword = confirmInput.type === "password";
//   confirmInput.type = isPassword ? "text" : "password";

//   toggleConfirmPassword.classList.toggle("fa-eye");
//   toggleConfirmPassword.classList.toggle("fa-eye-slash");
// };

// /* PASSWORD STRENGTH */
// passwordInput.addEventListener("input", () => {
//   let p = passwordInput.value;
//   let strength = 0;

//   if (p.length >= 8) strength++;
//   if (/[a-z]/.test(p)) strength++;
//   if (/[A-Z]/.test(p)) strength++;
//   if (/\d/.test(p)) strength++;
//   if (/[^A-Za-z0-9]/.test(p)) strength++;

//   const levels = ["0%", "25%", "50%", "75%", "100%"];
//   const colors = ["red", "orange", "yellow", "lightgreen", "green"];

//   strengthFill.style.width = levels[strength];
//   strengthFill.style.background = colors[strength];

//   validateForm();
// });

// /* VALIDATION */
// function validateForm() {
//   let valid = true;

//   // NAME
//   if (!/^[A-Za-z\s]{3,}$/.test(nameInput.value)) {
//     nameInput.className = "invalid";
//     valid = false;
//   } else nameInput.className = "valid";

//   // EMAIL
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
//     emailInput.className = "invalid";
//     valid = false;
//   } else emailInput.className = "valid";

//   // PASSWORD MATCH
//   if (passwordInput.value !== confirmInput.value || confirmInput.value === "") {
//     confirmInput.className = "invalid";
//     valid = false;
//   } else confirmInput.className = "valid";
//   submitBtn.disabled = !valid;
// }

// [nameInput, emailInput, confirmInput].forEach((i) =>
//   i.addEventListener("input", validateForm)
// );

// myForm.addEventListener("submit", (e) => {
//   // 1. Prevent page refresh
//   e.preventDefault();

//   // 2. Reset previous errors
//   nameError.innerText = "";
//   emailError.innerText = "";
//   confirmError.innerText = "";
//   let isValid = true;

//   // 3. Name Validation
//   if (nameInput.value.trim().length < 3) {
//     nameError.innerText = "Name must be at least 3 characters long.";
//     isValid = false;
//   }

//   // 4. Email Validation (Simple Regex)
//   const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
//   if (!emailInput.value.match(emailPattern)) {
//     emailError.innerText = "Please enter a valid email address.";
//     isValid = false;
//   }

//   // 1. Check Password Length
//   if (password.value.length < 8) {
//     confirmError.innerText = "Password must be at least 8 characters.";
//     isValid = false;
//   }

//   // 2. Check if Passwords Match
//   else if (password.value !== confirmPassword.value) {
//     confirmError.innerText = "Passwords do not match!";
//     isValid = false;
//   }

//   // 5. Success Action
//   if (isValid) {
//     alert("Form submitted successfully!");
//     myForm.reset();
//   }
// });
