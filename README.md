## Project-2

##Introduction

This site was developed as an exercise in data analysis, visualization and web deployment. The data is derived from Kaggle (1992-2014) and web scraping (2004-2020) and utilizes a MongoDB database of over 100,000 entries. Visualizations are powered by Leaflet, Plotly, and D. The development process utilized Python, JavaScript, Jupyter Notebooks, Flask and Splinter with deployment by Heroku. Plotly,D3, and Simpleheat JaveScript libraries were used.

##Purpose

This project seeks to explore self-reported UFO Sighting data from the National UFO Research Center (NUFORC) in the United States between the years of 1993 and 2020. These dynamic visualizations illuminate trends in the dataset based on the location, shape and duration of sightings.
The data was sourced from an existing dataset on Kaggle.com with updated information scraped from the NUFORC website to represent reported UFO sightings through December 2020. This scraped information was cleaned and updated to match the existing fields of the Kaggle dataset by establishing location via latitude and longitude with the Google Maps API. Discrepancies in various data (e.g., the duration of sightings being reported in different units, such as min and seconds) were also addressed. 

##Website Features

This project includes a homepage incorporating a navigation menu with the following pages: Explore, Analyze, Observations, About, and Data. 

###Explore

Our dynamic visualizations include a Leaflet map with markers to plot reported UFO Sightings and filter by year. This mapping data was transformed into GeoJSON format to enable future mapping opportunities with alternate programs. The individual points on the marker map represent the shape of the UFO sighted by color and the duration in seconds based on the radius of the point.

###Analyze

Our website features interactive Plotly bubble charts to explore the correlation between shape, duration, and year sighted and a word cloud to highlight the most commonly used descriptors of sightings. 
The first chart visualizes sightings by year while comparing the number of sightings to the mean duration by length (seconds) and shape from 1993 - 2020. The marker size is based on total duration by the shape. 
A second static bubble graph compares mean and total duration by shape.
Finally, a third static bar graph compares count of shapes. Light, spherical, triangular, and unknown are the top reported shapes.

##Observations

An interactive table was developed to explore the sightseeing dataset for a given year in detail. This table includes, for each sightseeing, available information (city, state, shape, duration, latitude and longitude, time of the year). 
The data in the table can be filtered based on city, state and shape. During future phases of this project, the dropdown tool currently implemented will allow to screen the dataset based on a year of choice.
Heat Map
Similar to the map shown in the Explore section, a Leaflet map with heat layers was also developed to show UFO Sightings filtered by year.

