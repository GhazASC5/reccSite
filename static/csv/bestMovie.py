import pandas as pd

moviesData = pd.read_csv('DataforMovies.csv')
title = "Toy Story"


#mayve this is where relevance by gen
Data =  moviesData[moviesData.title == 'Toy Story ']

print(Data)

print(moviesData[:1])