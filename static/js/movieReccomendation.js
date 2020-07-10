function movieSearch(){
    var search = document.getElementById('search').value
    var a ='<a href="#" data-theme="b" data-role="button">',b='</a>'
    document.getElementById('results').innerHTML = ""
    console.log(search)

    var elementCount = 0

    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?api_key=4e7539d661536bf5a2c1c4ea8a1e3338&query=" + search,
        dataType: "json",
        
        success: function(data){
            for(i = 0 ; i < data.results.length ; i++){
                console.log(data.results[i].poster_path);
                
                results.innerHTML  += "<div class= card style=width: 18rem;>" +
                                            "<img style= width: 200px; height: 200px;class=card-img-top src=https://image.tmdb.org/t/p/w185" + data.results[i].poster_path +">"+
                                            "<div class = card-body>"+
                                                "<h5 id=title"+elementCount+" class=card-title>" + data.results[i].original_title  + "</h5>"+
                                                    "<button style=margin-bottom:10px;width:175px: class=btn btn-primary onclick = displayModel(this.id) id=myBtn_" + elementCount + ">Movie Description</button>" +
                                                    "<div id=myModal"+elementCount + " class=modal>"+
                                                        "<div class=modal-content>" +
                                                            "<span id =close"+elementCount+ " class=close>&times;</span>"+
                                                            "<h4> Title: "+data.results[i].original_title+"</h1>"+
                                                            "<h4> Movie Overview: </h4>"+ 
                                                            "<p>"+data.results[i].overview+"</p>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "<button id=" +elementCount+ " onclick = movieReccomendation(this.id) type = button class=btn btn-primary>Get Reccomendation</button>" +
                                            "</div>"+
                                        "</div>"
                
                elementCount++
            }
        },
        type: "GET"
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



function movieReccomendation(id){
    jQuery.support.cors = true;
    // var divName = "card" + id;
    console.log(document.getElementById("title"+id).textContent);
    let thisDiv = $(divName).html();
    $.ajax({
        type: 'GET',
        url: '/movieRecc',
        data: {movie_name: document.getElementById("title"+id).textContent},
        success: function(response){
            document.getElementById("someId").style.display = "block";
            for(i = 0 ; i < 3 ; i++){
                // console.log(response.Book_Name[i] + " " + response.Url[i]);
                // yourList.innerHTML +=   "<div class= card style=width: 18rem;>" +
                //                             "<img class=card-img-top src=" + response.Url[i] + ">"+
                //                             "<div class = card-body>"+
                //                                 "<h5 id=title"+i+" class=card-title>" +  response.Book_Name[i] + "</h5>"+
                //                                 "<p>" + response.Book_Author[i] + "</p>"
                //                             "</div>"+
                //                         "</div>"
            }
        }
    });
}


//data comes in the following format
// adult: false
// backdrop_path: "/aPecTV7sHkgCfR4TnrrKuIdyYkd.jpg"
// genre_ids: [99] (1)
// id: 621551
// original_language: "en"
// original_title: "Chelsea FC - Season Review 2017/18"
// overview: "Chelsea have developed that winning habit of ending the season in glory. The Blues' eighth FA Cup triumph arrived in a campaign which onc…"
// popularity: 4.294
// poster_path: "/t8GxjZfIzsCHEKEJexxi3byurWT.jpg"
// release_date: "2018-06-18"
// title: "Chelsea FC - Season Review 2017/18"
// video: true
// vote_averae: 0
// vote_count: 0