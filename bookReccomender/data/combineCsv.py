#Next implemention use BX-Users to generate better reccomendation

import pandas as pd 
import numpy as np

#Reads csv files and their headerss also some lines were giving errors so I had to use error_bad_lines to avoid them
Books = pd.read_csv("BX-Books.csv", sep = ';', names = ["ISBN", "Book-Title", "Book-Author", "Year-Of-Publication", "Publisher", "Image-URL-S","Image-URL-M","Image-URL-L"]  , error_bad_lines = False, low_memory = False)
BookRatings = pd.read_csv("BX-Book-Ratings.csv", sep = ';', names = ["User-ID", "ISBN", "Book-Rating"], error_bad_lines = False, low_memory = False)

#Dropped uncecessary rows
Books.drop(['Publisher','Image-URL-M', 'Image-URL-L'], axis = 1, inplace = True)
BookRatings.drop(['User-ID'], axis = 1 ,inplace = True)
# BookRatings = BookRatings.drop(columns = 'User-ID')

#Changed type of "Book-Rating" in order to get mean later on, this type was changed to a float from object
BookRatings['Book-Rating'] =  pd.to_numeric(BookRatings['Book-Rating'], errors = 'coerce')

#Created columns for mean and count and then renamed them
BookRatings = BookRatings.groupby('ISBN').agg(['mean','count'])
BookRatings.columns = ["Average_Rating", 'Total_Rating']

#Merged both data framed by common column name which was ISbN
mergedData = Books.merge(BookRatings, how = 'inner', on = "ISBN")

#Removed first row because it was unecessary
mergedData = mergedData.iloc[1:]

#sorts in descending order by Total Ratings
mergedData.sort_values(by=['Total_Rating'], ascending = False , inplace = True)

#Saved data as a new csv file
# mergedData.to_csv('../Data_for_Books.csv')