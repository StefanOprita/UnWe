var MyBarChart = function(ctx, colors) {
    var chart = initChart(ctx);
    var nrOfDatasets = 0;
    // var colors = [];

    addLine("# of nrs", [12, 19, 3, 5, 2, 3]);


    function initChart(ctx) {
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 400
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
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

    function addLine(label, lineData) {
        chart.data.datasets.push({
            label: label,
            data: lineData,
            backgroundColor: colors[nrOfDatasets],
            borderColor: colors[nrOfDatasets],
            pointRadius: 5,
            lineTension: .3,
            fill: false,
            borderWidth: 3
        });

        chart.update();
        nrOfDatasets++;
    }

    function addColumn(label, columnData) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset, i) => {
            dataset.data.push(columnData[i]);
        });

        chart.update();
    }

    function removeLine(index) {
        chart.data.datasets.splice(index, 1);
        chart.update();
    }

    function removeColumn(index) { // TODO
        chart.data.labels.splice(index, 1);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.splice(index, 1);
        });

        chart.update();
    }

    return {
        setSize: setSize,
        setLabels: setLabels,
        addLine: addLine,
        addColumn: addColumn,
        removeLine: removeLine,
        removeColumn: removeColumn,


        getChart: () => chart
    }

}
