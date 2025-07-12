const task = document.getElementById("task");
const taskCon = document.querySelector(".task-con");
const msg = document.getElementById("msg");

let editingLi = null;

// we will add tasks when the add button is pressed
function addTask(){
    if(task.value.trim() === "" ){
        msg.innerHTML = "Please enter your task ";
        return;

    }
    if(editingLi !== null){
        editingLi.querySelector("span").textContent = task.value;
    }
        let li = document.createElement("li");
        li.innerHTML = task.value;
        taskCon.appendChild(li);

        let more = document.createElement("more");
        more.innerHTML = "\u22EE"; 
        li.appendChild(more);

        let dropdown = document.createElement("div");
        dropdown.classList.add("dropdown");

        let edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.onclick = () =>{
            let modTask = li.firstChild.textContent.trim();
            if (modTask !== ""){
                li.firstChild.textContent = modTask;
            }
            dropdown.style.display = "none";
        };

        let del = document.createElement("button");
        del.textContent = "Delete";
        del.onclick = () =>{
            li.remove();
        };

        dropdown.appendChild(edit);
        dropdown.appendChild(del);
        
        li.appendChild(more);
        li.appendChild(dropdown);

        more.onclick = (e) =>{
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none": "block";
        };

        document.addEventListener("clock", () =>{
            dropdown.style.display = "none";
        });

        
    }
    task.value = "";
}