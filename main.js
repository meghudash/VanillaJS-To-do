let todoInput=document.querySelector('.todo-input');
let todoButton=document.querySelector('.todo-button');
let todoList=document.querySelector('.todo-list');
let filterOption=document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //todo-div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fa fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fa fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list

    todoList.appendChild(todoDiv);

    // clear todoinput value

    todoInput.value="";
    //create 
}

function deleteCheck(e){
    let item=e.target;
    //delete todo
    if(item.classList[0]==="trash-btn"){
        let todo = item.parentElement;
        todo.classList.add('fall');
        removeLocal(todo);
        todo.addEventListener('transitionend', () => {
                todo.remove();
            });
    }
    //check
    if(item.classList[0]==="complete-btn"){
        let todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    let todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                } 
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                } 
                else{
                    todo.style.display="none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check for todos
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI
        const newTodo=document.createElement("li");
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton=document.createElement('button');
        completedButton.innerHTML='<i class="fa fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //check trash button
        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fa fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list

        todoList.appendChild(todoDiv);

    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocal(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    let todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}