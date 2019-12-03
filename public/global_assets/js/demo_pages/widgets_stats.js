/* ------------------------------------------------------------------------------
 *
 *  # Statistics widgets
 *
 *  Demo JS code for widgets_stats.html page
 *
 * ---------------------------------------------------------------------------- */


// Simple line chart
let _lineChartWidget = function(element, chartHeight, lineColor, pathColor, pointerLineColor, pointerBgColor) {
    console.log(element)
    if (typeof d3 == 'undefined') {
        console.warn('Warning - d3.min.js is not loaded.');
        return;
    }
    console.log(element)
    // Initialize chart only if element exists in the DOM
    if(element) {


        // Basic setup
        // ------------------------------

        // Add data set
        let dataset = [
            {
                "date": "04/13/14",
                "alpha": "60"
            }, {
                "date": "04/14/14",
                "alpha": "35"
            }, {
                "date": "04/15/14",
                "alpha": "65"
            }, {
                "date": "04/16/14",
                "alpha": "50"
            }, {
                "date": "04/17/14",
                "alpha": "65"
            }, {
                "date": "04/18/14",
                "alpha": "20"
            }, {
                "date": "04/19/14",
                "alpha": "60"
            }
        ];

        // Main variables
        let d3Container = d3.select(element),
            margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom,
            padding = 20;

        // Format date
        let parseDate = d3.time.format("%m/%d/%y").parse,
            formatDate = d3.time.format("%a, %B %e");


        // Add tooltip
        // ------------------------------

        let tooltip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function (d) {
                return "<ul class='list-unstyled mb-1'>" +
                    "<li>" + "<div class='font-size-base my-1'><i class='icon-check2 mr-2'></i>" + formatDate(d.date) + "</div>" + "</li>" +
                    "<li>" + "Sales: &nbsp;" + "<span class='font-weight-semibold float-right'>" + d.alpha + "</span>" + "</li>" +
                    "<li>" + "Revenue: &nbsp; " + "<span class='font-weight-semibold float-right'>" + "$" + (d.alpha * 25).toFixed(2) + "</span>" + "</li>" +
                    "</ul>";
            });


        // Create chart
        // ------------------------------

        // Add svg element
        let container = d3Container.append('svg');

        // Add SVG group
        let svg = container
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(tooltip);


        // Load data
        // ------------------------------

        dataset.forEach(function (d) {
            d.date = parseDate(d.date);
            d.alpha = +d.alpha;
        });


        // Construct scales
        // ------------------------------

        // Horizontal
        let x = d3.time.scale()
            .range([padding, width - padding]);

        // Vertical
        let y = d3.scale.linear()
            .range([height, 5]);


        // Set input domains
        // ------------------------------

        // Horizontal
        x.domain(d3.extent(dataset, function (d) {
            return d.date;
        }));

        // Vertical
        y.domain([0, d3.max(dataset, function (d) {
            return Math.max(d.alpha);
        })]);


        // Construct chart layout
        // ------------------------------

        // Line
        let line = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.alpha);
            });


        //
        // Append chart elements
        //

        // Add mask for animation
        // ------------------------------

        // Add clip path
        let clip = svg.append("defs")
            .append("clipPath")
            .attr("id", "clip-line-small");

        // Add clip shape
        let clipRect = clip.append("rect")
            .attr('class', 'clip')
            .attr("width", 0)
            .attr("height", height);

        // Animate mask
        clipRect
            .transition()
            .duration(1000)
            .ease('linear')
            .attr("width", width);


        // Line
        // ------------------------------

        // Path
        let path = svg.append('path')
            .attr({
                'd': line(dataset),
                "clip-path": "url(#clip-line-small)",
                'class': 'd3-line d3-line-medium'
            })
            .style('stroke', lineColor);

        // Animate path
        svg.select('.line-tickets')
            .transition()
            .duration(1000)
            .ease('linear');


        // Add vertical guide lines
        // ------------------------------

        // Bind data
        let guide = svg.append('g')
            .selectAll('.d3-line-guides-group')
            .data(dataset)
            .enter()
            .append('line')
            .attr('class', 'd3-line-guides')
            .attr('x1', function (d, i) {
                return x(d.date);
            })
            .attr('y1', function (d, i) {
                return height;
            })
            .attr('x2', function (d, i) {
                return x(d.date);
            })
            .attr('y2', function (d, i) {
                return height;
            })
            .style('stroke', pathColor)
            .style('stroke-dasharray', '4,2')
            .style('shape-rendering', 'crispEdges')
            .transition()
            .duration(1000)
            .delay(function(d, i) { return i * 150; })
            .attr('y2', function (d, i) {
                return y(d.alpha);
            });


        // Alpha app points
        // ------------------------------

        // Add points
        let points = svg.insert('g')
            .selectAll('.d3-line-circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('class', 'd3-line-circle d3-line-circle-medium')
            .attr("cx", line.x())
            .attr("cy", line.y())
            .attr("r", 3)
            .style({
                'stroke': pointerLineColor,
                'fill': pointerBgColor
            });

        // Animate points on page load
        points
            .style('opacity', 0)
            .transition()
            .duration(250)
            .ease('linear')
            .delay(1000)
            .style('opacity', 1);

        // Add user interaction
        points
            .on("mouseover", function (d) {
                tooltip.offset([-10, 0]).show(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 4);
            })

            // Hide tooltip
            .on("mouseout", function (d) {
                tooltip.hide(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 3);
            });

        // Change tooltip direction of first point
        d3.select(points[0][0])
            .on("mouseover", function (d) {
                tooltip.offset([0, 10]).direction('e').show(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 4);
            })
            .on("mouseout", function (d) {
                tooltip.direction('n').hide(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 3);
            });

        // Change tooltip direction of last point
        d3.select(points[0][points.size() - 1])
            .on("mouseover", function (d) {
                tooltip.offset([0, -10]).direction('w').show(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 4);
            })
            .on("mouseout", function (d) {
                tooltip.direction('n').hide(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 3);
            });


        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', lineChartResize);

        // Call function on sidebar width change
        $(document).on('click', '.sidebar-control', lineChartResize);

        // Resize function
        //
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to
        // be updated on window resize
        function lineChartResize() {

            // Layout variables
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


            // Layout
            // -------------------------

            // Main svg width
            container.attr("width", width + margin.left + margin.right);

            // Width of appended group
            svg.attr("width", width + margin.left + margin.right);

            // Horizontal range
            x.range([padding, width - padding]);


            // Chart elements
            // -------------------------

            // Mask
            clipRect.attr("width", width);

            // Line path
            svg.selectAll('.d3-line').attr("d", line(dataset));

            // Circles
            svg.selectAll('.d3-line-circle').attr("cx", line.x());

            // Guide lines
            svg.selectAll('.d3-line-guides')
                .attr('x1', function (d, i) {
                    return x(d.date);
                })
                .attr('x2', function (d, i) {
                    return x(d.date);
                });
        }
    }
};

// When content loaded
_lineChartWidget('#line_chart_simple', 50, '#2196F3', 'rgba(33,150,243,0.5)', '#2196F3', '#fff');
_lineChartWidget('#line_chart_simple2', 50, '#2196F3', 'rgba(33,150,243,0.5)', '#2196F3', '#fff');
_lineChartWidget('#line_chart_simple3', 50, '#2196F3', 'rgba(33,150,243,0.5)', '#2196F3', '#fff');
_lineChartWidget('#line_chart_simple4', 50, '#2196F3', 'rgba(33,150,243,0.5)', '#2196F3', '#fff');
