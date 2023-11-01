const container = document.querySelector('.container');
const addParent = document.getElementById('add-container');
const add = document.getElementById('add-input');
const plusBtn = document.getElementById('plus-sign');
const p = document.getElementById('warning');



// checking for existing tasks in local storage
let locArr = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
if (locArr.length >= 1) {
    document.addEventListener('DOMContentLoaded', appendToContainer);
}


add.addEventListener('focus', () => {
    add.value = '';
    return;
});

add.addEventListener('input', () => {
    const addValue = add.value.trim();
    if (addValue !== "") {
        p.style.display = 'none'
    }
})



// creating ID's for Tasks
function generateTaskId() {
    if (locArr.length === 0) {
        return 1;
    } else {
        const maxId = Math.max(...locArr.map(task => task.id));
        return maxId + 1;
    }
}



//////// Plus-Btn////////
plusBtn.addEventListener('click', handlePlusBtnClick);

// Adding new Tasks to the container
function handlePlusBtnClick() {

    const addValue = add.value.trim();
    if (addValue !== '') {
        const newDiv = document.createElement('div');
        newDiv.classList.add('to-do');
        const taskId = generateTaskId();
        newDiv.innerHTML = `
        <!-- STAR -->
        <svg class="star" completed="" data-id="${taskId}"xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
        d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
        </svg>
        <!--FULL STAR-->
        <svg class="full-star hidden"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path id="path" class="path" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        <p class="todo-p">${addValue}</p>
        <!-- TRASH -->
        <svg class="trash" xmlns="http://www.w3.org/2000/svg" height="1em"
        viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
        `;
        saveToLoacal(taskId);
        container.append(newDiv);

        // adding the class for the smooth landing in the container
        setTimeout(() => {
            newDiv.classList.add('active');
        }, 50);
        add.value = '';

    } else {
        p.style.display = 'block'
        add.value = "Add Something To The list";
    }

    trashIcon();
    addFullStar();
}



// adding the tasks to "locArr"
function saveToLoacal(taskId) {

    const inputValue = add.value;
    const task = { id: taskId, text: inputValue, completed: '' };
    locArr.push(task);

    localStorage.setItem('tasks', JSON.stringify(locArr));
}

function updateLocal(dataId, completed) {
    const data = JSON.parse(localStorage.getItem('tasks'));
    const updatedData = data.map(task => {
        if (task.id === parseInt(dataId)) {
            task.completed = completed;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedData));

}




function appendToContainer() {

    const container = document.querySelector(".container");
    const data = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < data.length; i++) {
        const newTas = document.createElement('div');
        newTas.classList.add('to-do', 'active');


        newTas.innerHTML = `
        <!-- STAR -->
            <svg class="star ${data[i].completed ? 'hidden' : ''}" onclick="addFullStar()" data-id=${data[i].id}xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                        d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                </svg>
        <!--FULL STAR-->
            <svg class="full-star ${data[i].completed ? '' : 'hidden'}" onclick="addFullStar()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path id="path" class="path" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <p class="todo-p">${data[i].text}</p>
        <!-- TRASH -->
            <svg class="trash" onclick="trashIcon()" xmlns="http://www.w3.org/2000/svg" height="1em"
                viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
            `;


        const fullStarIcons = newTas.querySelectorAll('.full-star');
        fullStarIcons.forEach((fullStar) => {
            fullStar.addEventListener('click', () => {
                toggleFullStar(fullStar);
            });
        });

        if (data[i].completed === true) {
            container.prepend(newTas)
        } else {
            container.append(newTas)
        }

        const reloadTimeout = setTimeout(function () {
            window.location.reload();
        }, 1000);
        clearInterval(reloadTimeout);

    }
}

function toggleFullStar(fullStar) {
    const parentStar = fullStar.closest('.to-do.active');
    const star = parentStar.querySelector('.star');
    const path = parentStar.querySelector('#path');
    const dataId = star.getAttribute('data-id');

    if (fullStar.classList.contains('hidden')) {
        star.setAttribute('completed', 'false');
        fullStar.classList.remove('hidden');
    } else {
        star.setAttribute('completed', 'true');
        fullStar.classList.add('hidden');
        star.classList.remove('hidden');
    }

    // Update the local storage with the updated completion status
    updateLocal(dataId, star.getAttribute('completed') === 'true');
}



///////////// TRASH //////////////////
function trashIcon() {
    const trashIcons = document.querySelectorAll('.trash');
    trashIcons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            const todoItem = e.target.parentElement; // returning the svg
            const parentAdd = todoItem.closest('.to-do');
            parentAdd.remove();
            // taskIdCounter--;

        });
    });

    // const trashIcons = document.querySelectorAll('.trash');
    trashIcons.forEach((trash, i) => {
        trash.addEventListener('click', () => {
            const parentToDos = trash.closest('.to-do');
            const taskId = parseInt(parentToDos.querySelector('.star').getAttribute('data-id'));
            removeFromLocal(taskId);
            tasksToRemove(taskId);
        });
    });

};


// function activeRemoveLocalOption() {
//     const deleteBtn = document.querySelectorAll('.trash');
//     deleteBtn.forEach((db, i) => {
//         db.addEventListener('click', () => { removeFromLocal(i) });
//     })
// }

function removeFromLocal(id) {
    // Find the index of the task with the given ID
    const taskIndex = locArr.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        // Remove the task with the correct ID from the locArr array
        locArr.splice(taskIndex, 1);

        // Update the local storage with the modified array
        localStorage.setItem('tasks', JSON.stringify(locArr));
    }
}


function tasksToRemove(id) {
    const updateTask = locArr.filter(task => task.id !== id);
    // locArr = updateTask;
    localStorage.setItem('tasks', JSON.stringify(updateTask));
    // console.log(updateTask);
}


////////////////// STAR /////////////////////


function addFullStar() {

    container.addEventListener('click', (e) => {
        const clickedStar = e.target;
        const parentStar = clickedStar.closest('.to-do.active');
        const fullStr = parentStar.querySelector('.full-star');
        const path = parentStar.querySelector('#path');
        const str = parentStar.querySelector('.star');
        const dataId = str.getAttribute('data-id')
        let completed = false;

        if (clickedStar.classList.contains('star')) {
            clickedStar.setAttribute('completed', 'true')
            path.classList.add('full');
            clickedStar.classList.add('hidden');
            fullStr.classList.remove('hidden');
            container.prepend(parentStar);
        } else if (path.classList.contains('full')) {
            clickedStar.setAttribute('completed', 'false')
            fullStr.classList.add('hidden');
            path.classList.remove('full');
            const emptyStar = parentStar.querySelector('.star');
            emptyStar.classList.remove('hidden');
        }

        updateLocal(dataId, clickedStar.getAttribute('completed') === 'true');
    });

}