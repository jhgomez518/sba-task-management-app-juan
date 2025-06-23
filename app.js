
let todo_inputted = document.querySelector("#todoName")
let category_inputted = document.querySelector("#categoryName")
let deadline_inputted = document.querySelector("#deadline")
let status_inputted = document.querySelector("#status")
let add_todo_button = document.querySelector("#addtodoButton")
let display_list = document.querySelector("ul")
let todo_container = document.querySelector("#to-do-container")
let todo_list = [] // array of objects (will hold each "todo" object from user)
let filterCategory = document.querySelector("#filter-category") // drop-down based on category
let filterStatus = document.querySelector("#filter-status") // drop-down based on status
let todoListContainer = document.querySelector("#todo-list-container") // filter-able area where new to-dos are added

// retrieves any data (as string) as a result of user interacting with app
let saved_data = localStorage.getItem("to_dos");

/* if there is saved information, use said information to go through
   our app's functionality once again; functionality re-described for
   saved user info in function "recover_to_dos()"*/
if (saved_data) {
  todo_list = JSON.parse(saved_data); // convert string data back to array

  for (let to_do of todo_list) {
    recover_to_dos(to_do); // will display saved info after re-inputting data into a replicated function called recover_to_dos(to_do)
  }
}

// describes what happens when "+Add todo" button is clicked
add_todo_button.addEventListener("click", () => {

    // todo object created upon click
    // properties determined based on user's input values
    let new_todo = {
        todo_name: todo_inputted.value,
        category: category_inputted.value,
        deadline: deadline_inputted.value,
        status: status_inputted.value
    }

    // todo object is pushed to "todo_list" array
    todo_list.push(new_todo)

    // save object to local storage (as string)
    localStorage.setItem("to_dos", JSON.stringify(todo_list));

    // input values cleared
    todo_inputted.value = ""
    category_inputted.value = ""
    deadline.value = ""
    status_inputted.value = ""
    
    /**
     * ************************** CODE BELOW APPLIES FOR DATA RECOVERY ********************************
     */

    // creating a duplicate row with which we will populate with most recent object's values
    let todo_container_clone = todo_container.cloneNode(true)

    // select all the queries from clones row in order to populate with most recent object's values
    let todo_cloned_input = todo_container_clone.querySelector(".todoName")
    let category_cloned_input = todo_container_clone.querySelector(".categoryName")
    let deadline_cloned_input = todo_container_clone.querySelector(".deadline")
    let status_cloned_input = todo_container_clone.querySelector(".status")
    let on_track = todo_container_clone.querySelector(".on-track-button")
    on_track.classList.add("on-track-button"); // because button kept changing depending on the value inside the button (applied fixed width)

    // populate the cloned row with the most recent object's values
    todo_cloned_input.value = new_todo.todo_name
    category_cloned_input.value = new_todo.category
    deadline_cloned_input.value = new_todo.deadline
    status_cloned_input.value = new_todo.status

    // adds data attributes to clones/new to-dos to later allow filtering
    todo_container_clone.dataset.category = new_todo.category
    todo_container_clone.dataset.status = new_todo.status


    /*for cloned-rows (which represent to-dos added to list), 
      the button will now list if a to-do is "on time" or "overdue"
      depending on its date*/
    
    let todays_date = new Date()
    let deadline_date = new Date(deadline_cloned_input.value) // to able to do a comparison between the dates

    // to-do added will be considered overdue if we have passed the date AND its status is not equal to "completed"
    if(deadline_date < todays_date && status_cloned_input.value != "a-done") {
        on_track.innerHTML = "overdue"
        on_track.style.color = "red"
    } else if(status_cloned_input.value === "a-done") {
        on_track.innerHTML = "a-done"
        on_track.style.color ="green"
    } else {
        on_track.innerHTML = "on-time"
        on_track.style.color = "blue"
    }
    
    // display our cloned row, now properly populated with most recent object's values
    /*
        NOTE: this allows user to DIRECTLY UPDATE the displayed list, instead of having to do a
        2-step process where they have to (1) edit and (2) wait for dynamic update based on edit
    */ 
    
    // preparing area on page where new to-do will be added
    let todo_list_container = document.querySelector("#todo-list-container")
    todo_list_container.append(todo_container_clone)

    /**
     * the following 2 functions make it so that the user updating the values of an added to-do's
     * deadline or status changes the "on-time"/"overdue" label of that to-do
     */
    deadline_cloned_input.addEventListener("input", () => {

        let todays_date = new Date() // need to re-create "today's date" otherwise we'd be comparing to our first declaration of "todays_date"
        let updated_deadline_input = deadline_cloned_input.value
        let updated_deadline = new Date(updated_deadline_input)
        let updated_status = status_cloned_input.value

        if(updated_deadline < todays_date && updated_status !== "a-done") {
            on_track.innerHTML = "overdue"
            on_track.style.color = "red"
        } else {
            on_track.innerHTML = "on-time"
            on_track.style.color = "blue"
        }

        if(updated_status === "a-done") {
            on_track.innerHTML = "a-done"
            on_track.style.color = "green"
            on_track.style.fontWeight = "bold"
        }

    })

    status_cloned_input.addEventListener("input", () => {

        let todays_date = new Date() // need to re-create "today's date" otherwise we'd be comparing to our first declaration of "todays_date"
        let updated_deadline_input = deadline_cloned_input.value
        let updated_deadline = new Date(updated_deadline_input)
        let updated_status = status_cloned_input.value

        if(updated_status !== "a-done" && updated_deadline < todays_date) {
            on_track.innerHTML = "overdue"
            on_track.style.color = "red"
        } else {
            on_track.innerHTML = "on-time"
            on_track.style.color = "blue"
        }

        if(updated_status === "a-done") {
            on_track.innerHTML = "a-done"
            on_track.style.color = "green"
            on_track.style.fontWeight = "bold"
        }

    })

})

// NOTE: attempted to filter cloned to-dos using dataset attributes, but filtering isn't working yet
function filterTodos() {

    let selectedCategory = filterCategory.value
    let selectedStatus = filterStatus.value

    // loops over all the added to-dos/clones in the container
    let todoItems = todoListContainer.children

    for (let item of todoItems) {
        let itemCategory = item.dataset.category
        let itemStatus = item.dataset.status
        // evaluates matches
        let categoryMatches;
        if (selectedCategory === "all") {
            categoryMatches = true;  // ignore filter for "all categories" option
        } else {
            if (itemCategory === selectedCategory) {
                categoryMatches = true;  // match found
            } else {
                categoryMatches = false; // no match
            }
        }

    let statusMatches;
    if (selectedStatus === "all") {  
        statusMatches = true;  // ignore filter for "alL statuses" option
    } else {
        if (itemStatus === selectedStatus) {
            statusMatches = true; // match found
        } else {
            statusMatches = false; // no match
        }
    }

    if (categoryMatches && statusMatches) {
      item.style.display = ""  // show rows/items that match the user's two filters
    } else {
      item.style.display = "none"  // hide everything else
    }
  }
}

// for recovering data from local storage
function recover_to_dos(to_do) {

    // creating a duplicate row with which we will populate with most saved object's values
    let todo_container_clone = todo_container.cloneNode(true)

    // select all the queries from clones row in order to populate with saved object's values
    let todo_cloned_input = todo_container_clone.querySelector(".todoName")
    let category_cloned_input = todo_container_clone.querySelector(".categoryName")
    let deadline_cloned_input = todo_container_clone.querySelector(".deadline")
    let status_cloned_input = todo_container_clone.querySelector(".status")
    let on_track = todo_container_clone.querySelector(".on-track-button")
    on_track.classList.add("on-track-button"); // because button kept changing depending on the value inside the button (applied fixed width)

    // populate the cloned row with the saved object's values
    todo_cloned_input.value = to_do.todo_name
    category_cloned_input.value = to_do.category
    deadline_cloned_input.value = to_do.deadline
    status_cloned_input.value = to_do.status

    // adds data attributes to saved to-dos to later allow filtering
    todo_container_clone.dataset.category = to_do.category
    todo_container_clone.dataset.status = to_do.status


    /*for cloned-rows (which represent to-dos added to list), 
      the button will now list if a to-do is "on time" or "overdue"
      depending on its date*/
    
    let todays_date = new Date()
    let deadline_date = new Date(deadline_cloned_input.value) // to able to do a comparison between the dates

    // to-do added will be considered overdue if we have passed the date AND its status is not equal to "completed"
    // use status value from saved object
    if(deadline_date < todays_date && to_do.status != "a-done") {
        on_track.innerHTML = "overdue"
        on_track.style.color = "red"
    } else if(to_do.status === "a-done") {
        on_track.innerHTML = "a-done"
        on_track.style.color ="green"
    } else {
        on_track.innerHTML = "on-time"
        on_track.style.color = "blue"
    }
    
    // display our cloned row, now properly populated with most recent object's values
    /*
        NOTE: this allows user to DIRECTLY UPDATE the displayed list, instead of having to do a
        2-step process where they have to (1) edit and (2) wait for dynamic update based on edit
    */ 
    
    // prepping area where saved data will be re-added
    todoListContainer.append(todo_container_clone)

    /**
     * the following 2 functions make it so that the user updating the values of an added to-do's
     * deadline or status changes the "on-time"/"overdue" label of that to-do
     */
    deadline_cloned_input.addEventListener("input", () => {

        let todays_date = new Date() // need to re-create "today's date" otherwise we'd be comparing to our first declaration of "todays_date"
        let updated_deadline_input = deadline_cloned_input.value
        let updated_deadline = new Date(updated_deadline_input)
        let updated_status = status_cloned_input.value

        if(updated_deadline < todays_date && updated_status !== "a-done") {
            on_track.innerHTML = "overdue"
            on_track.style.color = "red"
        } else {
            on_track.innerHTML = "on-time"
            on_track.style.color = "blue"
        }

        if(updated_status === "a-done") {
            on_track.innerHTML = "a-done"
            on_track.style.color = "green"
            on_track.style.fontWeight = "bold"
        }

    })

    status_cloned_input.addEventListener("input", () => {

        let todays_date = new Date() // need to re-create "today's date" otherwise we'd be comparing to our first declaration of "todays_date"
        let updated_deadline_input = deadline_cloned_input.value
        let updated_deadline = new Date(updated_deadline_input)
        let updated_status = status_cloned_input.value

        if(updated_status !== "a-done" && updated_deadline < todays_date) {
            on_track.innerHTML = "overdue"
            on_track.style.color = "red"
        } else {
            on_track.innerHTML = "on-time"
            on_track.style.color = "blue"
        }

        if(updated_status === "a-done") {
            on_track.innerHTML = "a-done"
            on_track.style.color = "green"
            on_track.style.fontWeight = "bold"
        }

    })

}

filterCategory.addEventListener("change", () => {
  filterTodos();
})

filterStatus.addEventListener("change", () => {
    filterTodos();
})
