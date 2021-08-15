//*****************************************************************
//*                                                               *
//*                        Global variables                       *
//*                                                               *
//*****************************************************************
var svg = d3.select('#svg0');
var svg1 = d3.select('#svg1');
var svg2 = d3.select('#svg2');
var svg3 = d3.select('#svg3');

// Create a group element for appending chart elements
var chartG = svg.append('g');
var chartG1 = svg1.append('g');
var chartG2 = svg2.append('g');
var chartG3 = svg3.append('g');

// Scales
var xScale = d3.scaleLinear()
    .domain([0,1600]).range([60,500]);
var yScale = d3.scaleLinear()
    .domain([0,1]).range([340,20]);

var xScale1 = d3.scaleLinear()
    .domain([0,140000]).range([60,500]);
var yScale1 = d3.scaleLinear()
    .domain([5000,65000]).range([340,20]);

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var triggered = false;
//Variables for bar chart
var race = ['White', 'Black', 'Hispanic', 'Asian', 'American Indian', 'Pacific Islander', 'Biracial', 'Other'];
//race scales
var xScaleBar = d3.scaleBand()
    .domain(race).range([60,500])
    .padding(0.1);
var yScaleBar = d3.scaleLinear()
    .domain([0,1]).range([340,20]);

//Insert image
d3.select('#svgImage')
    .append('image')
    .attr('xlink:href', '/Lab7/Images/Go Jackets.gif')
    .attr('width', 80)
    .attr('height', 80)
    .attr('x', 0)
    .attr('y', 0);
d3.select('#infoImage')
    .append('image')
    .attr('class', 'image2')
    .attr('xlink:href', '/Lab7/Images/GT Rocks.png')
    .attr('width', 300)
    .attr('height', 300)
    .attr('x', 0)
    .attr('y', 0);
d3.select('#infoImage')
    .attr('x', 240)
    .attr('y', 65);
//*****************************************************************
//*                                                               *
//*                     onChange functions                        *
//*                                                               *
//*****************************************************************
//Redraw scatter plot 1
function plot1Change() {
    d3.csv('colleges.csv', preData).then(function(dataset) {
        var selectC = document.getElementById('SAT ACT Selection');
        var selectedName = selectC.options[selectC.selectedIndex].text;
        if (selectedName == 'SAT & Admission' && triggered == false) {
            xScale.domain([0,1600]);
            d3.select('.cTitle1')
                .transition().duration(1000)
                .text('SAT score & Admission Rate');
            d3.select('.x.axis')
                .transition().duration(1000)
                .call(d3.axisBottom(xScale).tickFormat(function(d){return d;}));
            d3.select('.xlabel1') // change the xAxisLabel
                .transition().duration(1000)
                .text('SAT Average');
            d3.selectAll('.plot.g1') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale(d['sat average']) +',' + (yScale(d['admission rate']) + 55) + ')' })
            d3.selectAll('.cir1').style("fill", function(d) { return colorScale(d['sat average']); });
        } else if (selectedName == 'SAT & Admission' && triggered == true) {
            xScale.domain([0,1600]);
            d3.select('.cTitle1')
                .transition().duration(1000)
                .text('SAT score & Admission Rate');
            d3.select('.x.axis')
                .transition().duration(1000)
                .call(d3.axisBottom(xScale).tickFormat(function(d){return d;}));
            d3.select('.xlabel1') // change the xAxisLabel
                .transition().duration(1000)
                .text('SAT Average');
            d3.selectAll('.plot.g1') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale(d['sat average']) +',' + (yScale(d['admission rate']) + 55) + ')' });
        } else if (selectedName == 'ACT & Admission' && triggered == false) {
            xScale.domain([0,40]);
            d3.select('.cTitle1')
                .transition().duration(1000)
                .text('ACT score & Admission Rate');
            d3.select('.x.axis')
                .transition().duration(1000)
                .call(d3.axisBottom(xScale).tickFormat(function(d){return d;}));
            d3.select('.xlabel1') // change the xAxisLabel
                .transition().duration(1000)
                .text('ACT Median');
            d3.selectAll('.plot.g1') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale(d['act median']) +',' + (yScale(d['admission rate']) + 55) + ')' })
            d3.selectAll('.cir1').style("fill", function(d) { return colorScale(d['act median']); });
        } else {
            xScale.domain([0,40]);
            d3.select('.cTitle1')
                .transition().duration(1000)
                .text('ACT score & Admission Rate');
            d3.select('.x.axis')
                .transition().duration(1000)
                .call(d3.axisBottom(xScale).tickFormat(function(d){return d;}));
            d3.select('.xlabel1') // change the xAxisLabel
                .transition().duration(1000)
                .text('ACT Median');
            d3.selectAll('.plot.g1') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale(d['act median']) +',' + (yScale(d['admission rate']) + 55) + ')' });
        }
        console.log(selectedName);    
    });
};

//Redraw scatter plot 2
function plot2Change() {
    d3.csv('colleges.csv', preData).then(function(dataset) {
        var selectC = document.getElementById('Income Selection');
        var selectedName = selectC.options[selectC.selectedIndex].text;
        if (selectedName == 'Cost & Median Income' && triggered == false) {
            yScale1.domain([5000,65000]);
            d3.select('.cTitle2')
                .transition().duration(1000)
                .text('Cost & Median Income');
            d3.select('.y.axis1')
                .transition().duration(1000)
                .call(d3.axisLeft(yScale1).tickFormat(function(d){return d;}));
            d3.select('.ylabel2') // change the xAxisLabel
                .transition().duration(1000)
                .text('Average Cost');
            d3.selectAll('.plot.g2') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale1(d['median family income']) +',' + yScale1(d['average cost']) + ')' })
            d3.selectAll('.cir2').style("fill", function(d) { return colorScale(d['average cost']); });
        } else if (selectedName == 'Cost & Median Income' && triggered == true) {
            yScale1.domain([5000,65000]);
            d3.select('.cTitle2')
                .transition().duration(1000)
                .text('Cost & Median Income');
            d3.select('.y.axis1')
                .transition().duration(1000)
                .call(d3.axisLeft(yScale1).tickFormat(function(d){return d;}));
            d3.select('.ylabel2') // change the xAxisLabel
                .transition().duration(1000)
                .text('Average Cost');
            d3.selectAll('.plot.g2') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale1(d['median family income']) +',' + yScale1(d['average cost']) + ')' });
        } else if(selectedName == 'SAT & Median Income' && triggered == false) {
            yScale1.domain([0,1600]);
            d3.select('.cTitle2')
                .transition().duration(1000)
                .text('SAT & Median Income');
            d3.select('.y.axis1')
                .transition().duration(1000)
                .call(d3.axisLeft(yScale1).tickFormat(function(d){return d;}));
            d3.select('.ylabel2') // change the xAxisLabel
                .transition().duration(1000)
                .text('SAT Average');
            d3.selectAll('.plot.g2') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale1(d['median family income']) +',' + yScale1(d['sat average']) + ')' })
            d3.selectAll('.cir2').style("fill", function(d) { return colorScale(d['sat average']); });
        } else if(selectedName == 'SAT & Median Income' && triggered == true) {
            yScale1.domain([0,1600]);
            d3.select('.cTitle2')
                .transition().duration(1000)
                .text('SAT & Median Income');
            d3.select('.y.axis1')
                .transition().duration(1000)
                .call(d3.axisLeft(yScale1).tickFormat(function(d){return d;}));
            d3.select('.ylabel2') // change the xAxisLabel
                .transition().duration(1000)
                .text('SAT Average');
            d3.selectAll('.plot.g2') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale1(d['median family income']) +',' + yScale1(d['sat average']) + ')' });
        } else if (selectedName == 'ACT & Median Income' && triggered == false) {
            yScale1.domain([0,40]);
            d3.select('.cTitle2')
                .transition().duration(1000)
                .text('ACT & Median Income');
            d3.select('.y.axis1')
                .transition().duration(1000)
                .call(d3.axisLeft(yScale1).tickFormat(function(d){return d;}));
            d3.select('.ylabel2') // change the xAxisLabel
                .transition().duration(1000)
                .text('ACT Median');
            d3.selectAll('.plot.g2') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale1(d['median family income']) +',' + yScale1(d['act median']) + ')' })
            d3.selectAll('.cir2').style("fill", function(d) { return colorScale(d['act median']); });
        } else {
            yScale1.domain([0,40]);
            d3.select('.cTitle2')
                .transition().duration(1000)
                .text('ACT & Median Income');
            d3.select('.y.axis1')
                .transition().duration(1000)
                .call(d3.axisLeft(yScale1).tickFormat(function(d){return d;}));
            d3.select('.ylabel2') // change the xAxisLabel
                .transition().duration(1000)
                .text('ACT Median');
            d3.selectAll('.plot.g2') // move the circles
                .transition().duration(1000)
                .attr('transform', function(d) { return 'translate(' + xScale1(d['median family income']) +',' + yScale1(d['act median']) + ')' });
        }  
    });
};

//Function to highlight the data
function highlight() {
    d3.csv('colleges.csv', preData).then(function(dataset) {
        var selectC = document.getElementById('selections');
        var selectedName = selectC.options[selectC.selectedIndex].text;
        console.log(selectedName);
        //Plot1
        d3.select('svg').selectAll('circle')
            .transition()
            .duration(300)
            .style('fill', function(d) {
                if (d.name == selectedName) {
                    return 'black';
                } else {
                    return 'LightSkyBlue';
                }
            })
            .style('opacity', function(d) {
                if (d.name == selectedName) {
                    return 2;
                } else {
                    return 0.5;
                }
            })
            .attr('r', function(d) {
                if (d.name == selectedName) {
                    return 4;
                } else {
                    return 2;
                }
            });
        d3.select('svg').selectAll('.nametext1')
            .transition()
            .duration(300)
            .style('display', function(d) {
                if (d.name == selectedName) {
                    return 'block';
                } else {
                    return 'none';
                }
            });
        //Plot2
        d3.select('#svg1').selectAll('circle')
            .transition()
            .duration(300)
            .style('fill', function(d) {
                if (d.name == selectedName) {
                    return 'black';
                } else {
                    return 'LightSkyBlue';
                }
            })
            .style('opacity', function(d) {
                if (d.name == selectedName) {
                    return 2;
                } else {
                    return 0.5;
                }
            })
            .attr('r', function(d) {
                if (d.name == selectedName) {
                    return 4;
                } else {
                    return 2;
                }
            });
         d3.select('#svg1').selectAll('.nametext2')
            .transition()
            .duration(300)
            .style('display', function(d) {
                if (d.name == selectedName) {
                    return 'block';
                } else {
                    return 'none';
                }
            });
        
    });
    triggered = true;
}
//Function for user to check the original plots
function originalData() {
    d3.csv('colleges.csv', preData).then(function(dataset) {
        var selectC = document.getElementById('SAT ACT Selection');
        var selectedName = selectC.options[selectC.selectedIndex].text;
        var selectC1 = document.getElementById('Income Selection');
        var selectedName1 = selectC1.options[selectC1.selectedIndex].text;
        //Plot1
        if (selectedName == 'SAT & Admission') {
            d3.select('svg').selectAll('.cir1')
                .transition()
                .duration(300)
                .style("fill", function(d) { return colorScale(d['sat average']); })
                .style('opacity', 1)
                .attr('r', 3);
            d3.select('svg').selectAll('.nametext1')
                .transition()
                .duration(300)
                .style('display', 'none');
        } else {
            d3.select('svg').selectAll('.cir1')
                .transition()
                .duration(300)
                .style("fill", function(d) { return colorScale(d['act median']); })
                .style('opacity', 1)
                .attr('r', 3);
            d3.select('svg').selectAll('.nametext1')
                .transition()
                .duration(300)
                .style('display', 'none');
        }
        //Plot2
        if (selectedName1 == 'Cost & Median Income') {
            d3.select('#svg1').selectAll('.cir2')
                .transition()
                .duration(300)
                .style("fill", function(d) { return colorScale(d['average cost']); })
                .style('opacity', 1)
                .attr('r', 3);;
            d3.select('#svg1').selectAll('.nametext2')
                .transition()
                .duration(300)
                .style('display', 'none');
        } else if (selectedName1 == 'SAT & Median Income') {
            d3.select('#svg1').selectAll('.cir2')
                .transition()
                .duration(300)
                .style("fill", function(d) { return colorScale(d['sat average']); })
                .style('opacity', 1)
                .attr('r', 3);;
            d3.select('#svg1').selectAll('.nametext2')
                .transition()
                .duration(300)
                .style('display', 'none');
        } else {
            d3.select('#svg1').selectAll('.cir2')
                .transition()
                .duration(300)
                .style("fill", function(d) { return colorScale(d['act median']); })
                .style('opacity', 1)
                .attr('r', 3);;
            d3.select('#svg1').selectAll('.nametext2')
                .transition()
                .duration(300)
                .style('display', 'none');
        }
    });
    triggered = false;
}

//Function for highlight the selected college
function highlightedData() {
    highlight();
}


//Redraw the information box
function infoBox() {
    d3.csv('colleges.csv', preData).then(function(dataset) {
        /*
        1. Create variables for later use --------------------------------
        */
        document.getElementById('svg2').innerHTML = '';
        var selectC = document.getElementById('selections');
        var selectedName = selectC.options[selectC.selectedIndex].text;
        var selectedCollege;
        
        for (var i = 0; i < dataset.length; i++) {
            if (dataset[i]['name'] == selectedName) {
                selectedCollege = dataset[i];
                break;
            }
        }
        if (selectedName != 'Georgia Intitute of Technology-Main Campus') {
            svg3.select('.image2').remove();
        } 
        //Remove previous data
        chartG3.selectAll('*').remove();
        //----------------------------------------------------------------
        
        /*
        2. Bar chart -----------------------------------------------------
        */
        
        var white = Number(selectedCollege['% white']);
        var black = Number(selectedCollege['% black']);
        var hispanic = Number(selectedCollege['% hispanic']);
        var asian = Number(selectedCollege['% asian']);
        var amIn = Number(selectedCollege['% american indian']);
        var pacific = Number(selectedCollege['% pacific islander']);
        var biracial = Number(selectedCollege['% biracial']);
        var other = 1 - (white + black + hispanic + asian + amIn + pacific + biracial);

        var w = parseFloat(white).toFixed(4);
        var bl = parseFloat(black).toFixed(4);
        var his = parseFloat(hispanic).toFixed(4);
        var asi = parseFloat(asian).toFixed(4);
        var an = parseFloat(amIn).toFixed(4);
        var pac = parseFloat(pacific).toFixed(4);
        var bi = parseFloat(biracial).toFixed(4);
        var o =parseFloat(other).toFixed(4);

        var percentArray = [
            {race: 'White', value:w}, 
            {race: 'Black', value:bl}, 
            {race: 'Hispanic', value:his}, 
            {race: 'Asian', value:asi}, 
            {race: 'American Indian', value:an}, 
            {race: 'Pacific Islander', value:pac}, 
            {race: 'Biracial', value:bi}, 
            {race: 'Other', value:o}
        ];
        console.log(percentArray);
        svg2.selectAll('rect')
            .data(percentArray)
            .enter()
            .append('rect')
            .attr('x', function (d) {
                return xScaleBar(d.race) + 18;
            })
            .attr('y', function (d) {
                return yScaleBar(0) + 55.5;
            })
            .attr('width', 35)
            .attr('height', function (d) {
                return 345 - yScaleBar(0);
            })
            .style("fill", function(d) { return colorScale(d['race']); });
        
        svg2.selectAll("rect")
              .transition()
              .duration(1000)
              .attr("y", function(d) { return yScaleBar(d.value) + 55.5; })
              .attr("height", function(d) { return 345 - yScaleBar(d.value); });
        
        svg2.selectAll('text')
            .data(percentArray)
            .enter()
            .append('text')
            .attr('class', 'bText')
            .attr('x', function(d) { return xScaleBar(d.race) + 20; })
            .attr('y', function(d) { return yScaleBar(d.value) + 60.5; })
            .text(function(d) { return parseFloat(d.value * 100).toFixed(2) + '%' });
        
        
        svg2.append('g').attr('class', 'bar xaxis')
            .attr('transform', 'translate(10,401)')
            .call(d3.axisBottom(xScaleBar).tickFormat(function(d){return d;}))
            .selectAll('text')
            .attr('transform', 'rotate(-13)');

        svg2.append('text').attr('class', 'bar xlabel')
            .attr('transform','translate(220,440)')
            .text('Race & Ethnicity');

        svg2.append('g').attr('class', 'bar yaxis')
            .attr('transform', 'translate(50,55)')
            .call(d3.axisLeft(yScaleBar));

        svg2.append('text').attr('class', 'bar ylabel')
            .attr('transform','translate(20, 300) rotate(-90)')
            .text('Percentage in school')
        svg2.append('text').attr('class', 'cTitle2')
            .attr('transform','translate(195,40)')
            .text('Race in colleges');
        //----------------------------------------------------------------
        
        /*
        3. Information box -----------------------------------------------
        */
        
        //Reformat the information box
        var orig = selectedCollege['admission rate'] * 100;
        var re = parseFloat(orig).toFixed(2);
        var orig1 = selectedCollege['retention rate'] * 100;
        var re1 = parseFloat(orig1).toFixed(2);
        for (var i = 0; i < 12; i++) {
            switch (i) {
                case 0:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ College: ')
                        .attr('x', 30)
                        .attr('y', 50);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(selectedCollege['name'])
                        .attr('x', 35)
                        .attr('y', 75);
                    break;
                case 1:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Control: ')
                        .attr('x', 30)
                        .attr('y', 150);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(selectedCollege['control'])
                        .attr('x', 110)
                        .attr('y', 150);
                    break;
                case 2:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Region: ')
                        .attr('x', 30)
                        .attr('y', 175);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(selectedCollege['region'])
                        .attr('x', 105)
                        .attr('y', 175);
                    break;
                case 3:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Locale: ')
                        .attr('x', 30)
                        .attr('y', 200);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(selectedCollege['locale'])
                        .attr('x', 103)
                        .attr('y', 200);
                    break;
                case 4:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Admission Rate: ')
                        .attr('x', 30)
                        .attr('y', 225);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(re + '%')
                        .attr('x', 172)
                        .attr('y', 225);
                    break;
                case 5:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Retention Rate: ')
                        .attr('x', 30)
                        .attr('y', 250);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(re1 + '%')
                        .attr('x', 162)
                        .attr('y', 250);
                    break;
                case 6:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ SAT Average: ')
                        .attr('x', 30)
                        .attr('y', 275);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(selectedCollege['sat average'])
                        .attr('x', 150)
                        .attr('y', 275);
                    break;
                case 7:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ ACT Median: ')
                        .attr('x', 30)
                        .attr('y', 300);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(selectedCollege['act median'])
                        .attr('x', 150)
                        .attr('y', 300);
                    break;
                case 8:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Undergrad Population: ')
                        .attr('x', 30)
                        .attr('y', 325);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text(selectedCollege['undergrad population'])
                        .attr('x', 223)
                        .attr('y', 325);
                    break;
                case 9:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Average Cost: ')
                        .attr('x', 30)
                        .attr('y', 350);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text('$' + selectedCollege['average cost'])
                        .attr('x', 150)
                        .attr('y', 350);
                    break;
                case 10:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Median Debt: ')
                        .attr('x', 30)
                        .attr('y', 375);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text('$' + selectedCollege['median debt'])
                        .attr('x', 148)
                        .attr('y', 375);
                    break;
                case 11:
                    chartG3.append('text')
                        .attr('class', 'infoText')
                        .text('‣ Median Family Income: ')
                        .attr('x', 30)
                        .attr('y', 400);
                    chartG3.append('text')
                        .transition().duration(1000).ease(d3.easeBounce)
                        .attr('class', 'infoValue')
                        .text('$' + selectedCollege['median family income'])
                        .attr('x', 230)
                        .attr('y', 400);
                    break;
            }
        }
        //----------------------------------------------------------------
    });
}

//*****************************************************************
//*                                                               *
//*                        Load in data                           *
//*                                                               *
//*****************************************************************
d3.csv('colleges.csv', preData).then(function(dataset) {
    //Gatech data
    var defaultData = dataset[340];
    
    /*
    1. scatter plots -----------------------------------------------------
    */
    //Scatter plot 1 axes
    svg.append('g').attr('class', 'x axis')
        .attr('transform', 'translate(0,400)')
        .call(d3.axisBottom(xScale).tickFormat(function(d){return d;}));

    svg.append('text')
        .attr('class', 'xlabel1')
        .attr('transform','translate(220,440)')
        .text('SAT Average');

    svg.append('g').attr('class', 'y axis')
        .attr('transform', 'translate(50,55)')
        .call(d3.axisLeft(yScale));

    svg.append('text')
        .attr('class', 'ylabel1')
        .attr('transform','translate(20,300) rotate(-90)')
        .text('Admission Rate');
    svg.append('text')
        .attr('class', 'cTitle1')
        .attr('transform','translate(145,40)')
        .text('SAT score & Admission Rate');
    
    //Scatter plot 2 axes
    svg1.append('g').attr('class', 'x axis1')
        .attr('transform', 'translate(20,400)')
        .call(d3.axisBottom(xScale1).tickFormat(function(d){return d;}));

    svg1.append('text')
        .attr('class', 'xlabel2')
        .attr('transform','translate(240,440)')
        .text('Median Family Income');

    svg1.append('g').attr('class', 'y axis1')
        .attr('transform', 'translate(70,55)')
        .call(d3.axisLeft(yScale1));

    svg1.append('text')
        .attr('class', 'ylabel2')
        .attr('transform','translate(20,300) rotate(-90)')
        .text('Average Cost');
    svg1.append('text')
        .attr('class', 'cTitle2')
        .attr('transform','translate(200,40)')
        .text('Cost & Median Income');
    
   
    
    //Circles for scatter plot 1
    var c1 = d3.select('svg').selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .attr('class', 'plot g1')
        .attr('transform', function(d) { return 'translate(' + xScale(d['sat average']) +',' + (yScale(d['admission rate']) + 55) + ')' });
    var c11 = c1.append('circle')
        .attr('r', 3)
        .attr('r', 3)
        .attr('class', 'cir1')
        .style("fill", function(d) { return colorScale(d['sat average']); });
    var c12 = c1.append('text')
        .attr('class', 'nametext1')
        .text(function(d) {
            return d.name;
        });
    //Circles for scatter plot 2
    var c2 = d3.select('#svg1').selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .attr('class', 'plot g2')
        .attr('transform', function(d) { return 'translate(' + xScale1(d['median family income']) +',' + yScale1(d['average cost']) + ')' });
    var c21 = c2.append('circle')
        .attr('r', 3)
        .attr('class', 'cir2')
        .style("fill", function(d) { return colorScale(d['average cost']); })
        .attr('transform', 'translate(20,55)');
    var c22 = c2.append('text')
        .attr('class', 'nametext2')
        .text(function(d) {
            return d.name;
        })
        .attr('transform', 'translate(20,55)');
    
    /*
    2. Drop down selection -----------------------------------------------
    */
    // drop down for sat & act chart 
    var oName = ['SAT & Admission', 'ACT & Admission'];
    var s0 = d3.select('#H3')
        .append('select')
        .attr('id','SAT ACT Selection')
        .on('change', plot1Change);

    var options0 = s0.selectAll('option')
        .data(oName)
        .enter()
        .append('option')
        .text(function (d) { return d; });    
    // drop down for costing and incomes
    var ciName = ['Cost & Median Income', 'SAT & Median Income', 'ACT & Median Income'];
    var s1 = d3.select('#H4')
        .append('select')
        .attr('id','Income Selection')
        .on('change', plot2Change);

    var options1 = s1.selectAll('option')
        .data(ciName)
        .enter()
        .append('option')
        .text(function (d) { return d; });    
    
    // drop down for info box
    var cName = [];
    for (var i = 0; i < dataset.length; i++) {
        if (!(cName.includes(dataset[i]['name']))) {
            cName.push(dataset[i]['name']);
        }
    }
    var s2 = d3.select('#pSelector')
        .append('select')
        .attr('id','selections')
        .on('change', infoBox);
    var s3 = d3.select('#pSelector')
        .on('change', highlight)

    var options = s2.selectAll('option')
        .data(cName)
        .enter()
        .append('option')
        .text(function (d) { return d; })
        .property("selected", function(d){ return d === 'Georgia Institute of Technology-Main Campus'; });    
    //--------------------------------------------------------------------
    
    /*
    3. bar chart for race percentage -------------------------------------
    */
    
    var white = Number(defaultData['% white']);
    var black = Number(defaultData['% black']);
    var hispanic = Number(defaultData['% hispanic']);
    var asian = Number(defaultData['% asian']);
    var amIn = Number(defaultData['% american indian']);
    var pacific = Number(defaultData['% pacific islander']);
    var biracial = Number(defaultData['% biracial']);
    var other = 1 - (white + black + hispanic + asian + amIn + pacific + biracial);
    
    var w = parseFloat(white).toFixed(4);
    var bl = parseFloat(black).toFixed(4);
    var his = parseFloat(hispanic).toFixed(4);
    var asi = parseFloat(asian).toFixed(4);
    var an = parseFloat(amIn).toFixed(4);
    var pac = parseFloat(pacific).toFixed(4);
    var bi = parseFloat(biracial).toFixed(4);
    var o =parseFloat(other).toFixed(4);
    
    var percentArray = [
        {race: 'White', value:w}, 
        {race: 'Black', value:bl}, 
        {race: 'Hispanic', value:his}, 
        {race: 'Asian', value:asi}, 
        {race: 'American Indian', value:an}, 
        {race: 'Pacific Islander', value:pac}, 
        {race: 'Biracial', value:bi}, 
        {race: 'Other', value:o}
    ];
    
    svg2.selectAll('.rects')
        .data(percentArray)
        .enter()
        .append('rect')
        .attr('class', 'rects')
        .attr('x', function (d) {
            return xScaleBar(d.race) + 18;
        })
        .attr('y', function (d) {
            return yScaleBar(d.value) + 55.5;
        })
        .attr('width', 35)
        .attr('height', function (d) {
            return 345 - yScaleBar(d.value);
        })
        .style("fill", function(d) { return colorScale(d['race']); });
    
    svg2.selectAll('text')
        .data(percentArray)
        .enter()
        .append('text')
        .attr('class', 'bText')
        .attr('x', function(d) { return xScaleBar(d.race) + 20; })
        .attr('y', function(d) { return yScaleBar(d.value) + 60.5; })
        .text(function(d) { return parseFloat(d.value * 100).toFixed(2) + '%' });

    
    //Bar chart axes
    chartG2.append('g').attr('class', 'bar xaxis')
        .attr('transform', 'translate(10,401)')
        .call(d3.axisBottom(xScaleBar).tickFormat(function(d){return d;}))
        .selectAll('text')
        .attr('transform', 'rotate(-13)');

    chartG2.append('text')
        .attr('class', 'bar xlabel')
        .attr('transform','translate(220,440)')
        .text('Race & Ethnicity');

    chartG2.append('g').attr('class', 'bar yaxis')
        .attr('transform', 'translate(50,55)')
        .call(d3.axisLeft(yScaleBar));

    chartG2.append('text')
        .attr('class', 'bar ylabel')
        .attr('transform','translate(20, 300) rotate(-90)')
        .text('Percentage in school')
    chartG2.append('text')
        .attr('class', 'cTitle2')
        .attr('transform','translate(195,40)')
        .text('Race in colleges');
    chartG2.append('text')
        .attr('class', 'bar ylabel title')
        .attr('transform','translate(16,60)')
        .text('(percentage)');
    //--------------------------------------------------------------------
    
    /*
    4. Detailed information box ------------------------------------------
    */
    var orig = defaultData['admission rate'] * 100;
    var re = parseFloat(orig).toFixed(2);
    var orig1 = defaultData['retention rate'] * 100;
    var re1 = parseFloat(orig1).toFixed(2);
    for (var i = 0; i < 12; i++) {
        switch (i) {
            case 0:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ College: ')
                    .attr('x', 30)
                    .attr('y', 50);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(defaultData['name'])
                    .attr('x', 35)
                    .attr('y', 75);
                break;
            case 1:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Control: ')
                    .attr('x', 30)
                    .attr('y', 150);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(defaultData['control'])
                    .attr('x', 110)
                    .attr('y', 150);
                break;
            case 2:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Region: ')
                    .attr('x', 30)
                    .attr('y', 175);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(defaultData['region'])
                    .attr('x', 103)
                    .attr('y', 175);
                break;
            case 3:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Locale: ')
                    .attr('x', 30)
                    .attr('y', 200);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(defaultData['locale'])
                    .attr('x', 103)
                    .attr('y', 200);
                break;
            case 4:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Admission Rate: ')
                    .attr('x', 30)
                    .attr('y', 225);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(re + '%')
                    .attr('x', 172)
                    .attr('y', 225);
                break;
            case 5:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Retention Rate: ')
                    .attr('x', 30)
                    .attr('y', 250);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(re1 + '%')
                    .attr('x', 162)
                    .attr('y', 250);
                break;
            case 6:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ SAT Average: ')
                    .attr('x', 30)
                    .attr('y', 275);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(defaultData['sat average'])
                    .attr('x', 150)
                    .attr('y', 275);
                break;
            case 7:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ ACT Median: ')
                    .attr('x', 30)
                    .attr('y', 300);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(defaultData['act median'])
                    .attr('x', 150)
                    .attr('y', 300);
                break;
            case 8:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Undergrad Population: ')
                    .attr('x', 30)
                    .attr('y', 325);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text(defaultData['undergrad population'])
                    .attr('x', 223)
                    .attr('y', 325);
                break;
            case 9:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Average Cost: ')
                    .attr('x', 30)
                    .attr('y', 350);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text('$' + defaultData['average cost'])
                    .attr('x', 150)
                    .attr('y', 350);
                break;
            case 10:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Median Debt: ')
                    .attr('x', 30)
                    .attr('y', 375);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text('$' + defaultData['median debt'])
                    .attr('x', 148)
                    .attr('y', 375);
                break;
            case 11:
                chartG3.append('text')
                    .attr('class', 'infoText')
                    .text('‣ Median Family Income: ')
                    .attr('x', 30)
                    .attr('y', 400);
                chartG3.append('text')
                    .transition().duration(1000).ease(d3.easeBounce)
                    .attr('class', 'infoValue')
                    .text('$' + defaultData['median family income'])
                    .attr('x', 230)
                    .attr('y', 400);
                break;
        }
    }
    //--------------------------------------------------------------------
    
});

//*****************************************************************
//*                                                               *
//*         Function for pre-accessing the data value             *
//*                                                               *
//*****************************************************************
function preData(row) {
    return {
        'name': row['Name'],
        'control': row['Control'],
        'region': row['Region'],
        'locale': row['Locale'],
        'admission rate': +row['Admission Rate'],
        'sat average': +row['SAT Average'],
        'act median': +row['ACT Median'],
        'undergrad population': +row['Undergrad Population'],
        '% white': +row['% White'],
        '% black': +row['% Black'],
        '% hispanic': +row['% Hispanic'],
        '% asian': +row['% Asian'],
        '% american indian': +row['% American Indian'],
        '% pacific islander': +row['% Pacific Islander'],
        '% biracial': +row['% Biracial'],
        'average cost': +row['Average Cost'],
        'retention rate': +row['Retention Rate (First Time Students)'],
        'median debt': +row['Median Debt'],
        'median family income': +row['Median Family Income']
    };
}