# Import needed stuff
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from os import environ
import pymongo

# Build App
app = Flask(__name__)

# Configure
app.config['MONGO_URI'] = environ.get(
    'MONGODB_URI', 'mongodb+srv://admin:Aliens2@cluster0.d3dkn.mongodb.net/AliensAll?retryWrites=true&w=majority')

# Initalize Mongo CLient
mongo = PyMongo(app)


# Routes - render templates
@app.route('/')
def index():
    return render_template('index.html')

# Individual Page Routes
# about
@app.route('/about')
def about():
    return render_template('About.html')

# analyze
@app.route('/analyze')
def analyze():
    return render_template('Analyze.html')

# explore
@app.route('/explore')
def explore():
    return render_template('Explore.html')

# jsdata
@app.route('/jsdata')
def jsdata():
    return render_template('JSData.html')

# obs
@app.route('/obs')
def obs():
    return render_template('obs.html')


# Make new route for API

# @app.route('/api/alien-mongo')
# # Call up DB
# def AliensMongo():
#     aliens = mongo.db['Scrubbed & Cleaned'].find()
#     alienslist = []
#     for alien in aliens:
#         alienslist.append({
#             '_id': str(alien['_id']),
#             "City": str(alien['city']),
#             "State": str(alien['state']),
#             "Shape": str(alien['shape']),
#             "Duration": str(alien['duration (seconds)']),
#             "Lat": str(alien['latitude']),
#             "Long": str(alien['longitude']),
#             "Month": str(alien['Month']),
#             "Day": str(alien['Day']),
#             "Time": str(alien['Time']),
#             "Year": str(alien['Year'])
#             # add in field names
#         })

#     return jsonify(alienslist)


@app.route('/geojson')
def test():
    aliens = mongo.db['Scrubbed & Cleaned'].find()
    alienslist2 = [
        {"type": "FeatureCollection",
        "features": []
        }
    ]
    for alien in aliens:
        alienslist2[0]["features"].append(
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [str(alien['latitude']), str(alien['longitude'])]
                    }, 
            "properties": {
                "City": str(alien['city']),
                "State": str(alien['state']),
                "Shape": str(alien['shape']),
                "Duration": str(alien['duration (seconds)']),
                "Month": str(alien['Month']),
                "Day": str(alien['Day']),
                "Time": str(alien['Time']),
                "Year": str(alien['Year'])
                }
            })
     
    return jsonify(alienslist2)


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
