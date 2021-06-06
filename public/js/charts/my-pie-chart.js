var MyPieChart = function(ctx, colors) {
    var chart = initChart(ctx);
    // var colors = [];

    // addCircle("# of nrs", [12, 19, 3, 5, 2, 3], colors);


    function initChart(ctx) {
        let chart = new Chart(ctx, {
            type: 'pie',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 400
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }]
                },
                hover: {
                    animationDuration: 200
                }
            }
        });
        chart.canvas.parentNode.style.width = '100vw';
        chart.canvas.parentNode.style.height = '100vh';

        return chart;
    }


    function setSize(width, height) {
        chart.canvas.parentNode.style.width = width;
        chart.canvas.parentNode.style.height = height;
        chart.resize();
    }

    function setLabels(labels) {
        chart.data.labels = labels;
        chart.update();
    }

    function setGridColor(color) {
        chart.options.scales.xAxes.forEach(ax => ax.gridLines.color = color);
        chart.options.scales.yAxes.forEach(ax => ax.gridLines.color = color);
        // chart.getChart().options.scales.xAxes[0].gridLines.color = color;
        // chart.getChart().options.scales.yAxes[0].gridLines.color = color;
        chart.update();
    }

    function addLabel(label) {
        chart.data.labels.push(label);
        chart.update();
    }

    function addCircle(label, lineData, colors) {
        chart.data.datasets.push({
            label: label,
            data: lineData,
            backgroundColor: colors,
            hoverBackgroundColor: Array.from(colors, (color) => color + '88'),
            pointRadius: 5,
            lineTension: .3,
            fill: false,
            borderWidth: 0
        });

        chart.update();
    }

    function addSlice(label, sliceData) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset, i) => {
            dataset.data.push(sliceData[i]);
        });

        chart.update();
    }

    function addLine(label, lineData) {
        chart.data.datasets.push({
            label: label,
            data: lineData,
            // backgroundColor: colors[nrOfDatasets],
            // borderColor: colors[nrOfDatasets],
            backgroundColor: colors,
            // borderColor: Array.from(colors, (color) => color + '88'),
            pointRadius: 5,
            lineTension: .3,
            fill: false,
            borderWidth: 2
        });

        chart.update();
        // nrOfDatasets++;
    }

    function addColumn(label, columnData=[]) {
        chart.data.labels.push(label);
        // chart.data.datasets.forEach((dataset, i) => {
        //     dataset.data.push(columnData[i]);
        // });

        chart.update();
    }

    function getLines() {
        return chart.data.datasets;
    }

    function getColumns() {
        return chart.data.labels;
    }

    function setLines(lines) {
        chart.data.datasets = lines;
        chart.update();
    }

    function setColumns(columns) {
        chart.data.labels = columns;
        chart.update();
    }

    function removeCircle(index) {
        chart.data.datasets.splice(index, 1);
        chart.update();

    }

    function removeSlice(index) { // TODO
        chart.data.labels.splice(index, 1);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.splice(index, 1);
        });

        chart.update();
    }

    function removeLines() {
        chart.data.datasets = [];
        chart.update();
        nrOfDatasets = 0;
    }

    return {
        setSize: setSize,
        setLabels: setLabels,
        setGridColor: setGridColor,
        addLabel: addLabel,
        addCircle: addCircle,
        addSlice: addSlice,
        addLine: addLine,
        addColumn: addColumn,
        getLines: getLines,
        getColumns: getColumns,
        setLines: setLines,
        setColumns: setColumns,
        removeCircle: removeCircle,
        removeSlice: removeSlice,
        removeLines: removeLines,

        getChart: () => chart
    }

}
