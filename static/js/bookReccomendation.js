function bookSearch(){
    if(typeof bookSearch.counter == 'undefined'){
        bookSearch.counter = 0;
    }
    var search = document.getElementById('search').value
    var a ='<a href="#" data-theme="b" data-role="button">',b='</a>'
    document.getElementById('results').innerHTML = ""
    console.log(search)
    var elementCount = 0;

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        
        success: function(data){
            console.log(data)
            for(i = 0 ; i < data.items.length ; i++){
                if(bookSearch.counter == 0){
                    searchbar.innerHTML +="<h2 style = left:50%>Search Results</h2>"  
                }
                var found = false; 
                if(i > 0){
                    for(j = 0 ; j < elementCount ; j++){
                        if(document.getElementById("title"+j).textContent == data.items[i].volumeInfo.title ){  //checks for duplicates
                            console.log("FOUND");
                            found = true;
                            break;
                        }
                    }
                }
                if(found == false){
                    results.innerHTML += "<div class= card style=width: 18rem;>" +
                                            "<img class=card-img-top src=" + data.items[i].volumeInfo.imageLinks.smallThumbnail +">"+
                                            "<div class = card-body>"+
                                                "<h5 id=title"+elementCount+" class=card-title>" + data.items[i].volumeInfo.title + "</h5>"+
                                                "<p>" + data.items[i].volumeInfo.authors[0] +"</p>" +
                                                "<button id=" + i + " type = button onclick = addBookToYourList(this.id) class=btn btn-primary>Get Reccomendation</button>" +
                                            "</div>"+
                                        "</div>"
                    elementCount++;
                }
            }
        },
        type: "GET"
    });
    bookSearch.counter++
}

function addBookToYourList(id){
    jQuery.support.cors = true;
    var divName = "card" + id;
    let thisDiv = $(divName).html();
    $.ajax({
        type: 'GET',
        url: '/recc',
        data: {book_name: document.getElementById("title"+id).textContent},
        success: function(response){
            document.getElementById("someId").style.display = "block";
            for(i = 0 ; i < 3 ; i++){
                console.log(response.Book_Name[i] + " " + response.Url[i]);
                yourList.innerHTML +=   "<div class= card style=width: 18rem;>" +
                                            "<img class=card-img-top src=" + response.Url[i] + ">"+
                                            "<div class = card-body>"+
                                                "<h5 id=title"+i+" class=card-title>" +  response.Book_Name[i] + "</h5>"+
                                            "</div>"+
                                        "</div>"
            }
        }
    });
}
