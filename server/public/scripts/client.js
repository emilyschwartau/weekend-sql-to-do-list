console.log('js');

$(document).ready(function () {
    console.log('JQ');
    getItems();
    setupClickListeners();
}); // end doc ready

//GET
function getItems() {
    console.log('in getItems');

    $.ajax({
        type: 'GET',
        url: '/items'
    }).then(function (response) {
        console.log(response);
        render(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });

}// end getItems

//POST
function postItems(newItem) {
    console.log('in postItems', newItem);

    $.ajax({
        method: `POST`,
        url: `/items`,
        data: {
            task: newItem.task,
            completion_status: newItem.completion_status
        }
    }).then(function (response) {
        console.log(`Item successfully added!`, response);
        getItems();
        $(`#taskIn`).val(``);
    }).catch(function (response) {
        alert(`Unable to add item! Error!`, response)
    });
}//end postItems

//PUT
function putItems() {
    console.log('putItems called');
    let itemData = $(this).closest('tr').data()

    $.ajax({
        method: 'PUT',
        url: `/items/${itemData.id}`,
        data: {}
    }).then((res) => {
        console.log('item completed');
        getItems();
    }).catch(err => {
        console.log('put error', err);
    })
}//end putItems

//DELETE
function deleteItems() {
    let idToDelete = $(this).closest('tr').data('id');

    console.log(idToDelete);

    $.ajax({
        method: 'DELETE',
        url: `/items/${idToDelete}`
    }).then(function (response) {
        console.log(response);
        //db is updated, dom is not. Call GET again.
        getItems();
    }).catch(function (error) {
        alert(error);
    })
}//end deleteItems

//RENDER
function render(itemArray) {
    console.log('render called');
    $('#taskList').empty();

    for (let item of itemArray) {
        if (item.completion_status == true) {
            let row = $(`<tr class="completed">
            <td>${item.task}</td>
            <td>${item.completion_status}</td> 
            <td><button class="deleteBtn">Delete</button></td>
            </tr>`)
                .data(item); // bundle the item data into the tr
            // add item row to table
            $('#taskList').append(row);
        }//end if
        if (item.completion_status == false) {
            let row = $(`<tr>
            <td>${item.task}</td>
            <td>${item.completion_status}</td> 
            <td><button class="completedBtn">Mark as Complete</button></td>
            <td><button class="deleteBtn">Delete</button></td>
            </tr>`)
                .data(item); // bundle the item data into the tr
            // add item row to table
            $('#taskList').append(row);
        }//end if
    }//end for
} //end render 

//CLICK LISTENERS
function setupClickListeners() {

    //add task button
    $('#addTaskBtn').on('click', function () {
        console.log('in addTaskBtn on click');
        let ItemToSend = {
            task: $(`#taskIn`).val(),
            completion_status: false
        };
        postItems(ItemToSend);
    });

    // Mark as complete button
    $('#taskList').on('click', '.completedBtn', putItems);

    // Delete button
    $('#taskList').on('click', '.deleteBtn', deleteItems);
}//end setupClickListeners