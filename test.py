import sqlite3

connection = sqlite3.connect("BX-Books.sql")

cursor = connection.cursor()
cursor.execute("SELECT * FROM BX-Book")
test = cursor.fetchall()
print(test)