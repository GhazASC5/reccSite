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
            console.log(data)
            for(i = 0 ; i < data.results.length ; i++){
                console.log(data.results[i].poster_path);
                
                results.innerHTML  += "<div class= card style=width: 18rem;>" +
                                            "<img class=card-img-top src=https://image.tmdb.org/t/p/w185" + data.results[i].poster_path +">"+
                                            "<div class = card-body>"+
                                                "<h5 id=title"+elementCount+" class=card-title>" + data.results[i].original_title  + "</h5>"+
                                                    // "<p id=author" + elementCount + ">" + data.items[i].volumeInfo.authors[0] +"</p>" +
                                                    // "<button style=margin-bottom:10px;width:175px: class=btn btn-primary onclick = displayModel(this.id) id=myBtn_" + elementCount + ">Book Description</button>" +
                                                    // "<div id=myModal"+elementCount + " class=modal>"+
                                                    //     "<div class=modal-content>" +
                                                    //         "<span id =close"+elementCount+ " class=close>&times;</span>"+
                                                    //         "<h4> Title: "+data.items[i].volumeInfo.title+"</h1>"+
                                                    //         "<h4> Author: "+data.items[i].volumeInfo.authors[0]+"</h3>"+
                                                    //         "<h4> Book Description: </h4>"+ 
                                                    //         "<p>"+data.items[i].volumeInfo.description+"</p>"+
                                                    //     "</div>"+
                                                    // "</div>"+
                                                "<button type = button class=btn btn-primary>Get Reccomendation</button>" +
                                            "</div>"+
                                        "</div>"
                
                elementCount++
            }
        },
        type: "GET"
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