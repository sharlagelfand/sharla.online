async function wafflePlot() {
    // Read in data
    const dataset = await d3.json("life_data.json");
  
    // Set margins
    const margin = { top: 50, right: 280, bottom: 50, left: 50 };
  
    // Set width
    const width = 1300;
    // Height will be determined by data, so that the squares are... square!
  
    // Functions to pull out values
    // x value is the year
    const xAccessor = (d) => d.plot_year;
    // y value is the month
    const yAccessor = (d) => d.plot_month;
    // colour/fill is by era - I already set a fill_colour for each era in R
    const colourAccessor = (d) => d.fill_colour;
    // delay is according to the id, which is the row number
    const delayAccessor = (d) => d.id;
  
    const yearRange = d3.extent(dataset, xAccessor);
    const nYears = yearRange[1] - yearRange[0] + 1;
    const years = d3.range(yearRange[0], yearRange[1] + 1, 1);
    const monthRange = d3.extent(dataset, yAccessor);
    const months = d3.range(monthRange[0], monthRange[1] + 1, 1);
  
    // The width of the plot is then the overall width minus the margins
    const plotWidth = width - margin.left - margin.right;
  
    // The size of squares is the plot width divided by the number of years
    const squareSize = plotWidth / nYears;
  
    // The plot height is the number of vertical squares (months) times the size of the squares
    const plotHeight = 12 * squareSize;
  
    // And the overall height is the plot height, plus the margins!
    const height = plotHeight + margin.top + margin.bottom;
  
    // Create an SVG
    const plot = d3
      .select("#mylifeinmonths")
      // Add an SVG element to it
      .append("svg")
      // Update the height/width of the SVG element to be our height/width
      .attr("viewBox", [0, 0, width, height]);
  
    // Set up scales
    const xScale = d3.scaleBand().domain(years).range([0, plotWidth]);
  
    const yScale = d3.scaleBand().domain(months).range([plotHeight, 0]);
  
    // Make a group for the squares, and shift it according to the top and left margins
    const monthsSquaresGroup = plot
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Add the first square - cheating a bit, these are all the months squares
    monthsSquaresGroup
      .selectAll("g")
      .data(dataset.filter((d) => d.plot_year == yearRange[0]))
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(xAccessor(d)))
      .attr("height", squareSize - 1)
      .attr("width", squareSize - 1)
      .attr("y", 0)
      .style("fill", (d) => colourAccessor(d));
  
    // Add "1 square = 1 month" text
    var initialDelay = 2000;
  
    const oneSquareOneMonthGroup = plot.append("g");
  
    oneSquareOneMonthGroup
      .append("text")
      .attr("y", margin.top * 0.75)
      .attr("x", margin.left + squareSize)
      .style("fill", "white")
      .text("1 square = 1 month")
      .style("font-family", "IBM Plex Sans")
      .attr("text-anchor", "middle");
  
    oneSquareOneMonthGroup
      .selectAll("text")
      .transition()
      .delay(initialDelay / 2)
      .style("fill", "black");
  
    // Animate the "months" squares down
    monthsSquaresGroup
      .selectAll("rect")
      .transition()
      .attr("y", (d) => yScale(yAccessor(d)))
      .delay((d, i) => initialDelay + i * 100);
  
    // Add "1 year" text
    const oneYearGroup = plot.append("g");
  
    oneYearGroup
      .append("text")
      .attr("y", height / 2)
      .attr("x", 0)
      .style("fill", "white")
      .text("1 year")
      .style("font-family", "IBM Plex Sans")
      .attr("text-anchor", "left");
  
    var yearSquareDelay =
      initialDelay + dataset.filter((d) => d.plot_year == yearRange[0]).length;
  
    oneYearGroup
      .selectAll("text")
      .transition()
      .delay(initialDelay + 0.75 * yearSquareDelay)
      .style("fill", "black");
  
    // Add a group for the years squares
    const yearsSquaresGroup = plot
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Add the "years" square
    yearsSquaresGroup
      .selectAll("g")
      .data(
        dataset.filter(
          (d) => (d.plot_month == monthRange[0]) & (d.plot_year != yearRange[0])
        )
      )
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(xAccessor(d)))
      .attr("y", (d) => yScale(yAccessor(d)))
      .attr("height", squareSize - 1)
      .attr("width", squareSize - 1)
      .style("fill", "white");
  
    // Animate them across
    yearsSquaresGroup
      .selectAll("rect")
      .transition()
      .style("fill", (d) => colourAccessor(d))
      .delay((d, i) => initialDelay + 1.5 * yearSquareDelay + i * 50);
  
    // Add the text
    const ageGroup = plot.append("g");
  
    ageGroup
      .append("text")
      .attr("y", height - margin.bottom * 0.75)
      .attr("x", margin.left)
      .style("fill", "white")
      .text("age")
      .style("font-family", "IBM Plex Sans")
      .attr("text-anchor", "left");
  
    ageGroup
      .selectAll("text")
      .transition()
      .style("fill", "black")
      .delay(initialDelay + 2.5 * yearSquareDelay);
  
    // Fill in the rest
    const allSquaresGroup = plot
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    allSquaresGroup
      .selectAll("g")
      .data(
        dataset.filter(
          (d) => (d.plot_year != yearRange[0]) & (d.plot_month != monthRange[0])
        )
      )
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(xAccessor(d)))
      .attr("y", 0)
      .attr("width", squareSize - 1)
      .attr("height", squareSize - 1)
      .style("fill", "white");
  
    allSquaresGroup
      .selectAll("rect")
      .transition()
      .attr("x", (d) => xScale(xAccessor(d)))
      .attr("y", (d) => yScale(yAccessor(d)))
      .style("fill", (d) => colourAccessor(d))
      .delay(
        (d) =>
          initialDelay +
          2 * yearSquareDelay +
          300 * (xAccessor(d) - yearRange[0]) +
          200 * yAccessor(d)
      );
  
    // Add "my life in months text"
    const myLifeInMonthsGroup = plot.append("g");
  
    myLifeInMonthsGroup
      .append("text")
      .attr("x", width - margin.right * 0.97)
      .attr("y", height / 2) // TODO: for now, this works because the top and bottom margin are the same
      .style("fill", "white")
      .attr("font-weight", 600)
      .attr("dominant-baseline", "central")
      .attr("text-anchor", "left")
      .style("font-family", "IBM Plex Sans")
      .style("font-size", "2em")
      .text("my life in months");
  
    myLifeInMonthsGroup
      .selectAll("text")
      .transition()
      .style("fill", "black")
      .delay(initialDelay + 2 * yearSquareDelay + 34 * dataset.length);
  }
  
  wafflePlot();
  