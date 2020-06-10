from flask import Flask, render_template, request, jsonify
import pandas as pd 
import numpy as numpy


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('userPage.html')

@app.route('/bookReccomendation')
def bookPage():
    return render_template('bookReccomendation.html') 

@app.route('/recc', methods=['GET','POST'] )
def get_divinfo():
    bookName = request.args.get("book_name")
    data = pd.read_csv("static/csv/Data_for_Books.csv")

    thisBookData = data[data.Book_Title == bookName]

    rating = float(thisBookData.Average_Rating)
    averageAge = float(thisBookData.Average_Age)
    yearpublished = int(thisBookData.Year_Published)
    totalRating = int(thisBookData.Total_Rating)

    #Finds closest books to the book picked
    ReccomendedBook = data[(abs(data['Average_Rating']-rating) <= .5 )&(abs(data['Year_Published']-yearpublished) <=5)&(abs(data['Year_Published']-yearpublished)<=5)&(abs(data['Total_Rating']-totalRating)<=400)]

    ReccomendedBook = ReccomendedBook[ReccomendedBook['Book_Title']!=bookName] 

    print(ReccomendedBook.iloc[:5])
    #Figure out how to pass elements back html
    return render_template('bookReccomendation.html', data=ReccomendedBook.iloc[:5])


if __name__ == '__main__':
    app.run(debug=True)
