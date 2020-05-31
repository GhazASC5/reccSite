function bookSearch(){
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
                results.innerHTML += "<div class = card id = card"  + i + ">"  + "<h4 id = title style = text-align:center;>" + data.items[i].volumeInfo.title + "</h4>" + "<img src = " + data.items[i].volumeInfo.imageLinks.thumbnail + "id = bookPicture" + i + " style = width:100%;>" + "<div class = container>" +"<p><button class = w3-button-xlarge type = button onclick = addBookToYourList(this.id) style = width:100%; id =" + i + " >Add</button></p>" + "</div>" + "</div>"
            }
        },
        type: "GET"
    });
}
function addBookToYourList(id){
    document.getElementById(id).remove()
    var cardDiv =  document.getElementById("card" +id);
    var clone = cardDiv.cloneNode(true);
    var list= document.getElementById("yourList")
    list.appendChild(clone);
    cardDiv.remove();
    
}

document.getElementById('button').addEventListener('click', bookSearch, false)
