const userFormDOM = document.querySelector("#userForm");
const alertDOM = document.querySelector("#alert");
const userListDOM = document.querySelector("#userList");
userFormDOM.addEventListener("submit", formHandler);

const examGrades = JSON.parse(localStorage.getItem("grades"));

const alertFunction = (title, message, className = "warning") => `
  <div class="alert alert-${className} alert-dismissible fade show" role="alert">
    <strong>${title}</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;

if (examGrades?.length > 0) {
  examGrades.map(({ userName, score }) => {
    const liDOM = document.createElement("li");
    liDOM.innerHTML = `
            ${userName}
            <span class="badge bg-primary rounded-pill">${score}</span>
        `;
    liDOM.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    userListDOM.append(liDOM);
  });
}

function formHandler(event) {
  event.preventDefault();
  const USER_NAME = document.querySelector("#username");
  const SCORE = document.querySelector("#score");
  if (
    USER_NAME.value &&
    SCORE.value &&
    SCORE.value >= 0 &&
    SCORE.value <= 100
  ) {
    addItem(USER_NAME.value, SCORE.value);
    USER_NAME.value = "";
    SCORE.value = "";
  } else {
    alertDOM.innerHTML = alertFunction("ERROR", "Wrong information", "danger");
  }
}

function addItem(userName, score) {
  examGrades.push({ userName, score });
  localStorage.setItem("grades", JSON.stringify(examGrades));
  const liDOM = document.createElement("li");
  liDOM.innerHTML = `
          ${userName}
          <span class="badge bg-primary rounded-pill">${score}</span>
      `;
  liDOM.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  userListDOM.append(liDOM);
}
