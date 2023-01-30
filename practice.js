//what i have to do for ADD button (done)
//1.add functionality of add button 
//  b.create one fun(addTodo)
//     a. add eventlistener -->click 
//     1.when i click form submited to prevent this effect 
//       i have to used preventdefault
//     2.if my input is blank then given one error msg
//     3. else input is not blank make one obj that contain id,text,priorites
//     4. make one arr[push] to stored this info and then push
//     5. make another fun(createlistItem) to handle li as i make one ul so child is li
//     6. last step make one fun(resetForm) clearing input field 

//for delete btn what i have to do
//step1 :- add event listener on ul because i have to delete whole part
//step2 :-if my element contain classlist of delete 
//step3 :-make a fun(deletetodo)
//        #inside fun what i have to do
//            a.aplying foreach loop in arr to check each ele 
//              then applying one cond and then splice it and remove it

//for edit btn what i have to do
//step1 :- make a one fun which contain the functionality of edit btn
//step2 :- make one global variable for storing edit btn which present in span
//step3 :- select the input text value check it conatins textcontent
//step4 :- while editing the text we have to change the text of add btn
//step5 :- we can change the text by using innertext 
//step6 :- call this fun with delete fun in step1 of delete fun btn
//step7 :- after editing the new container is made to prevent this fun 
//step8 :- make one fun savetodo 
//step9 :- call this fun inside addtodo

//for filtering what i have to do
//step1 :- create one variable to store that store the node list contain all,high,moderate,low
//step2 :- add event listener on that variable 
//step3 :- check classlist that conatin filter btn and make one fun(filtertodos)
//step4 :- convert innerhtml to empty and then apply some cond   

const formAddButton = document.querySelector(".js-btn-add");
const formInput = document.querySelector('.js-form-input');
const formMessage = document.querySelector('.js-alert');
const prioritySelect = document.querySelector('#priority_select');
const todosList = document.querySelector('.js-todos-list');
const filterBtnsCont = document.querySelector(".filter_cont");
const todosArr = [];
let targetTodo;


let count = 0;

/*general step for all fun to rest i.e make empty  */
function resetForm() {
    formInput.value = '';
    formMessage.innerHTML = '';
}


/* ADD step3:- create list item dynamicaly*/
function createListItem(todo) {
    const listItem = document.createElement('li');
    listItem.setAttribute("id", todo.id);
    listItem.innerHTML = `<div class="${todo.priority}">
                             <span>${todo.text}</span>
                             <button class="delete">Delete</button>
                             <button class="edit">Edit</button>
                         </div>`
    todosList.appendChild(listItem);
}


/* ADD step2:- Add btn functionality*/
function addTodo(e) {
    e.preventDefault();
    if (e.target.innerText == "edit save") {
        saveTodo(e, formInput.value);
    } else {

        if (formInput.value == "") {
            formMessage.innerText = "Please enter the todo ..."
            setTimeout(() => formMessage.innerText = '', 1000);
        } else {
            const todo = {
                id: count++,
                text: formInput.value,
                priority: prioritySelect.value,
            };
            todosArr.push(todo);
            createListItem(todo);
        }
    }

}



/* ADD step 1:- calling / adding todos by eventlistener click*/
formAddButton.addEventListener('click', addTodo)

/*step3 :- new container is made after edit fun to prevent this i made this fun*/
function saveTodo(e, text) {
    targetTodo.innerText = text;
    formAddButton.innerText = "Add";
    resetForm();
}



/*step2 :- edit function */
function editTodo(e) {
    // console.log(e);
    targetTodo = e.path[1].firstElementChild;
    formInput.value = targetTodo.textContent;
    formAddButton.innerText = "edit save";

}

/*step2 :- create delete function which call in delete functionality*/
function deleteTodo(e) {
    // console.log(e);
    todosArr.forEach((ele, index) => {
        if (ele.id == parseInt(e.path[2].id)) todosArr.splice(index, 1);
    })
    e.path[2].remove();
}

/* step1 :- delete and edit btn functionality*/
todosList.addEventListener("click", (e) => {
    // console.log(e);
    if (e.target.classList.contains("delete")) {
        deleteTodo(e);
    } else if (e.target.classList.contains("edit")) {
        editTodo(e)
    }
})

/*step2 :- create the fun filter */
function filterTodos(e) {
    todosList.innerHTML = "";
    let temp;
    if (e.target.dataset.filter != "all") {
        temp = todosArr.filter(elem => elem.priority == e.target.dataset.filter)
        //todoarrs=[{h},{m},{l}]
        //temp =  todosArr.filter(elem => elem.priority ==low)
    
    } else {
        temp = todosArr;
    }
    temp.map(ele => {
        createListItem(ele);
    })
}


/* step1 :- adding event listener to filter*/
filterBtnsCont.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.classList.contains("js-filter-btn")) {
        filterTodos(e);
    }
})
