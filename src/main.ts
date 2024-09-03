import './style.css'
import { addTask } from './Add_stuff'



document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/`

  <div>
     <h2 class="read-the-docs">Things to do:</h2>
     <div class ="form">
        <input type="text" id="inputField" placeholder ="Add tasks here">
        <button id= "addButton" class="Button" >Add</button>
     </div>
      
     <ul id="valueList"></ul>


</div>
`
addTask(<HTMLButtonElement>document.getElementById("addButton"))
