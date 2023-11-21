document.addEventListener("DOMContentLoaded", function () {
  let users = loadUsersFromLocalStorage();
  displayUsers(users);
});

function loadUsersFromLocalStorage() {
  let usersDetails = localStorage.getItem("users");

  if (usersDetails) {
    return JSON.parse(usersDetails);
  } else {
    return [];
  }
}

function displayUsers(users) {
  let tableBody = document.getElementById("tableBody");
  let htmlContent = "";

  users.forEach(function (userDetails) {
    htmlContent += `<tr>
      <td>${userDetails.name}</td>
      <td>${userDetails.email}</td>
      <td>${userDetails.password}</td>
      <td>${userDetails.dob}</td>
      <td>${userDetails.terms}</td>
    </tr>`;
  });

  tableBody.innerHTML = htmlContent;
}

function showError(message) {
  let errorContainer = document.querySelector(".error-msg");
  errorContainer.textContent = message;
}

function validateForm(
  userName,
  userEmail,
  userPassword,
  userDob,
  acceptedTerms
) {
  if (isInvalidAge(userDob)) {
    showError("Your Age Should be Between 18 and 55");
    return false;
  }

  showError("");
  return true;
}

function isInvalidAge(age) {
  let currentDate = new Date();
  let userDob = new Date(age);
  let userAge = currentDate.getFullYear() - userDob.getFullYear();
  return userAge < 18 || userAge > 55;
}

document
  .getElementById("formData")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let userName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    let userDob = document.getElementById("dob").value;
    let acceptedTerms = document.getElementById("agree").checked;

    if (
      validateForm(userName, userEmail, userPassword, userDob, acceptedTerms)
    ) {
      let users = loadUsersFromLocalStorage();
      let user = {
        name: userName,
        email: userEmail,
        password: userPassword,
        dob: userDob,
        terms: acceptedTerms,
      };

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      location.reload();
    }
  });
