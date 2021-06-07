function downloadChart() {
    console.log("download!");
    var downloadOptions = document.getElementsByClassName("download-options")[0];
    var optionSelected = downloadOptions.getElementsByClassName("option--selected")[0];
    console.log(optionSelected);
    var typeOfDownload = optionSelected.innerText;
    switch (typeOfDownload) {
        case 'svg':
            exportToSvg(chart);
            break;
        case 'csv':
            exportChartToCsv(chart);
            break;
        case 'pdf':
            exportChartToPdf(chart);
            break;
        default:
            break;
    }
}