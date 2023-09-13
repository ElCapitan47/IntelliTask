
$(document).ready(function(){
  console.log('Form submitted with data:');
  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};
      console.log('Form submitted with data:', todo);

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){      //checks data returned from todoController.js file and reloads the page thereafter
          location.reload();          //re-renders the todo.ejs file after addition/deletion of task and reloads the page with the change included
        }
      });
      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});

