import "./style.css";

export function addTask(button: HTMLButtonElement) {
  // Fetching data and making variables
  const inputField = document.getElementById("inputField") as HTMLInputElement;
  const valueList = document.getElementById("valueList") as HTMLUListElement;

  // Add click event listener to the button
  button.addEventListener("click", () => {
    // Get the input value
    const inputValue = inputField.value;

    // Makes sure if you have written something
    if (inputValue == "" || inputValue == null)
      return alert("Write something first");

    // Create a new list item
    const closeButton = document.createElement("button");
    const checkbox = document.createElement("input");
    const listItem = document.createElement("li");
    const text = document.createElement("p");
    text.innerHTML = `${inputField.value}`;
    checkbox.type = "checkbox";
    closeButton.innerHTML = "\u00d7";
    listItem.append(checkbox, text, closeButton);

    // Add the list item to the list
    valueList.appendChild(listItem);

    // Clear the input field
    inputField.value = "";

    // Function for checkbox change color
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        listItem.classList.add("checked");
      } else {
        listItem.classList.remove("checked");
      }
    });

    // function for the remove button
    closeButton.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const listItem = target.parentElement;
      if (listItem) {
        listItem.remove();
      }
    });
  });
}
