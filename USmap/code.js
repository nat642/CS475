var width = 1000, height = 500;

var zoom = d3.behavior.zoom()
            .scaleExtent([1, 5])
            .on('zoom', moveAndZoom);

var svg = d3.select("body")
    .append("svg")
    .attr({
        width: width,
        height: height
    })
    .call(zoom);
        var mainGroup = svg.append('g');

var g =svg.append("g");

var url = 'https://raw.githubusercontent.com/nat642/CS475/main/stateInfo.json',
citiesDataUrl = 'https://gist.githubusercontent.com/d3byex/65a128a9a499f7f0b37d/raw/176771c2f08dbd3431009ae27bef9b2f2fb56e36/us-cities.csv';


d3.json(url, function (error, data) {
    var path = d3.geo.path();
    svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style({
            fill: 'none',
            stroke: 'black'
        });

    svg.selectAll('text')
        .data(data.features)
        .enter()
        .append('text')
        .text(function(d) { return d.properties.name; })
        .attr({
            x: function(d) { return path.centroid(d)[0]; },
            y: function(d) { return path.centroid(d)[1]; },
            'text-anchor': 'middle',
            'font-size': '6pt'
        });
});

function moveAndZoom() {
            var t = d3.event.translate;
            var s = d3.event.scale;

            var x = Math.min(
                (width / height) * (s - 1),
                Math.max(width * (1 - s), t[0]));

            var h = height / 4;
            var y = Math.min(
                h * (s - 1) + h * s,
                Math.max(height * (1 - s) - h * s, t[1]));

            mainGroup.attr('transform', 'translate(' + x + ',' + y + ')scale(' + s + ')');
        }
