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

function render(itemArray){
    console.log('render called');
    $('#taskList').empty();
    
    // let readyBtn = `
    //   <td>
    //     <button class="readyBtn">
    //       Ready to Transfer
    //     </button>
    //   </td>`;
  
    for(let item of itemArray){
    //   let ready = koala.ready_to_transfer;
      //if koala.ready is true, add nothing,
      // else add readyBtn
      let row = $(`<tr>
      <td>${item.task}</td>
      <td>${item.completion_status}</td> 
      </tr>`);
      //.data(koala); // bundle the koala data into the tr
      // add koala row to table
      $('#taskList').append(row);
    }
  }//end render 

  function setupClickListeners() {
    $( '#addTaskBtn' ).on( 'click', function(){
      console.log( 'in addTaskBtn on click' );
      // get user input and put in an object
      // NOT WORKING YET :(
      // using a test object
      let ItemToSend = {
        task: $(`#taskIn`).val()
        // age: $(`#ageIn`).val(),
        // gender: $(`#genderIn`).val(),
        // ready: $(`#readyForTransferIn`).val(),
        // notes: $(`#notesIn`).val()
      };
      // call saveKoala with the new object
      postItems( ItemToSend ); //
    }); 
  
    // dynamic click for readyKoala
    //$('#viewKoalas').on('click', '.readyBtn', readyKoala);
  }