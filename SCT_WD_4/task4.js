const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskDateTime = document.getElementById("task-datetime");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");
const pendingSection = document.getElementById("pending-section");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskTime = taskDateTime.value;

  if (taskText === "") return;

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = `${taskText} ${taskTime ? `| ${taskTime}` : ""}`;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.style.backgroundColor = "green";
  completeBtn.onclick = () => {
    taskSpan.classList.add("completed");
    editBtn.style.display = "none";
    completeBtn.style.display = "none";
    taskList.removeChild(li);
    completedList.appendChild(li);
    checkPendingTasks();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.style.backgroundColor = "teal";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", taskText);
    if (newText) {
      taskSpan.textContent = `${newText} ${taskTime ? `| ${taskTime}` : ""}`;
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.backgroundColor = "red";
  deleteBtn.onclick = () => {
    if (li.parentElement === taskList) {
      taskList.removeChild(li);
    } else {
      completedList.removeChild(li);
    }
    checkPendingTasks();
  };

  li.append(taskSpan, completeBtn, editBtn, deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskDateTime.value = "";
});

function checkPendingTasks() {
  if (taskList.children.length === 0) {
    pendingSection.style.display = "none";
  } else {
    pendingSection.style.display = "block";
  }
}
