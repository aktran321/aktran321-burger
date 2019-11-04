$(function(){
    $(".change-devour").on("click", function(event) {
        var id = $(this).data("id");
        var newDevour = $(this).data("newDevour")
        var newDevourState = {
            devoured:newDevour
        };
        //send the put request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function(){
                console.log("changed devoured to", newDevour);
                location.reload();
            }
        );
    });
    $(".create-form").on("submit", function(event){
        event.preventDefault();
        var newBurger = {
            name: $("#burg").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };
        //Send the post requet
    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
        function(){
            console.log("created new burger");
            //reload the page to get the updated list
            location.reload();
        }
    );
    });
    $(".delete-burger").on("click", function(event) {
        var id = $(this).data("id");
    
        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
    
});