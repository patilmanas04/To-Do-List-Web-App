window.addEventListener('load', ()=>{
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    const newInputForm = document.querySelector("#input-form");

    newInputForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const todo = {
            task: e.target.elements.todoInput.value,
            time: new Date(),
            done: false
        }

        if(e.target.elements.todoInput.value == ""){
            console.log("Empty Input");
        }
        else{
            savedTodos.push(todo);
            localStorage.setItem('todos', JSON.stringify(savedTodos));
            displayTodos(savedTodos);
        }
        
        e.target.reset();
    });

    displayTodos(savedTodos);
});

`<div class="to-do-list-item">
    <div class="left-part">
        <div class="bubble"></div>

        <input type="text" class="display-to-do" value="Task 1" readonly>
    </div>

    <div class="right-part">
        <button class="edit-button">Edit</button>

        <button class="remove-button">Remove</button>
    </div>
</div>`

const displayTodos = (savedTodos)=>{
    const toDoListItemContainer = document.querySelector(".to-do-list-item-container");
    toDoListItemContainer.innerHTML = "";

    savedTodos.forEach((todo, index)=>{

        const toDoListItem = document.createElement('div');
        toDoListItem.classList.add('to-do-list-item');

        const leftPart = document.createElement('div');
        leftPart.classList.add('left-part');
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const input = document.createElement('input');
        input.classList.add('display-to-do');
        input.setAttribute('type', 'text');
        input.setAttribute('readonly', 'true');
        input.value = todo.task;

        const rightPart = document.createElement('div');
        rightPart.classList.add('right-part');
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'Edit';
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove';

        leftPart.appendChild(bubble);
        leftPart.appendChild(input);

        rightPart.appendChild(editButton);
        rightPart.appendChild(removeButton);

        toDoListItem.appendChild(leftPart);
        toDoListItem.appendChild(rightPart);

        toDoListItemContainer.appendChild(toDoListItem);

        if(todo.done){
            bubble.classList.add('done');
            input.classList.add('done');
        }
        else{
            bubble.classList.remove('done');
            input.classList.remove('done');
        }

        bubble.addEventListener('click', (e)=>{
            e.target.classList.toggle('done');
            input.classList.toggle('done');
            todo.done = !todo.done;
            localStorage.setItem('todos', JSON.stringify(savedTodos));
        });

        editButton.addEventListener('click', (e)=>{
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', ()=>{
                input.setAttribute('readonly', 'true');
                todo.task = input.value;
                localStorage.setItem('todos', JSON.stringify(savedTodos));
            });
        });

        removeButton.addEventListener('click', ()=>{
            savedTodos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(savedTodos));
            displayTodos(savedTodos);
        });
    });
}