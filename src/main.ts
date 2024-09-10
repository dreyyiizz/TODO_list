import './style.css'
import { addTask } from './add_tasks'



document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/`

  <div>
     <h2 class="read-the-docs">Things to do:</h2>
     <div class ="form">
      <input type="date" id="date">
      <input type="text" id="inputField" placeholder ="Add tasks here"></input>
      <button id= "addButton" class="Button">Add</button>
      <button id="sortButton" class="Button">Expired Tasks</button>
      </div>
      
      <ul id="valueList"></ul>


  </div>
`
addTask(<HTMLButtonElement>document.getElementById("addButton"))
