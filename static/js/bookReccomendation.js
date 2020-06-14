function bookSearch(){
    if(typeof bookSearch.counter == 'undefined'){
        bookSearch.counter = 0;
    }
    var search = document.getElementById('search').value
    var a ='<a href="#" data-theme="b" data-role="button">',b='</a>'
    document.getElementById('results').innerHTML = ""
    console.log(search)

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        
        success: function(data){
            console.log(data)
            for(i = 0 ; i < data.items.length ; i++){
                if(bookSearch.counter == 0){
                    searchbar.innerHTML +="<h2 style = left:50%>Search Results</h2>"  
                }
                results.innerHTML += "<div class = card id = card"  + i + ">"  
                        + "<h4 id = title style = text-align:center;>" 
                        + data.items[i].volumeInfo.title + "</h4>" + 
                        "<img src = " + data.items[i].volumeInfo.imageLinks.thumbnail + 
                        "id = bookPicture" + i + " style = width:100%;>" + 
                        "<div class = container>" +
                        "<p><button class = w3-button-xlarge type = button onclick = addBookToYourList(this.id) style = width:100%; id =" + i + 
                        " >Add</button></p>" + 
                        "</div>" + 
                        "</div>"
            }
        },
        type: "GET"
    });
    bookSearch.counter++
}

function addBookToYourList(id){
    console.log(document.getElementById("card"+id).childNodes[0].textContent);
    jQuery.support.cors = true;
    var divName = "card" + id;
    let thisDiv = $(divName).html();
    $.ajax({
        type: 'GET',
        url: '/recc',
        data: {book_name: document.getElementById("card"+id).childNodes[0].textContent},
        dataType: "text"

        
    }); 
    console.log(book)
    // let bookname = {{ data }};
    // console.log(bookname);

}
