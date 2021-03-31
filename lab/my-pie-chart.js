var MyPieChart = function(ctx, colors) {
    var chart = initChart(ctx);
    // var colors = [];

    addCircle("# of nrs", [12, 19, 3, 5, 2, 3], colors);


    function initChart(ctx) {
        let chart = new Chart(ctx, {
            type: 'pie',
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

    return {
        setSize: setSize,
        setLabels: setLabels,
        addLabel: addLabel,
        addCircle: addCircle,
        addSlice: addSlice,
        removeCircle: removeCircle,
        removeSlice: removeSlice,


        getChart: () => chart
    }

}
