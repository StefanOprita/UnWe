window.onload = function() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let colors = [
        '#F44336', '#9C27B0', '#2196F3', '#009688', '#FFEB3B', '#795548',
        '#E91E63', '#673AB7', '#3F51B5', '#03A9F4', '#00BCD4', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#9E9E9E',
        '#000'
    ];
    // charts = [];

    // let c = colors[0];
    // charts.push(MyChart(ctx, 'line', colors));
    chart = MyPieChart(ctx, colors);
    // chart = MyPieChart(ctx, colors);


}
