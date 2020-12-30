#Import needed stuff
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from os import environ

#Build App
app = Flask(__name__)

#Configure
app.config['MONGO_URI'] = environ.get('MongoDB_URL', 'mongodb://localhost:27017/Aliens2')

#Initalize Mongo CLient
mongo = PyMongo(app)

#Routes
@app.route('/')
def index():
    return render_template('Template\index.html')

#For MongoBD
##Make new route
@app.route('/api/tasks-mongo')
#Call up DB
def AliensMongo ():
    Aliens = mongo.db.Aliens2.find({})
    data = []

    for Alien in Aliens:
        item =  {
            'Datetime': Aliens['datetime'],
            'City': Aliens['city'],
        }
        data.append(item)

    return jsonify (data)



if __name__ == '__main__':
    app.run(debug=True)