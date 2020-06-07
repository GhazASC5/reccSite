import pandas as pd 
import numpy as np
import matplotlib as plt

#Reads csv files and their headerss also some lines were giving errors so I had to use error_bad_lines to avoid them
Books = pd.read_csv("BX-Books.csv", sep = ';', names = ["ISBN", "Book-Title", "Book-Author", "Year-Of-Publication", "Publisher", "Image-URL-S","Image-URL-M","Image-URL-L"]  , error_bad_lines = False, low_memory = False)
BookRatings = pd.read_csv("BX-Book-Ratings.csv", sep = ';', names = ["User-ID", "ISBN", "Book-Rating"], error_bad_lines = False, low_memory = False)
Users = pd.read_csv("BX-Users.csv", sep = ';', names = ['userID', 'Location', 'Age'], error_bad_lines = False, low_memory = False)

# Dropped uncessary columns in Users and renamed User--ID
Users.rename(columns = {"userID": "User-ID"}, inplace = True)
Users['Age'] = pd.to_numeric(Users['Age'], errors = 'coerce')
Users.dropna(inplace = True)

# Made a new data frame by merging BookRatings and Users in order to find the average age per book
AverageAge = BookRatings.merge(Users, how = 'inner', on = "User-ID").iloc[1:]
AverageAge.drop(['Location'], axis = 1, inplace = True)
AverageAge = AverageAge.groupby('ISBN')['Age'].mean()

# Dropped uncecessary rows
Books.drop(['Publisher','Image-URL-M', 'Image-URL-L'], axis = 1, inplace = True)
BookRatings.drop(['User-ID'], axis = 1 ,inplace = True)

#Changed type of "Book-Rating" in order to get mean later on, this type was changed to a float from object
BookRatings['Book-Rating'] =  pd.to_numeric(BookRatings['Book-Rating'], errors = 'coerce')

#Created columns for mean and count and then renamed them and removes books with too little data
BookRatings = BookRatings.groupby('ISBN').agg(['mean','count'])
BookRatings.columns = ["Average_Rating", 'Total_Rating']
BookRatings.drop(BookRatings[(BookRatings.Total_Rating < 50) | (BookRatings.Average_Rating == 0)].index, inplace = True)

# Merged AverageAge data frame to BookRatings 

BookRatings = BookRatings.merge(AverageAge, how = 'inner', on = 'ISBN')
BookRatings.rename(columns = {"Age": "Average_Age"}, inplace = True)

# Merged both data framed by common column name which was ISbN
mergedData = Books.merge(BookRatings, how = 'inner', on = "ISBN")

#Removed first row because it was unecessary
mergedData = mergedData.iloc[1:]

#sorts in descending order by Total Ratings
mergedData.sort_values(by=['Total_Rating'], ascending = False , inplace = True)
#at this point ISBN is no longer relevant
mergedData.drop(['ISBN'], axis = 1, inplace = True)
mergedData.rename(columns = {"Book-Title": "Book_Title", "Book-Author": "Book_Author", "Year-Of-Publication": "Year_Published", "Image-URL-S": "Link_To_Image"}, inplace = True)

#Saved data as a new csv file
mergedData.to_csv('../Data_for_Books.csv')