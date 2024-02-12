const formRegister = document.querySelector(".register"),
  formLogin = document.querySelector(".login"),
  loginBtn = document.querySelector("#login"),
  registerBtn = document.querySelector("#signup"),
  formContainer = document.querySelector(".form-container"),
  passwordIcon = document.querySelectorAll(".fa-eye-slash");
let username = document.querySelector(".username");
let loginEmail = document.querySelector(".login-email");
let signupEmail = document.querySelector(".signup-email");
let loginPassword = document.querySelector(".login-password");
let signupPassword = document.querySelector(".signup-password");
let password2 = document.querySelector(".password2");

let users = JSON.parse(localStorage.getItem("user")) || [];

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.remove("active");
});

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.add("active");
});

// password icon
passwordIcon.forEach((item) => {
  item.addEventListener("click", function () {
    item.classList.toggle("fa-eye");
    let passwordInputs = document.querySelectorAll(".password");
    passwordInputs.forEach((item) => {
      item.type === "password"
        ? (item.type = "text")
        : (item.type = "password");
    });
  });
});

// sign up
formRegister.addEventListener("submit", async function (e) {
  e.preventDefault();

 let userObj = {
    email: loginEmail.value,
    password: loginPassword.value,
  };
  try {
    const response = await axios.post(`${BASE_URL}/singUp`, userObj);
    if (response.status === 200) {
      window.location.href = `home.html`;
    }
  } catch (error) {
    alert("User not found");
  }


  let userInfo = {
    username: username.value,
    email: signupEmail.value,
    password: signupPassword.value,
    password2: password2.value,
  };
  try {
    const response = await axios.post(`${BASE_URL}/login`, userInfo);
    if (response.status === 200) {
      window.location.href = "home.html";
    }
  } catch (error) {
    alert("User not found");
  }

 

  validateInputs();
});

// login

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();
  let userObj = {
    email: loginEmail.value,
    password: loginPassword.value,
  };
  try {
    const response = await axios.post(`${BASE_URL}/singUp`, userObj);
    if (response.status === 200) {
      window.location.href = `home.html`;
    }
  } catch (error) {
    alert("User not found");
  }
  
});

// input empty
function inputEmpty() {
  username.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  password2.value = "";
}
///// form validetion

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  inputEmpty();
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
  inputEmpty();
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

function validateInputs() {
  const usernameValue = username.value.trim();
  const emailValue = signupEmail.value.trim();
  const passwordValue = signupPassword.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(signupEmail, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(signupEmail, "Provide a valid email address");
  } else {
    setSuccess(signupEmail);
  }

  if (passwordValue === "") {
    setError(signupPassword, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(signupPassword, "Password must be at least 8 character.");
  } else {
    setSuccess(signupPassword);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords doesn't match");
  } else {
    setSuccess(password2);
  }
}

// // scroll reveral
// ScrollReveal().reveal(".form", { delay: 1000 });
