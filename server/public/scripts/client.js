console.log('js');

$( document ).ready( function(){
    console.log( 'JQ' );
    getItems();
  
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