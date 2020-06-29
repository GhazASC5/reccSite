import sqlite3
from sqlite3 import Error

connection = sqlite3.connect("Users.db")

c = connection.cursor()

# c.execute('''Create Table UserLogins
#                 (Username text, Password text)''')

c.execute("Insert into UserLogins Values('Ghazanfar', 'Test')")
# for row in c.execute('Select Username from UserLogins'):
    # print(row)
# print(c.fetchone())
connection.commit()

user = 'Ghazanfar'
password = "Test"

c.execute('Select * from UserLogins Where "Username" = ? and "Password" = ? ', (user,password,))

print(c.fetchone())

connection.close()