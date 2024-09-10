import "./style.css";

interface Task {
  date: string;
  value: string;
  completed: boolean;
}

export function addTask(button: HTMLButtonElement) {
  const inputField = document.getElementById("inputField") as HTMLInputElement;
  const valueList = document.getElementById("valueList") as HTMLUListElement;
  const date = document.getElementById("date") as HTMLInputElement;
  const sortButton = document.getElementById("sortButton") as HTMLButtonElement;

  let showExpiredTasks = false;

  // Load tasks from local storage
  const loadTasks = (): Task[] => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  };

  // Save tasks to local storage
  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Add click event listener to the button
  button.addEventListener("click", () => {
    const inputDate = date.value;
    const inputValue = inputField.value;

    if (inputValue === "" || inputValue === null) return alert("Write something first");
    if (inputDate === "" || inputDate === null) return alert("Add task deadline");

    const tasks = loadTasks();
    const newTask: Task = { date: inputDate, value: inputValue, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);

    addTaskToDOM(newTask);
    inputField.value = "";
  });

  // Add click event listener to the sort button
  sortButton.addEventListener("click", () => {
    showExpiredTasks = !showExpiredTasks;
    const tasks = loadTasks();
    tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    saveTasks(tasks);

    // Clear the list and re-render sorted tasks
    valueList.innerHTML = "";
    tasks.forEach(addTaskToDOM);
  });

  // Function to add task to DOM
  const addTaskToDOM = (task: Task) => {
    const closeButton = document.createElement("button");
    const checkbox = document.createElement("input");
    const listItem = document.createElement("li");
    const text = document.createElement("p");
    const deadline = document.createElement("p");

    deadline.innerHTML = `${task.date}`;
    text.innerHTML = `${task.value}`;
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    closeButton.innerHTML = "🗑";
    listItem.append(deadline, checkbox, text, closeButton);

    if (task.completed) {
      listItem.classList.add("checked");
    }

    valueList.appendChild(listItem);

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks(loadTasks());
      if (checkbox.checked) {
        listItem.classList.add("checked");
      } else {
        listItem.classList.remove("checked");
      }
    });

    closeButton.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const listItem = target.parentElement;
      if (listItem) {
        listItem.remove();
        const tasks = loadTasks().filter(t => t.value !== task.value || t.date !== task.date);
        saveTasks(tasks);
      }
    });

    // Check if the task deadline has passed
    checkDeadline(task, listItem);
  };

  // Function to check the deadline and hide expired tasks
  const checkDeadline = (task: Task, listItem: HTMLLIElement) => {
    const now = new Date();
    const taskDate = new Date(task.date);
    if (now >= taskDate) {
      listItem.classList.add("colorChange");
      if (!showExpiredTasks) {
        listItem.style.display = "none";
      }
    } else {
      listItem.style.display = "flex";
    }
  };

  // Load existing tasks on page load
  loadTasks().forEach(addTaskToDOM);

  // Check deadlines periodically
  setInterval(() => {
    const tasks = loadTasks();
    tasks.forEach(task => {
      const listItem = Array.from(valueList.children).find(
        item => (item as HTMLLIElement).querySelector("p")?.innerHTML === task.value
      ) as HTMLLIElement;
      if (listItem) {
        checkDeadline(task, listItem);
      }
    });
  }, 1000);
}
