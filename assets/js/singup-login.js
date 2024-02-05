const formRegister = document.querySelector(".register"),
  formLogin = document.querySelector(".login"),
  loginBtn = document.querySelector("#login"),
  registerBtn = document.querySelector("#signup"),
  formContainer = document.querySelector(".form-container"),
  passwordIcon = document.querySelectorAll(".fa-eye-slash"),
  username = document.querySelector(".username"),
  email = document.querySelector(".email"),
  password = document.querySelector(".password"),
  password2 = document.querySelector(".password2");

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
passwordIcon.forEach(item=>{
  item.addEventListener("click",function(){
    item.classList.toggle("fa-eye")
  })
})


// sign up
formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  let bool = users.some(
    (item) => item.username == username.value && item.email == email.value
  );
  if (!bool) {
    if (
      username.value != "" &&
      email.value != "" &&
      password.value != "" &&
      password2.value != ""
    ) {
      let userInfo = {
        id: Date.now(),
        username: username.value,
        email: email.value,
        password: password.value,
        password2: password2.value,
      };
      users.push(userInfo);
      localStorage.setItem("user", JSON.stringify(users));
    }
  } else {
    confirm("User is already registered");
  }
  validateInputs();
});

// login
formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  let user = users.filter((item) => {
    console.log(item);
    return item.email === email.value && item.password === password.value;
  });
  if (user) {
    window.location.href = "allProducts.html";
  } else {
    confirm("User not found");
  }
});

///// form validetion

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
  username.value = "";
  password2.value = "";
  password.value = "";
  email.value = "";
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 character.");
  } else {
    setSuccess(password);
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
ScrollReveal().reveal(".form", { delay: 1000 });
