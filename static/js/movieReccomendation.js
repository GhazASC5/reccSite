function movieSearch(){
    var search = document.getElementById('search').value
    var a ='<a href="#" data-theme="b" data-role="button">',b='</a>'
    document.getElementById('results').innerHTML = ""
    console.log(search)

    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?api_key=4e7539d661536bf5a2c1c4ea8a1e3338&query=" + search,
        dataType: "json",
        
        success: function(data){
            console.log(data)
            for(i = 0 ; i < data.results.length ; i++){
                console.log(data.results[i].poster_path);
                results.innerHTML += "<div><h4>" + data.results[i].original_title + "</h4><img src=https://image.tmdb.org/t/p/w185" +data.results[i].poster_path+  "></div>"
            }
        },
        type: "GET"
    });
}
