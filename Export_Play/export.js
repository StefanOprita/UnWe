

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


function goExportPdf() {
    exportToPdf('exportPdf.pdf', [
        ['name', 'birthplace'],
        ['Gica', 'Hagi'],
        ['Mirela', 'Iasi'],
        ['Dar22', 'AC3R']
    ])
}

function goExportCsv() {
    exportToCsv('exportCsv.csv', [
        ['name', 'birthplace'],
        ['Gica', 'Hagi'],
        ['Mirela', 'Iasi'],
        ['Dar22', 'AC3R']
    ])
}