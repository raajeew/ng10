import * as d3 from 'd3';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../common/data.service';
import { UtilitiesService } from '../common/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './review-experiment.component.html',
  styleUrls: ['./review-experiment.component.css']
})
export class ReviewExperimentComponent implements OnInit {
  showLoading: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ds: DataService, private utilityService: UtilitiesService) { }

  //api resoponse chart data
  apiData: any = { "data": [{ "id": 0, "best": true, "metrics": { "cost": 0.06236651, "throughput": 36.7333333333 }, "parameters": { "x0": 63, "x1": 83, "x2": 75, "x3": 10, "x4": 35, "x5": 48, "x6": 83, "x7": 29, "x8": 95, "x9": 47 } }, { "id": 1, "metrics": { "cost": 0.0618487395, "throughput": 12.4150943396 }, "parameters": { "x0": 85, "x1": 99, "x2": 53, "x3": 9, "x4": 97, "x5": 54, "x6": 100, "x7": 7, "x8": 94, "x9": 70 } }, { "id": 2, "metrics": { "cost": 0.0634477255, "throughput": 71.3461538462 }, "parameters": { "x0": 64, "x1": 95, "x2": 52, "x3": 30, "x4": 12, "x5": 50, "x6": 88, "x7": 70, "x8": 53, "x9": 14 } }, { "id": 3, "metrics": { "cost": 0.0281376518, "throughput": 299 }, "parameters": { "x0": 83, "x1": 56, "x2": 12, "x3": 44, "x4": 80, "x5": 70, "x6": 96, "x7": 92, "x8": 39, "x9": 60 } }, { "id": 4, "metrics": { "cost": 0.0320945946, "throughput": 24 }, "parameters": { "x0": 89, "x1": 6, "x2": 98, "x3": 43, "x4": 64, "x5": 53, "x6": 54, "x7": 42, "x8": 56, "x9": 94 } }, { "id": 5, "metrics": { "cost": 0.0069252078, "throughput": 80.85 }, "parameters": { "x0": 36, "x1": 29, "x2": 40, "x3": 78, "x4": 82, "x5": 96, "x6": 30, "x7": 49, "x8": 66, "x9": 32 } }, { "id": 6, "metrics": { "cost": 0.3972125436, "throughput": 101.6551724138 }, "parameters": { "x0": 94, "x1": 20, "x2": 58, "x3": 85, "x4": 72, "x5": 9, "x6": 9, "x7": 88, "x8": 67, "x9": 22 } }, { "id": 7, "metrics": { "cost": 0.1841059603, "throughput": 18.6666666667 }, "parameters": { "x0": 85, "x1": 54, "x2": 33, "x3": 83, "x4": 67, "x5": 25, "x6": 53, "x7": 22, "x8": 28, "x9": 19 } }, { "id": 8, "metrics": { "cost": 0.0530205656, "throughput": 29.1764705882 }, "parameters": { "x0": 66, "x1": 99, "x2": 17, "x3": 62, "x4": 82, "x5": 55, "x6": 74, "x7": 16, "x8": 31, "x9": 38 } }, { "id": 9, "metrics": { "cost": 0.0090324347, "throughput": 137.2083333333 }, "parameters": { "x0": 57, "x1": 9, "x2": 48, "x3": 35, "x4": 24, "x5": 85, "x6": 25, "x7": 74, "x8": 89, "x9": 1 } }], "summary": { "abandoned_trials": 0, "candidate_trials": 0, "completed_trials": 10, "failed_trials": 0, "running_trials": 0, "staged_trials": 0, "total_trials": 10 } }
  summary: any = {};
  data = []
  metricInput: any = []

  // set the dimensions and margins of the graph
  showDetails: boolean = false;
  viewbestFlag: boolean = false;
  selectedTrial: any = {};
  dimensions: any = [];
  axisLabels: any = [];
  farrow: boolean = false;
  updateChart() {
    this.viewbestFlag = false;
    this.showDetails = false;
    this.dimensions = [];
    this.axisLabels = [];
    this.metricInput.forEach(element => {
      if (element.selected) {
        this.dimensions.push(element.value);
        this.axisLabels.push(this.getTitleCase(element.value));
      }
    });
    d3.selectAll("#parallel-cooridnate svg").remove();
    this.loadChart();
  }

  viewBest() {
    if (this.viewbestFlag) {
      d3.selectAll(".line.bestrial")
        .classed("highlight", true);
    } else {
      d3.selectAll(".line.bestrial")
        .classed("highlight", false);
    }

  }

  // Highlight the specie that is hovered
  highlight(d) {
    let selected_line = d.id
    // first every group turns grey
    d3.selectAll(".line")
      .transition().duration(10)
      .style("stroke", "#3289FF")
      .style("stroke-width", function (d) { return (1) })
      .style("opacity", "0.2")
    // Second the hovered specie takes its color
    d3.selectAll("." + selected_line)
      .transition().duration(10)
      .style("cursor", "pointer")
      .style("stroke-width", function (d) { return (2) })
      .style("opacity", "1")

  }

  // Unhighlight
  doNotHighlight(d) {
    d3.selectAll(".line")
      .transition().duration(10).delay(100)
      .style("stroke", function (d) { return ("#3289FF") })
      .style("stroke-width", function (d) { return (1) })
      .style("opacity", "0.5")
  }

  getTitleCase(str: String) {
    let key = str.toLocaleLowerCase();
    key = str[0].toUpperCase() + str.slice(1);
    return key;
  }

  getTooltipData(d) {
    let html: any = "";
    this.metricInput.forEach(element => {
      if (element.selected) {
        html += "<p>" + this.getTitleCase(element.value) + ": " + d[element.value].toFixed(2) + "</p>";
      }
    });
    return html;
  }
  showdetails(d) {
    this.showDetails = true;
    this.selectedTrial = d;
    d3.selectAll(".line")
      .classed("selected", false)
    d3.selectAll("." + d.id)
      .classed("selected", true)
  }

  closePanel() {
    this.showDetails = false;
    d3.selectAll(".line")
      .classed("selected", false);
  }

  loadChart() {
    let margin = { top: 10, right: 30, bottom: 25, left: 30 };
    let width = 980 - margin.left - margin.right;
    let height = 350 - margin.top - margin.bottom;

    // Define the div for the tooltip
    d3.selectAll(".tooltip").remove();
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("display", "none");

    // append the svg object to the body of the page
    let svg = d3.select("#parallel-cooridnate")
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 980 350")
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Color scale: give me a specie name, I return a color
    var color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#440154ff", "#21908dff", "#fde725ff"])

    // For each dimension, build a linear scale and store all in a y object
    var y = {}
    for (let i in this.dimensions) {
      let name = this.dimensions[i];
      let maxNo = d3.max(this.data, function (d) { return d[name] });
      maxNo = maxNo + (maxNo * .1);
      y[name] = d3.scaleLinear()
        .domain([0, maxNo])
        // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )       
        .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    let x = d3.scalePoint()
      .range([0, width])
      .domain(this.dimensions);
    // The path function take a row of the json as input, and return x and y coordinates of the line to draw for this raw.
    var path = (d) => {
      return d3.line()(this.dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg
      .selectAll("myPath")
      .data(this.data)
      .enter()
      .append("path")
      .attr("class", function (d) {
        let lineClass: any = "line";
        if (d.best) {
          return "line " + d.id + " bestrial"
        } else {
          return "line " + d.id
        }

      })
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", function (d) { return ("#0367fc") })
      .style("stroke-width", function (d) { return (1) })
      .style("opacity", 0.5)
      .on("click", (d) => {
        this.showdetails(d)
      })
      .on("mouseover", (d) => {
        this.highlight(d);
        tooltip.transition()
          .duration(100)
          .style("display", "block");
        tooltip.html(this.getTooltipData(d))
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseleave", (d) => {
        this.doNotHighlight(d);
        tooltip.transition()
          .duration(200)
          .style("display", "none");
      });


    // Draw the axis:
    svg.selectAll("myAxis")
      // For each dimension of the dataset I add a 'g' element:
      .data(this.dimensions).enter()
      .append("g")
      .attr("class", "axis")
      // translate this element to its right position on the x axis
      .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
      // build the axis with the call function
      .each(function (d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
      // Add axis title
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", height + 20)
      .text(function (d) { return d; })
      .style("fill", "black")
  }


  flat(objParent: any, objChild: any) {
    Object.keys(objChild).forEach((key) => {
      objParent[key] = objChild[key]
    })
    return objParent;
  }

  getExperimentData(expName: any) {
    this.showLoading = true;
    let url = "/api/experiments/" + expName + "/snapshot";
    this.ds.getData(url).subscribe(
      (res: any) => {
        let chartData = res.data;
        let metric: any = chartData[0] ? Object.keys(chartData[0].metrics) : [];
        this.metricInput = [];
        metric.forEach((item, index) => {
          let tempItem: any = {
            "key": "Variable " + index,
            "value": item,
            "selected": true
          }
          this.metricInput.push(tempItem);
        });
        // Prepare metric variable
        this.dimensions = [];
        this.metricInput.forEach(element => {
          if (element.selected) {
            this.dimensions.push(element.value);
            this.axisLabels.push(this.getTitleCase(element.value));
          }
        });
        // add best
        chartData.forEach((element: any, index: any) => {
          element.id = "trial-" + element.id;
          this.data.push(this.flat(element, element.metrics));

        });
        this.summary = res.summary;
        this.loadChart();
        this.showLoading = false;
      },
      (error) => {
        this.showLoading = false;
        this.utilityService.openSnackBar('Something went wrong!', '', 'error');
      }
    )
  }

  // Load scatter chart
  loadScatterChart() {
    // set the dimensions and margins of the graph
    let margin = { top: 10, right: 30, bottom: 25, left: 60 };
    let width = 980 - margin.left - margin.right;
    let height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#parallel-cooridnate")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function (data) {

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 4000])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 500000])
        .range([height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.GrLivArea); })
        .attr("cy", function (d) { return y(d.SalePrice); })
        .attr("dot", "dot")
        .style("stroke-width", function (d) { return (1) })
        .style("stroke", function (d) { return "#3289FF" })
        .attr("r", 3.5)
        .style("fill", "#fff")

    })
  }

  expName: any = "";
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.expName = params['id'];
      this.getExperimentData(this.expName);
      //this.loadScatterChart();
    });

  }
}
