function bookSearch(){
    var search = document.getElementById('search').value
    document.getElementById('results').innerHTML = ""
    console.log(search)

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        
        success: function(data){
            console.log(data)
            for(i = 0 ; i < data.items.length ; i++){
                results.innerHTML += "<div class = container"
                results.innerHTML += "<h2>" + data.items[i].volumeInfo.title + "</h2>"
                results.innerHTML += "<img src = " + data.items[i].volumeInfo.imageLinks.thumbnail + ">"
                results.innerHTML += "</div>"
                // results.innerHTML += "<br></br>"
            }
        },
        type: "GET"
    });
}
document.getElementById('button').addEventListener('click', bookSearch, false)