# Import needed stuff
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
from os import environ
import pymongo
import pandas as pd 

# Build App
app = Flask(__name__)

# Configure
app.config['MONGO_URI'] = environ.get('MONGODB_URI','mongodb+srv://admin:Aliens3@cluster0.xa16u.mongodb.net/Aliens3?retryWrites=true&w=majority')

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
    return render_template('about.html')

# analyze
@app.route('/visulizations')
def visulizations():
    return render_template('visulizations.html')

# explore
@app.route('/explore')
def explore():
    return render_template('explore.html')

# data
@app.route('/datafilter')
def datafilter():
    return render_template('datafilter.html')

# # obs
# @app.route('/obs')
# def obs():
#     return render_template('obs.html')


##Make new routes for API calls

#test route

@app.route('/test')
def test(): 
    aliens = mongo.db['Aliens3'].find()
    alienslist = []
    for alien in aliens:
        alienslist.append({
            '_id': str(alien['_id']),
             "City": str(alien['city']),
             "State": str(alien['state']),
             "Shape": str(alien['shape']),
             "Duration": str(alien['duration (seconds)']),
             "Lat": str(alien['latitude']),
             "Long": str(alien['longitude']),
            "Month": str(alien['Month']),
            "Day": str(alien['Day']),
             "Time": str(alien['Time']),
            "Year": str(alien['Year'])
            #add in field names 
        })
        
    return jsonify(alienslist)

@app.route('/api/alien-mongo')
#Call up DB
def AliensMongo ():
    aliens = mongo.db['Aliens3'].find()
    for alien in aliens:
        alienslist.append({
            '_id': str(alien['_id']),
             "City": str(alien['city']),
             "State": str(alien['state']),
             "Shape": str(alien['shape']),
             "Duration": str(alien['duration (seconds)']),
             "Lat": str(alien['latitude']),
             "Long": str(alien['longitude']),
            "Month": str(alien['Month']),
            "Day": str(alien['Day']),
             "Time": str(alien['Time']),
            "Year": str(alien['Year'])
            #add in field names 
        })
        
    return jsonify(alienslist)

# @app.route('/geojson')
# def test1():
#     aliens = mongo.db['Aliens3'].find()
#     alienslist2 = [
#         {"type": "FeatureCollection",
#         "features": []
#         }
#     ]
#     for alien in aliens:
#         alienslist2[0]["features"].append(
#             {
#                 "type": "Feature",
#                 "geometry": {
#                     "type": "Point",
#                     "coordinates": [str(alien['latitude']), str(alien['longitude'])]
#                     }, 
#             "properties": {
#                 "City": str(alien['city']),
#                 "State": str(alien['state']),
#                 "Shape": str(alien['shape']),
#                 "Duration": str(alien['duration (seconds)']),
#                 "Month": str(alien['Month']),
#                 "Day": str(alien['Day']),
#                 "Time": str(alien['Time']),
#                 "Year": str(alien['Year'])
#                 }
#             })
     
#     return jsonify(alienslist2)

@app.route('/pooled')
def pooled ():
    aliens = mongo.db['Aliens3'].find()
    alien_df =  pd.DataFrame.from_records(aliens)

    # Delete the _id
    alien_df.drop(columns=['_id', 'Unique_ID'], inplace = True)

    alien_df['duration (seconds)']=pd.to_numeric(alien_df['duration (seconds)'])

    alien_df['duration']=alien_df['duration (seconds)']
    alien_bystate=alien_df.groupby(['Year','state','shape'], as_index=False).agg(
        {
            'duration (seconds)': sum,
            'duration': 'mean',
            'city': 'count'
        }
    )
    alien_bystate=alien_bystate.rename(columns={
        "duration (seconds)": "total duration", 
        "duration": "mean duration", 
        "city":"number of sightings"
        }
    )
    return alien_bystate.to_json(orient='records')

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

@app.route('/geojson')
def test():
    aliens = mongo.db['Aliens3'].find()
    alien_df = pd.read_csv('static/assets/cleaned_Final_ufo_data.csv')
    alienslist2 = [{"type": "FeatureCollection", "features": []}]
    for index, row in alien_df.iterrows():
        alienslist2[0]["features"].append(
            {"type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [str(row['latitude']), str(row['longitude'])]
                }, 
            "properties": {
                "City": str(row['city']),
                "State": str(row['state']),
                "Shape": str(row['shape']),
                "Duration": str(row['duration (seconds)']),
                "Month": str(row['Month']),
                "Day": str(row['Day']),
                "Time": str(row['Time']),
                "Year": str(row['Year'])
                }
            })
    # alienslist2 = [
    #     {"type": "FeatureCollection",
    #     "features": []
    #     }
    # ]
    # for alien in aliens:
    #     alienslist2[0]["features"].append(
    #         {
    #             "type": "Feature",
    #             "geometry": {
    #                 "type": "Point",
    #                 "coordinates": [str(alien['latitude']), str(alien['longitude'])]
    #                 }, 
    #         "properties": {
    #             "City": str(alien['city']),
    #             "State": str(alien['state']),
    #             "Shape": str(alien['shape']),
    #             "Duration": str(alien['duration (seconds)']),
    #             "Month": str(alien['Month']),
    #             "Day": str(alien['Day']),
    #             "Time": str(alien['Time']),
    #             "Year": str(alien['Year'])
    #             }
    #         })
    return jsonify(alienslist2)