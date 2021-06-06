window.onload = function() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let colors = [
        '#F44336', '#9C27B0', '#2196F3', '#009688', '#FFEB3B', '#795548',
        '#E91E63', '#673AB7', '#3F51B5', '#03A9F4', '#00BCD4', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#9E9E9E',
        '#000'
    ];

    chart = MyLineChart(ctx, colors);
    // chart = MyBarChart(ctx, colors);
    // chart = MyPieChart(ctx, colors);
    // chart.addLine("Test1", [4, 6, 9, 8, 4, 5]);
    chart.addLine("Line1", [4, 6, 9, 8, 4, 5]);
    chart.addLine("Line2", [6, 3, 9, 5, 8, 6]);
    chart.addLine("Line3", [9, 6, 4, 8, 5, 2]);
    chart.addColumn("A", [1, 1, 1, 1, 1, 1]);
    chart.addColumn("B", [1, 1, 1, 1, 1, 1]);
    chart.addColumn("C", [1, 1, 1, 1, 1, 1]);
    chart.addColumn("D", [1, 1, 1, 1, 1, 1]);
    chart.addColumn("E", [1, 1, 1, 1, 1, 1]);
    chart.addColumn("F", [1, 1, 1, 1, 1, 1]);
    // chart = MyPieChart(ctx, colors);
    // chart = MyPieChart(ctx, colors);

    // chart.getChart()


}
