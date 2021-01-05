#Import needed stuff
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from os import environ
import pymongo

#Build App
app = Flask(__name__)

#Configure
app.config['MONGO_URI'] = environ.get('MongoDB_URL', 'mongodb+srv://admin:Aliens2@cluster0.d3dkn.mongodb.net/AliensAll?retryWrites=true&w=majority')

#Initalize Mongo CLient
mongo = PyMongo(app)

#test route

@app.route('/test')
def test(): 
    aliens = mongo.db['Scrubbed & Cleaned'].find()
    alienslist = []
    for alien in aliens:
        alienslist.append({
            '_id': str(alien['_id'])
            #add in field names 
        })
        
    return jsonify(alienslist)
#Routes
@app.route('/')
def index():
    return render_template('index.html')

#For MongoBD
##Make new route
@app.route('/api/alien-mongo')
#Call up DB
def AliensMongo ():
    Aliens = mongo.Cluster0.AliensAll.find({})
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


#     {
#   "Datetime": "datetime",
#   "City": "city>",
#   "State": "state",
#   "Shape": "shape",
#   "Duration": "duration (seconds)",
#     "Comments": "comments",
#   "Lat": "latitude",
#   "Long": "longitude ",
#   "Month": "Month",
#   "Day": "Day",
#   "Time": "Time"
#   "Year": "Year"
# }