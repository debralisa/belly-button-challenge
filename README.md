# Belly-Button-Biodiversity
This challenege is to build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Part 1

1. Used the D3 library to read in the samples.json file. 

2. A horizontal bar chart was created with a dropdown menu to display the top 10 OTUs found in that individual. (which is a whole lot more belly button bacteria diversity than I ever imagined!)

  * Used `sample_values` as the values for the bar chart.

  * Used `otu_ids` as the labels for the bar chart.

  * Used `otu_labels` as the hovertext for the chart.

3. A bubble chart was created to displays each sample.

  * Used `otu_ids` for the x values.

  * Used `sample_values` for the y values.

  * Used `sample_values` for the marker size.

  * Used `otu_ids` for the marker colors.

  * Used `otu_labels` for the text values.

 I used the sample bubble chart in our started code folder to base the colorscale used

4. Individual's demographic information and each key-value pair from that metadata are displayed in a demographic panel from the sample metadata. 

6. All of the plots update any time that a new sample is selected.

## Bonus/Part 2

The following task is advanced and therefore optional.

* A Gauge Chart was adapted from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

* The gauge acounts for the values ranging from 0 through 9.

* The chart updateswhenever a new sample is selected.

I based the colors on the gauge on the sample image given in the startercode folder.

## Deployment

I am deploying my app to GitHub Pages and submitting the link to the deployment and GitHub repo.

###File Names/Folder Names

#ReadMe.md, index.html (html file), Static folder containing JS folder with: app2.js (main javascript file with demographic panel, bar and bubble charts scripting) bonus2.js (javascript file with bonus gauge script), Data folder with data file: sample json data file (samples.json).​

###Resources

#I used most of the module 14 activities to assist with the main scripting.  For the Gauge scripting, I used several resources: websites (https://plotly.com/javascript/gauge-charts/, https://plotly.com/javascript/gauge-charts/#custom-gauge-chart, https://observablehq.com/@arronhunt/building-a-gauge-meter-with-plotly) and people (Jonathan Caro).
