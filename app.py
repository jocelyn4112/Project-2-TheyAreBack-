#Import needed stuff
from flask import Flask
from flask_pymongo import PyMongo
from os import environ

#Build App
app = Flask(__name__)

#Configure
app.config['MONGO_URI'] = environ.get('MongoDB_URL', 'mongodb://localhost:27017/Aliens2')

#Initalize Mongo CLient
mongo = PyMongo(app)


@app.route('/')
def index():
    return 'HW'

if __name__ == '__main__':
    app.run(debug=True)