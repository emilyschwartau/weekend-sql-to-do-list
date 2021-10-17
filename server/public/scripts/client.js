console.log('js');

$( document ).ready( function(){
    console.log( 'JQ' );
    getItems();
    setupClickListeners();
}); // end doc ready

function getItems(){
    console.log( 'in getItems' );
    // ajax call to server to get items
  
    $.ajax({
      type: 'GET',
      url: '/items'
    }).then(function(response) {
      console.log(response);
      render(response);
    }).catch(function(error){
      console.log('error in GET', error);
    });
    
} // end getItems

function postItems( newItem ){
    console.log( 'in postItems', newItem );
    // ajax call to server to get koalas
  
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
      //$(`#readyForTransferIn`).val(``);
    }).catch(function (response) {
      alert(`Unable to add item! Error!`, response)
    });
  };

  function putItems(){
    // do a put request to update completion_status in db
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
  }

function render(itemArray){
    console.log('render called');
    $('#taskList').empty();
  
    for(let item of itemArray){
        if (item.completion_status == true) {
            let row = $(`<tr>
            <td>${item.task}</td>
            <td>${item.completion_status}</td> 
            </tr>`)
            .data(item); // bundle the item data into the tr
            // add item row to table
            $('#taskList').append(row);   
        }
        if (item.completion_status == false) {
            let row = $(`<tr>
            <td>${item.task}</td>
            <td>${item.completion_status}</td> 
            <td><button class="completedBtn">Mark as Complete</button></td>
            </tr>`)
            .data(item); // bundle the item data into the tr
            // add item row to table
            $('#taskList').append(row);   
        }
    }
  }//end render 

  function setupClickListeners() {
    $( '#addTaskBtn' ).on( 'click', function(){
      console.log( 'in addTaskBtn on click' );
      // get user input and put in an object
      let ItemToSend = {
        task: $(`#taskIn`).val(),
        completion_status: false
      };
      // call postItems with the new object
      postItems( ItemToSend ); 
    }); 
  
    // dynamic click for readyKoala
    $('#taskList').on('click', '.completedBtn', putItems);
  }