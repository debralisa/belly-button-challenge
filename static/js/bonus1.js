// Belly Button Biodiversity - Plotly.js
// BONUS: Build the Gauge Chart

function buildMetadata(sample) {
  d3.json("data/samples.json").then((data) => {
    let metadata= data.metadata;
    let resultsarray= metadata.filter(sampleobject => 
      sampleobject.id == sample);
    let result= resultsarray[0]
// Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
// Use `.html("") to clear any existing metadata
    panel.html("");
// Use `Object.entries` to add each key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });

  });
}
function buildGaugeChart(sample) {
  // console.log("sample", sample);

  d3.json("data/samples.json").then(data =>{
    let objs = data.metadata;
    let matchedSampleObj = objs.filter(sampleData => 
      sampleData["id"] === parseInt(sample));
    gaugeChart(matchedSampleObj[0]);
 });   
}

function gaugeChart(data) {
  d3.json("data/samples.json").then(samples =>{

    let objs = samples.metadata;
    let matchedSampleObj = objs.filter(sampleData => 
      sampleData["id"] == data)[0];

  console.log("gaugeChart", data);
  let freq=matchedSampleObj.wfreq
  if(matchedSampleObj.wfreq === null){
      freq = 0;

  }

  // let degree = parseInt(data.wfreq) * (180/10);
  let degree = parseFloat(freq) * 20;

  // Trig to calc meter point
  let degrees = 180 - degree;
  let radius = .5;
  let radians = degrees * Math.PI / 180;
  let x = radius * Math.cos(radians);
  let y = radius * Math.sin(radians);
  let mainPath = 'M -.0 -0.05 L .0 0.05 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  let path = mainPath.concat(pathX, space, pathY, pathEnd);
  
  //Create the trace for the gauge chart. 
  let trace3 = [
    {
      type: 'scatter',
      x: [0],
      y: [0],
      marker: {size: 15, color:'darkred'},
      showlegend: false,
      name: 'WASH FREQ',
      text: freq,
      hoverinfo: 'text+name'},
      { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
      textinfo: 'text',
      textposition:'inside',
        marker: {
          colors: [
            '#689c75',
            '#74a680',
            '#99d19d',
            '#bfe090',
            '#dbe8b3',
            '#e4edc7',
            '#e0e0d1',
            '#ebebe0',
            '#edede8',
            'white'
        ]
      },
      labels: ['8-9',  '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
      hoverinfo: 'text',
      hole: 0.5,
      type: 'pie',
      showlegend: false
    }
  ];

  //Create the layout for the gauge chart.  
  let layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: 'darkred',
        line: {
          color: 'darkred'
        }
      }],
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    height: 550,
    width: 550,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

//Use Plotly to plot the gauge data and layout.
  let gauge = document.getElementById('gauge');
  Plotly.newPlot(gauge, trace3, layout, {responsive:true});
  });
}