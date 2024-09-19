
document.addEventListener("DOMContentLoaded", function(){
    const taskInput = document.getElementById("newTask");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const completedTasksTable = document.getElementById("completedTasks");

    addTaskButton.addEventListener('click', function(){
        const taskText = taskInput.value.trim();
        if(taskText !== ''){
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(text){
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="complete">Completed</button>
            <button class="delete">Delete</button>
        `;

        const completeButton = li.querySelector('.complete');
        completeButton.addEventListener('click', function(){
            const taskItem = completeButton.parentElement;
            taskItem.classList.toggle('complete');
            if(taskItem.classList.contains('complete')){
                moveCompletedTaskToTable(taskItem);
            } else {
                moveTaskBackToList(taskItem);
            }
        });

        const deleteButton = li.querySelector('.delete');
        deleteButton.addEventListener('click', function(){
            const taskItem = deleteButton.parentElement;
            taskItem.remove();
        });

        taskList.appendChild(li);
    }

    function moveCompletedTaskToTable(taskItem){
        const taskText = taskItem.querySelector('span').textContent;
        const newRow = completedTasksTable.insertRow(-1);
        newRow.innerHTML = `
            <td>${taskText}</td>
        `;
        taskItem.remove();
    }

    function moveTaskBackToList(taskItem){
        taskItem.classList.remove('complete');
        taskList.appendChild(taskItem);
    }
});
