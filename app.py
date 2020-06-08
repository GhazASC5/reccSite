from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('userPage.html')

@app.route('/bookReccomendation.html')
def bookPage():
    return render_template('bookReccomendation.html') 


if __name__ == '__main__':
    app.run(debug = True)