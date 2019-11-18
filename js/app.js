class Task {
    constructor(task, date) {
        this.task = task;
        this.date = date;
    }
}

//UI class: handle UI class
class UI {
    static displayTask() {
        let todo = Store.getTasks();
        todo.forEach((task) => {
            UI.addTaskToList(task);
        })
    }

    static addTaskToList(task) {
        const list = document.querySelector("#task-list");
        const row = document.createElement("tr");
        const flag = document.createElement('tr');
        const noflag = document.createElement('tr');
        flag.innerHTML = `<td><a href="#" class=" btn btn-warning"><i class="far fa-flag"></i></a></<td>`;
        noflag.innerHTML = `<td><a href="#"><i class="far fa-flag"></i></a></td>`
        row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        if(document.querySelector('.yes-radio-button').checked) {
            row.insertAdjacentElement('afterbegin', flag);
        } else {
            console.log(row.insertAdjacentElement('afterbegin', noflag));   
        }
        list.appendChild(row);
    }

    static onOff() {
        console.log(UI.addTaskToList());
        document.querySelector('.far').addEventListener('click', () => {})
        
    }

    static removeTaskFromList(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static clearTextFields() {
        document.querySelector('#task').value = " ";
        document.querySelector("#due-date").value = " ";
        document.querySelector('input[name="radio-button"]').checked = false;
    }

    static showAlert(message, color) {
        //Create new element in HTMl
        const div = document.createElement('div');
        //Add class to the new element
        div.className = `alert alert-${color}`;
        //append text content into the new text element
        div.appendChild(document.createTextNode(message));
        
        const container = document.querySelector(".container");
        const form = document.querySelector("#todo-form");
        container.insertBefore(div, form);
        //Vanish after 3 seconds;
        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);
    }
}

//Store class: Handles storage
class Store {
    static getTasks() {
        let tasks = [];
        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }
        return tasks;
    }

    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    static removeTask(task) {
        const tasks = Store.getTasks();
        tasks.forEach((todoTask, index) => {
            if(todoTask.task === task) {
               tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}

//Event: display task
document.addEventListener('DOMContentLoaded', UI.displayTask);

//Event: add task
document.querySelector('#form').addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.querySelector("#task").value;
    const dueDate = document.querySelector('#due-date').value;

    if(task === "") {
        UI.showAlert("Task should not be empty", "danger");
    } else {
        const todo = new Task(task, dueDate);
        UI.addTaskToList(todo);
        Store.addTask(todo);
        UI.clearTextFields();
        UI.showAlert("Task added successfully", "success");
    } 
})

//Event: remove task
document.querySelector('#task-list').addEventListener("click", (e) => {
    UI.removeTaskFromList(e.target);
    Store.removeTask(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    UI.showAlert("Task removed", "success");  
})

UI.onOff();