from flask import Flask, render_template, request, jsonify, json
import pandas as pd 
import matplotlib as plt
import numpy as numpy
from pandas import DataFrame


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

@app.route('/addToData', methods=['GET','POST'])
def add_data_to_csv():
    existingData = pd.read_csv("static/csv/googleBooksData.csv")
    #checks if book is already in dataframe or not
    if(request.args.get('book_name') in existingData.Book_Name.values):
        return "Data exists"
    else:
        #instantiatees a data data frame for the new book
        bookData = DataFrame({'Book_Name': request.args.get('book_name'), 'author': request.args.get('author'), "Url": request.args.get('url'),
                     "Average_Rating": request.args.get('rating'), "Ratings_Count": request.args.get('ratings_count'), "Categories": request.args.get('categories'), "Year_Published": request.args.get('year_published')}, index =[0])

        #realigns columns
        bookData = bookData[['Book_Name', 'author', 'Url', 'Average_Rating', 'Ratings_Count','Categories','Year_Published']]
        #adds data into the existing csv
        bookData.to_csv("static/csv/googleBooksData.csv", mode= 'a', header=False, index=False)
    return "Data was added"



@app.route('/movieReccomendation')
def moviePage():
    return render_template("movieReccomendation.html")

if __name__ == '__main__':
    app.run(debug=True)
