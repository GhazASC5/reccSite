from flask import Flask, render_template, request, jsonify, json
import pandas as pd 
import numpy as numpy


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('userPage.html')

@app.route('/bookReccomendation')
def bookPage():
    return render_template('bookReccomendation.html') 

@app.route('/recc', methods=['GET', 'POST'])
def get_divinfo():
    bookName = request.args.get("book_name")
    data = pd.read_csv("static/csv/Data_for_Books.csv")

    thisBookData = data[data.Book_Title == bookName]

    rating = float(thisBookData.Average_Rating)
    averageAge = float(thisBookData.Average_Age)
    yearpublished = int(thisBookData.Year_Published)
    totalRating = int(thisBookData.Total_Rating)

    #Finds closest books to the book picked
    ReccomendedBook = data[(abs(data['Average_Rating']-rating)<=.5)
                        &(abs(data['Year_Published']-yearpublished)<=5)
                        &(abs(data['Year_Published']-yearpublished)<=5)
                        &(abs(data['Total_Rating']-totalRating)<=400)]

    # ReccomendedBook = ReccomendedBook[ReccomendedBook['Book_Title']!=bookName]
    
    bestBook = ReccomendedBook.iloc[:3]
    # print(bestBook)
    book_names = []
    book_url = []
    for books in range(3):
        bookName = str(bestBook.iloc[[books]].Book_Title)
        bookUrl = str(bestBook.iloc[[books]].Link_To_Image)
        bookName = bookName[2:bookName.find("Name")]
        bookUrl = bookUrl[2:bookUrl.find("Name")]

        book_names.append(bookName)
        book_url.append(bookUrl)

    bestBookName = (str(bestBook.Book_Title))
    bestBookName = bestBookName[2:bestBookName.find("Name")]

    bestBookUrl = str(bestBook.Link_To_Image)
    bestBookUrl = bestBookUrl[2:bestBookUrl.find("Name")]

    bookInfo = {'Book_Name': book_names, "Url": book_url}
    return bookInfo

@app.route('/movieReccomendation')
def moviePage():
    return render_template("movieReccomendation.html")

if __name__ == '__main__':
    app.run(debug=True)
