# Project-2

This project seeks to explore self-reported UFO Sighting data from the National UFO Research Center (NUFORC) in the United States between the years of 1993 and 2020. These dynamic visualizations illuminate trends in the dataset based on the location, shape and duration of sightings.

The data was sourced from an existing dataset on Kaggle.com with updated information scraped from the NUFORC website to represent reported UFO sightings through December, 2020. This scraped information was cleaned and updated to match the existing fields of the Kaggle dataset by establishing location via latitude and longitude with the Google Maps API. 

Our dynamic visualizations include a Leaflet map with both marker and heat layers to plot reported UFO Sightings and filter by the year sighted. This mapping data was transformed into GEOJSON format to enable future mapping opportunities with alternate programs. The individual points on the marker map represent the shape of the UFO sighted by color and the duration in seconds based on the radius of the point. 

Additionally, our website features an interactive Plotly bubble chart to explore the correlation between shape, duration, and year sighted and a word cloud to demonstrate the most commonly used descriptors of sightings. To explore our data in a more raw form, our website includes a data table with functionality to filter by date. 
