



function exportChartToCsv(chart) {
    console.log("helo cica descarcam un csv");
    var rows = [];

    var topLabels = [];

    topLabels.push("County ID");
    if(chartData.type == 'line' || chartData.type == 'pie') {
        chart.getChart().data.labels.forEach(label => {
            topLabels.push(label);
        });
    
        rows.push(topLabels);
    
        chart.getChart().data.datasets.forEach(line => {
            var row = [];
            row.push(line.label);
            line.data.forEach(data => {
                row.push(data);
            });
    
            rows.push(row);
        });
    } else {
        chart.getChart().data.datasets.forEach(label => {

            topLabels.push(label.label);
        });
    
        rows.push(topLabels);

        chart.getChart().data.labels.forEach(label => {
            var row = [];
            row.push(label);

            rows.push(row);
        })

        chart.getChart().data.datasets.forEach(line => {
            for (let index = 0; index < line.data.length; index++) {
                const data = line.data[index];
                rows[index + 1].push(data);
            }
        });
    }

    //console.log('');
    console.log(rows);
    

    exportToCsv(chartData.type  + "Chart.csv", rows);
}


function exportChartToPdf(chart) {
    //console.log(document.querySelector('.chartCanvas'));
    var newCanvas = document.querySelector('.chartCanvas');

    //create image from dummy canvas
    var newCanvasImg = newCanvas.toDataURL("image/jpeg", 1.0);

    //creates PDF from img
    var doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text(15, 15, "Super Cool Chart");
    doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150 );
    doc.save(chartData.type  + 'Chart.pdf');
}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


function exportToPdf(filename, rows) {
    var something = eval(rows);
    var table = document.createElement("TABLE");
    table.border = "1";
    table.Id = "tblRows";
    var columnCount = something[0].length;

    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = something[0][i];
        row.appendChild(headerCell);
    }

    for (var i = 1; i < something.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = something[i][j];
        }
    }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);


    html2canvas(document.getElementById('dvTable'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download(filename);

            dvTable.innerHTML = "";
        }
    });
}


function exportToSvg(chart) {
    //tweakLib();
    //var data = chart.getChart().data;

    chart.getChart().options.responsive = false;
    chart.getChart().options.animation = false;


    var svgContext = C2S(500, 500);

    var configuration = {
        type: 'line',
        data: {
            labels: ["test1", "test2", "test3"],
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    //modificam imd
    configuration.type = chartData.type;
    configuration.data = chart.getChart().data;
    configuration.options = chart.getChart().options;


    

    var mySvg = new Chart(svgContext, configuration);

    //console.log(svgContext.getSerializedSvg(true));

    chart.getChart().options.responsive = true;
    chart.getChart().options.animation = {
        duration: 400
    };

    var svgText = svgContext.getSerializedSvg(true);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(svgText));
    element.setAttribute('download', chartData.type + 'Chart.svg');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    
}

//cod ca sa "reparam" C2S sa mearga cu chart-urile din chart.js
function tweakLib(){
    C2S.prototype.getContext = function (contextId) {
      if (contextId=="2d" || contextId=="2D") {
          return this;
      }
      return null;
    }
  
    C2S.prototype.style = function () {
        return this.__canvas.style
    }
  
    C2S.prototype.getAttribute = function (name) {
        return this[name];
    }
  
    C2S.prototype.addEventListener =  function(type, listener, eventListenerOptions) {  
      console.log("canvas2svg.addEventListener() not implemented.")
    }
}
