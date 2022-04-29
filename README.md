# Mapping the USA Covid-19 Cases in 2020 on Web

Name: Joshua Zhang

Course: Geog 458

Section: Section AC

Date: Aprill 29 2022

---

## 1. Introduction to the Maps

This work includes two maps that show audiences USA Covid-19 in 2020 with two different aspects. The purpose of the maps is visualizing the spatial patterns of different counties' Covid-19 cases in order to help make relationship between Covid-19 spread routes with other potential factors such as healthcare, transportation, or local policies in the early stage of pandemic.

### Links to the Maps

* [Map1: The Rates of Covid-19 per County](https://qianhengzhang.github.io/Covid-19WebMapping/map1.html)
* [Map2: The Case numbers of Covid-19 per County](https://qianhengzhang.github.io/Covid-19WebMapping/map2.html)

### Map1: The Rates of Covid-19 per County

![Covid-19 rates screenshot](/img/map1_screenshot.jpg)
The first map visualizes the Covid-19 case numbers per 1000 people in one county. This map is a choropleth map with 5-class legend to show rates from 0-25 cases per 1000 people to above 200 cases per 1000 people. If you hover the mouse on county, the top right bar will automatically show you the specific rate of that county. We can see a trend of high rates in the middle area which maps out the early status of Covid-19 spread route. The most cases around middle area implies the local goverment's low perception toward Covid-19 and lack of unanimous voice in the country.

### Map2: The Case numbers of Covid-19 per County

![Covid-19 Cases screenshot](/img/map2_screenshot.jpg)
The second map visualizes the total Covid-19 case numbers in one county. This map is a proportional symbol map with 4-class legend to show case numbers from about 100 cases per county to above 100000 cases per county. If you click the circles which represent counties' case number by size and color, the bottom left bar will show you detail information including the State name, county name, case numbers, and death numbers. We can see the counties from eastern USA have the major of the Covid-19 cases when western coast counties' cases cannot be ignored either.

### Results

Comparing the maps give us 2 aspects of early stage of Covid-19 cases in USA. Although middle counties seemed to have the highest Covid-19 rates, the population lived in the area couldn't compete the size of case numbers from the coastal areas. We can see the cosmopolitan with the most population is the root source of Covid-19 cases in 2020.

## 2. Required tools

* [Mapbox.api](https://docs.mapbox.com/api/overview/)
* [Google Font](https://fonts.google.com/)
* [Mapshaper](https://mapshaper.org/)

## 3. Data Sources

* [New York Times](https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true)
* [2018 ACS 5 Year Estimates](https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true)
* [The U.S. Census Bureau Boundary Shape file](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html)

## 4. Credits

This github repository is a work based on guidelines from [Geog 458 Advanced Digital Geographies](https://github.com/jakobzhao/geog458) created by [Professor Bo Zhao](https://geography.washington.edu/people/bo-zhao) from University of Washington.

The specific instructions for making this work is on this [page](https://github.com/jakobzhao/geog458/tree/master/labs/lab03).
