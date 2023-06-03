// Belly Button Biodiversity - Plotly.js
//Build the Main Demographics Drop Down
//Build the Bubble Chart and Bar Charts
 

function init() {
    //Grab a reference to the dropdown select element
    const selector = d3.select("#selDataset");
  
    //Use the list of sample names to populate the select options
    d3.json("data/samples.json").then((data) => {
      const sampleNames = data.names;
 
 
      for (const sample of sampleNames) {
        selector.append("option").text(sample).property('value', sample);
      }
  
      //Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      console.log(sampleNames)
      buildCharts(firstSample);
      buildMetadata(firstSample);
      gaugeChart(firstSample);
    });
  }
  
  //Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    //Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    gaugeChart(newSample);
  }
  
  //Demographics Panel
  function buildMetadata(sample) {
    d3.json("data/samples.json").then((data) => {
      const metadata = data.metadata;
      //Filter the data for the object with the desired sample number
      const resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
      const result = resultArray[0];
      //Use d3 to select the panel with id of `#sample-metadata`
      const PANEL = d3.select("#sample-metadata");
  
      //Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      //Use `Object.entries` to add each key and value pair to the panel
      for (const [key, value] of Object.entries(result)) {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      }
    });
  }
  
  //Create the buildCharts function
  function buildCharts(sample) {
    //Use d3.json to load and retrieve the samples.json file
    d3.json("data/samples.json").then((data) => {
      //Configuration Options for Plotly
      const config = {
         // Enable Responsive Chart to Window Size
        responsive: true,
        modeBarButtonsToRemove: [
          "zoom2d",
          "pan2d",
          "select2d",
          "lasso2d",
          "zoomIn2d",
          "zoomOut2d",
          "autoScale2d",
        ],
      };
  
      //Create a constant that holds the samples array.
      const samples = data.samples;
  
      //Create a variable that filters the samples for the object with the desired sample number.
      let resultArray = samples.filter(
        (sampleNumber) => sampleNumber.id == sample
      );
  
      //Create a variable that holds the first sample in the array.
      let result = resultArray[0];
  
      //Create constants rather than variables that hold the otu_ids, otu_labels, and sample_values.
      //Create the ticks for the bar chart.
      const [otu_ids, otu_labels, sample_values] = [
        result.otu_ids
          .slice(0, 10)
          .map((i) => "OTU " + i.toString())
          .reverse(),
        result.otu_labels.slice(0, 10).reverse(),
        result.sample_values.slice(0, 10).reverse(),
      ];
  
      //Create the trace for the bar chart.
      let trace1= {
        x: sample_values,
        y: otu_ids,
        hovertext: otu_labels,
        hoverinfo: 'text',
        type: 'bar',
        orientation: 'h',
      };
  
      const barData = [trace1];
  
      //Create the layout for the bar chart.
      const barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        font: {
          family: 'Open Sans',
        },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
      };
      //Use Plotly to plot the data with the layout.
      Plotly.newPlot('bar', barData, barLayout, config);
  
      // Create a Bubble Chart
      //Create the trace for the bubble chart.
      trace2 = {
        x: result.otu_ids,
        y: result.sample_values,
        text: result.otu_labels,
        mode: 'markers',
        marker: {
          color: result.sample_values,
          colorscale: result.otu_ids,
          size: result.sample_values,
          //set 'sizeref' to an 'ideal' size given by the formula:
          sizeref: (2.0 * Math.max(...result.sample_values)) / 100 ** 2,
          sizemode: 'area',
        },
      };
  
      const bubbleData = [trace2];
  
      //Create the layout for the bubble chart.
      const bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "OTU ID" },
        hovermode: 'closest',
        font: {
          family: 'Open Sans',
        },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
      };
  
      //Use Plotly to plot the data with the data and layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout, config);
    });

  }
  