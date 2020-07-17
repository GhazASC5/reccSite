function videoGameSearch(){

    $.ajax({
        type: 'GET',
        url: '/gameSearch',
        data: {search: document.getElementById('search').value},
        success: function(response){
            results.innerHTML = "";
            for(i = 0 ; i < response.game_info.length ; i++){
                results.innerHTML += "<div class= card style=width: 18rem;>" +
                                                "<img class=card-img-top src=" + response.game_info[i].game_image  +">"+
                                                "<div class = card-body>"+
                                                    "<h5 id=title"+i+" class=card-title>" + response.game_info[i].game_name + "</h5>"+
                                                        "<button style=margin-bottom:10px;width:175px: class=btn btn-primary onclick = displayModel(this.id) id=myBtn_" + elementCount + ">Book Description</button>" +
                                                        "<div id=myModal"+elementCount + " class=modal>"+
                                                            "<div class=modal-content>" +
                                                                "<span id =close"+elementCount+ " class=close>&times;</span>"+
                                                                "<h4> Title: "+data.items[i].volumeInfo.title+"</h1>"+
                                                                "<h4> Author: "+data.items[i].volumeInfo.authors[0]+"</h3>"+
                                                                "<h4> Book Description: </h4>"+ 
                                                                "<p>"+data.items[i].volumeInfo.description+"</p>"+
                                                                "</div>"+
                                                        "</div>"+
                                                    "<button id=" + i + " type = button onclick = addBookToYourList(this.id) class=btn btn-primary>Get Reccomendation</button>" +
                                                "</div>"+
                                            "</div>"
            }
        }
    });
}


function displayModel(this_id){
    id = this_id.substr(this_id.indexOf('_')+1)
    var modal = document.getElementById("myModal"+id);

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn_"+id);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[id];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
