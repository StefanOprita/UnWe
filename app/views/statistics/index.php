<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unemployment in Romania</title>
    <link rel="shortcut icon" href="/public/unwe.ico">
    <!-- <link rel="stylesheet" href="/public/css/hidden.css"> -->
    <meta name="description" content="UnEmployment website">

</head>

<body style="background-color: #1F1E25;">

    <div class="statistics-container">
        <div class="background"></div>
        <img id="dot" src="/public/dot.svg" alt="">
        <canvas id="canvas"></canvas>
        <header class="header">
            <div class="title collision-box">Un<span>We</span></div>
            <div class="menu-button"><span class="material-icons">menu</span></div>
            <div class="menu collision-box">
                <a class="item" href="/public/home">Home</a>
                <a class="item item--selected" href="/public/statistics">Statistics</a>
                <a class="item" href="/public/api">API</a>
                <a class="item" href="/public/admin">Admin</a>
                <a class="item theme">
                    <span class="material-icons theme-dark-button">dark_mode</span>
                    <span class="material-icons theme-light-button">light_mode</span>
                </a>
            </div>
        </header>

        <div class="counties-bar collision-box">
            <div class="item-add">
                <div class="item-add-surface"></div>
                <div class="county-selector-container">
                    <input class="search" type="text" name="search-county" value="" placeholder="Search">
                    <div id="counties-selector" class="selector">
                    </div>
                </div>
                <span class="county-add-icon material-icons">add</span>
            </div>
        </div>

        <div class="map-button">
            <span class="material-icons">map</span>
        </div>

        <div class = "map">
            <div class="map-menu map-menu--closed">
                <svg class="map-svg" width="100%"  viewBox="-5 350 615 450" xmlns="http://www.w3.org/2000/svg" version="1.1"  >
                    <?php include "map.html" ?>
                </svg>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart collision-box">
                <canvas class="chartCanvas"></canvas>
            </div>

            <div class="chart-settings-contianer">
                <div class="download-options chart-setting collision-box">
                    <span class="download" onclick="downloadChart()">Download</span>
                    <span class="option option--selected svg">svg</span>/
                    <span class="option csv">csv</span>/
                    <span class="option pdf">pdf</span>
                    <span class="material-icons">download</span>
                </div>

                <div class="category-selector chart-setting collision-box">
                    <div class="top">
                        <span class="text">Age</span>
                        <span class="material-icons">expand_more</span>
                    </div>

                    <div class="options-list">
                        <div class="option">Age</div>
                        <div class="option">Gender</div>
                        <div class="option">Education</div>
                        <div class="option">Environment</div>
                        <div class="option">Compensation</div>
                    </div>
                </div>

                <div class="categories-list chart-setting collision-box"></div>

                <div class="range-selector collision-box">
                    <div class="selector selector-start chart-setting">
                        <label for="start">Start range:</label><br>
                        <input type="month" id="start" name="start" min="2019-01" max="2021-02" value="2019-01">
                    </div>
                    <div class="line"></div>
                    <div class="selector selector-end chart-setting">
                        <label for="end">End range:</label><br>
                        <input type="month" id="end" name="end" min="2019-01" max="2021-02" value="2021-02">
                    </div>
                </div>
            </div>

            <div class="chart-type-container collision-box">
                <div class="item item--selected">
                    <span class="material-icons">show_chart</span>
                </div>
                <div class="item">
                    <span class="material-icons">bar_chart</span>
                </div>
                <div class="item">
                    <span class="material-icons">pie_chart</span>
                </div>
            </div>

        </div>
    </div>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="/public/css/style.css">


    <script src="https://momentjs.com/downloads/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
    <script src="/public/js/info.js"></script>

    <script src="/public/js/Category.js"></script>
    <script src="/public/js/ChartData.js"></script>
    <script src="/public/js/script-statistics.js"></script>

    <script src="/public/js/dot.js"></script>
    <script src="/public/js/box.js"></script>
    <script src="/public/js/animation.js"></script>
    <script src="/public/js/charts/my-line-chart.js"></script>
    <script src="/public/js/charts/my-bar-chart.js"></script>
    <script src="/public/js/charts/my-pie-chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
    <script src="/public/js/export.js"></script>
    <script src="/public/js/canvas2svg.js"></script>
    <script src="/public/js/download.js"></script>

    <script src="https://jsuites.net/v4/jsuites.js"></script>

    <link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
</body>

</html>
