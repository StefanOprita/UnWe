<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UnWe</title>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="../../../public/style.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js" charset="utf-8"></script>
    <script src="script.js"></script>
    <script src="../../../public/js/info.js"></script>
    <script src="../../../public/js/dot.js"></script>
    <script src="../../../public/js/box.js"></script>
    <script src="../../../public/js/animation.js"></script>
    <script src="../../../lab/my-line-chart.js"></script>
</head>

<body>
    <div class="statistics-container">
        <div class="background"></div>
        <img id="dot" src="../../../public/dot.svg" alt="">
        <canvas id="canvas"></canvas>
        <header class="header">
            <div class="title collision-box">Un<span>We</span></div>
            <div class="menu-button"><span class="material-icons">menu</span></div>
            <div class="menu collision-box">
                <a class="item" href="../home/index.html">Home</a>
                <a class="item item--selected" href="../statistics/index.html">Statistics</a>
                <a class="item" href="../api/index.html">API</a>
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
                    <?php include "./map.html" ?>
                </svg>
            </div>
        </div>

        <div class="chart-container">
            <div class="chart">
                <canvas id="chartCanvas"></canvas>
            </div>

            <div class="chart-options">
                <div class="download-options">
                    <span class="download">Download</span>
                    <span class="option option--selected svg">svg</span>/
                    <span class="option csv">csv</span>/
                    <span class="option pdf">pdf</span>
                    <span class="material-icons">download</span>
                </div>

                <div class="category-selector">
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

                <div class="categories-list" action="" method="post"></div>
            </div>

            <div class="chart-type-container">
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
</body>

</html>
