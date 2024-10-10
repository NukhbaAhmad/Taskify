// Counter to get -> Pending Task
let counter = 0;

// Array getting the Old_Task_data

let old_task = [];
// Array for new task ADD
let new_task = [];
// If local storage empty then set it to the Task -> an array empty []
if (localStorage.getItem('Task') == null) {
    localStorage.setItem('Task', '[]');
}
// If LS data task not empty then get from task key in the array form(Parse)
else {
    old_task = JSON.parse(localStorage.getItem('Task'));
    // Old task is the array that will contain all the new and previous task
}


if (localStorage.getItem('Task') != null) {
    for (i = 0; i < old_task.length; i++) {

        // DISPLAY OLD TASK
        document.querySelector('.Task-added').innerHTML +=
            `<div class="Task-box" id="task_delete_all">
                <span class="New-task" id="Task_text_added">
                    ${old_task[i]}
                </span> 
             
                <button class="delete trash-edit" title="Delete"><i class="fa-solid fa-trash"></i></button>  
             
                <button class="Edit trash-edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>`;


        // PENDING TASKS
        counter++;
        document.querySelector('.Task-added-pending').innerHTML =
            `<div class="Task-Pending">
                 <span class="Task-Left" id="Pending-task">
                     You have ${counter} pending tasks.
                 </span>
                 <button id="Clear-All" onclick="clear_clicked()" title="Clear All"><i class="fa-solid fa-xmark"></i></button>           
             </div> `;


        // STRIKE-THROUGH

        let curr_task_strike = document.querySelectorAll('.New-task');

        for (let i = 0; i < curr_task_strike.length; i++) {
            curr_task_strike[i].onclick = function () {
                // No class strike exist so add class strike
                this.classList.toggle("strike");

            }
        }

        // DELETE 

        let curr_task_del = document.querySelectorAll('.delete');

        for (let i = 0; i < curr_task_del.length; i++) {
            curr_task_del[i].onclick = function () {

                counter--;
                document.getElementById("Pending-task").innerText = `You have ${counter} pending tasks.`;
                this.parentNode.remove();
                old_task.splice(i, 1);
                localStorage.setItem('Task', JSON.stringify(old_task));

            }
        }


        // CLEAR-ALL

        // On click on Clear All Button

        document.querySelector('#Clear-All').onclick = function () {
            // Main List box inner html -> set to empty (can use remove too)
            document.getElementById('All_task_added_box').innerHTML = '';

            // If No Task added display -> no Task Added yet
            document.querySelector('.Task-Pending').innerHTML = `<span class="No-Task-added">No Task added Yet.<span>`;
                
            // Counter set to 0 -> after removing all tasks -> Counting starts from 0 (counter++)
            counter = 0;
            localStorage.clear();
        };


        // EDIT TASK

        let edit_button_selected = document.querySelectorAll('.Edit');
        // console.log(edit_button);

        for (let i = 0; i < edit_button_selected.length; i++) {
            edit_button_selected[i].onclick = function () {
                //Select the clicked edited button -> Pre sibling(Trash) -> Pre sibling (Task_text)
                let selected_task_for_edit =
                    edit_button_selected[i].previousElementSibling.previousElementSibling
                        .innerText;

                // Input box value -> Selected button pre sibling (Current_Task_text)
                document.getElementById('inputTodo').value = selected_task_for_edit;

                // Craete Edit button
                let edit_button = document.createElement('button');
                // Text added edit
                edit_button.innerHTML = 'Edit';
                // Id added to the Edit button
                edit_button.setAttribute('id', 'Edit_button_id');

                // Element to be replaced -> Add button
                let Add_button_replace = document.getElementById('Add_button');

                // Replace
                // Add button -> ParentNode (get-task BOX) -> replace its child -> add button with the edit button created now
                Add_button_replace.parentNode.replaceChild(edit_button , Add_button_replace)
                  

                // On click on EDIT BUTTON -> Save changes
                document.getElementById('Edit_button_id').onclick = function () {
                    // If on edit Input empty
                    if (document.getElementById('inputTodo').value.length == 0) {
                        //An alert message
                        toastr.info('Kindly Enter the Task.', 'Note:', {
                            iconClass: 'Toastr_style',
                            positionClass: 'toast-bottom-right',
                            showDuration: '450',
                            closeButton: true,
                            progressBar: false,
                            preventDuplicates: true,
                        });
                    }
                    // If Input not empty
                    else {
                        // Get the edited value from input field
                        let new_edited_task = document.getElementById('inputTodo').value;
                        // Seve the new_edited_value to the current button(edit_icon) ->  pre sibling (Trash) -> Pre sib(Span -> Task text) ->
                        edit_button_selected[i].previousElementSibling.previousElementSibling.innerText =new_edited_task;
                        document.querySelector('.get-task input').value = '';
                        edit_button.parentNode.replaceChild(Add_button_replace,edit_button);

                     
                        old_task[i]=edit_button_selected[i].previousElementSibling.previousElementSibling.innerText;
                        localStorage.setItem('Task', JSON.stringify(old_task));

                    };
                };
            };
        };
    }
};




// On click on + Button
document.querySelector('.get-task button').onclick = function () {
    // If input value -> 0 then alert
    if (inputTodo.value.length == 0) {
        // If No task Added -> display
        document.querySelector(
            '.Task-added-pending'
        ).innerHTML = `<span class="No-Task-added">No Task added Yet.<span>`;
        // alert("Enter your Task");
    }

    // If Input Value enterted
    else {
        // Storing user input in the "Task-added" box alogn with delete button
        document.querySelector(
            '.Task-added'
        ).innerHTML += `<div class="Task-box" id="task_delete_all">
                <span class="New-task" id="Task_text_added">
                    ${document.querySelector('.get-task input').value}

                </span> 
             
                <button class="delete trash-edit" title="Delete"><i class="fa-solid fa-trash"></i></button>  
             
                <button class="Edit trash-edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>`;

        // LOCALSTORAGE

        // A var to get input Task
        let Task_added_ls = document.getElementById('inputTodo').value;
        // Pre task = neew task array
        new_task = old_task;
        // New task pushed to the array
        new_task.push(Task_added_ls);
        // Array stored as string in the local storage
        localStorage.setItem('Task', JSON.stringify(new_task));

        // END LOCAL STORAGE

        // COUNT PENDING TASK
        // Each time button clicked  pending task counter increase by 1

        counter++;
        // Pending Task box created when task added -> Task-Pending(Div ) -> Span (Task-left) -> Button (To delete all Tasks)
        document.querySelector(
            '.Task-added-pending'
        ).innerHTML = `<div class="Task-Pending">
                 <span class="Task-Left" id="Pending-task">
                     You have ${counter} pending tasks.
                 </span>
                 <button id="Clear-All" title="Clear All"><i class="fa-solid fa-xmark"></i></button>           
             </div> `;

        // CLEARALL

        // On click on Clear All Button

        document.querySelector('#Clear-All').onclick = function () {
            // Main List box inner html -> set to empty (can use remove too)
            document.getElementById('All_task_added_box').innerHTML = '';

            // If No Task added display -> no Task Added yet
            document.querySelector(
                '.Task-Pending'
            ).innerHTML = `<span class="No-Task-added">No Task added Yet.<span>`;

            // Counter set to 0 -> after removing all tasks -> Counting starts from 0 (counter++)
            counter = 0;
            localStorage.clear();
        };

        // TRASH/DELETE

        // All -> Delete Button -> with class .delete stored in a var

        let curr_task_del = document.querySelectorAll('.delete');

        // Loop for -> checking click on delete button -> If clicked remove -> this(current_button) -> Parent Node (Direct parent) -> Current -> Task-added div removed fully

        for (let i = 0; i < curr_task_del.length; i++) {
            curr_task_del[i].onclick = function () {
                counter--;
                document.getElementById(
                    'Pending-task'
                ).innerText = `You have ${counter} pending tasks.`;
                this.parentNode.remove();

                // LOCAL STORAGE

                // From the array task the 1 task is removed
                // The task for removal selected through index
                // We fetched the index of the current delete button that was pressed
                old_task.splice(i, 1);
                // Updated array with 1 (Selected Task) removed -> Set as value in LS for key Task
                // Local storage value updated
                localStorage.setItem('Task', JSON.stringify(old_task));
            };
        }

        // STRIKETHROUGH

        // All -> input values -> with class .new task stored in a var

        let curr_task_strike = document.querySelectorAll('.New-task');

        // Loop for strike check on input values clicked -> loop -> check values -> One speciifc value clicked -> Funtion called -> current particular element (this)-> classlist check -> toggle "strike" class -> if class exist remove it & if class not exist add it to the class list

        for (let i = 0; i < curr_task_strike.length; i++) {
            curr_task_strike[i].onclick = function () {
                // No class strike exist so add class strike
                this.classList.toggle('strike');
            };
        }

        // EDIT TASK

        let edit_button_selected = document.querySelectorAll('.Edit');
        // console.log(edit_button);

        for (let i = 0; i < edit_button_selected.length; i++) {
            edit_button_selected[i].onclick = function () {
                //Select the clicked edited button -> Pre sibling(Trash) -> Pre sibling (Task_text)
                let selected_task_for_edit =
                    edit_button_selected[i].previousElementSibling.previousElementSibling
                        .innerText;

                // Input box value -> Selected button pre sibling (Current_Task_text)
                document.getElementById('inputTodo').value = selected_task_for_edit;

                // Craete Edit button
                let edit_button = document.createElement('button');
                // Text added edit
                edit_button.innerHTML = 'Edit';
                // Id added to the Edit button
                edit_button.setAttribute('id', 'Edit_button_id');

                // Element to be replaced -> Add button
                let Add_button_replace = document.getElementById('Add_button');

                // Replace
                // Add button -> ParentNode (get-task BOX) -> replace its child -> add button with the edit button created now
                Add_button_replace.parentNode.replaceChild(
                    edit_button,
                    Add_button_replace
                );

                // On click on EAIT BUTTON -> Save changes
                document.getElementById('Edit_button_id').onclick = function () {
                    // If on edit Input empty
                    if (document.getElementById('inputTodo').value.length == 0) {
                        //An alert message
                        toastr.info('Kindly Enter the Task.', 'Note:', {
                            iconClass: 'Toastr_style',
                            positionClass: 'toast-bottom-right',
                            showDuration: '450',
                            closeButton: true,
                            progressBar: false,
                            preventDuplicates: true,
                        });
                    }
                    // If Input not empty
                    else {
                        // Get the edited value from input field
                        let new_edited_task = document.getElementById('inputTodo').value;
                        // Seve the new_edited_value to the current button(edit_icon) ->  pre sibling (Trash) -> Pre sib(Span -> Task text) ->
                        edit_button_selected[
                            i
                        ].previousElementSibling.previousElementSibling.innerText =
                            new_edited_task;
                        document.querySelector('.get-task input').value = '';
                        edit_button.parentNode.replaceChild(
                            Add_button_replace,
                            edit_button
                        );

                        // Old task value set to -> New edited Task
                        old_task[i]=edit_button_selected[i].previousElementSibling.previousElementSibling.innerText;
                        // Set the edited task data to Localstorage
                        localStorage.setItem('Task', JSON.stringify(old_task));
                    };
                };
            };
        };
    };
    // After Each Task add -> Input ->Empty
    document.querySelector('.get-task input').value = '';
};