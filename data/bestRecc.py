import pandas as pd
import numpy as np

data = pd.read_csv("static/csv/Data_for_Books.csv")
bookName = "Harry Potter and the Sorcerer's Stone"

thisBookData = data[data.Book_Title == bookName]

rating = float(thisBookData.Average_Rating)
averageAge = float(thisBookData.Average_Age)
yearpublished = int(thisBookData.Year_Published)
totalRating = int(thisBookData.Total_Rating)

#Finds closest books to the book picked
ReccomendedBook = data[(abs(data['Average_Rating']-rating) <= .5 )&(abs(data['Year_Published']-yearpublished) <=5)&(abs(data['Year_Published']-yearpublished)<=5)&(abs(data['Total_Rating']-totalRating)<=400)]

ReccomendedBook = ReccomendedBook[ReccomendedBook['Book_Title']!=bookName]

print(ReccomendedBook)