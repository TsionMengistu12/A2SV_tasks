"use strict";
// we can specify the type of variables since it is typescript
const task = document.getElementById("task");
const taskCon = document.querySelector(".task-con");
const dropdown = document.querySelector(".drop-down");
function addTask() {
    if (!task || !taskCon)
        return;
    if (task.value.trim() === "") {
        task.placeholder = "Please enter your task ";
        setTimeout(() => (task.placeholder = " Add your task here "), 3000);
        return;
    }
    // here we append the new tasks
    let li = document.createElement("li");
    li.innerHTML = task.value;
    taskCon.appendChild(li);
    // the more button where the edit and delete button are found in
    let more = document.createElement("span");
    more.innerHTML = "\u22EE";
    more.className = "more-btn";
    li.appendChild(more);
    //the dropdown class which appears when we press the more button
    let dropdown = document.createElement("div");
    dropdown.className = "dropdown";
    dropdown.classList.add("dropdown");
    //editing funtionality
    let edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.onclick = () => {
        if (li.firstChild) {
            task.value = li.firstChild.textContent || "";
        }
        // this brings the text to be edited in focus
        task.focus();
        li.remove();
        dropdown.style.display = "none";
    };
    dropdown.appendChild(edit);
    //deleting functionality
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => {
        li.remove();
    };
    dropdown.appendChild(del);
    // dropdown element is added on the task list
    li.appendChild(dropdown);
    //the funtionality of dropdown being displayed when more button is pressed 
    more.onclick = (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    };
    //event listener for the checking off of tasks
    li.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("more-btn") || target.closest(".dropdown"))
            return;
        li.classList.toggle("checked");
    });
    //making the dropdown button disapear whenever a click happens on the page
    document.addEventListener("click", () => {
        dropdown.style.display = "none";
    });
    task.value = "";
}
//# sourceMappingURL=todo_2.js.map