<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="UnEmployment website">
    <title>Unemployment in Romania</title>
    <link rel="shortcut icon" href="/public/unwe.ico">
    <!-- <link rel="stylesheet" href="/public/css/firstPaint.css"> -->

</head>

<body>
    <img id="dot" src="/public/dot.svg" alt="">
    <div class="container">
        <div class="background"></div>
        <canvas id="canvas"></canvas>
        <header class="header">
            <div class="title collision-box">Un<span>We</span></div>
            <div class="menu-button"><span class="material-icons">menu</span></div>
            <div class="menu collision-box">
                <a class="item item--selected" href="/public/home">Home</a>
                <a class="item" href="/public/statistics">Statistics</a>
                <a class="item" href="/public/api">API</a>
                <a class="item" href="/public/admin">Admin</a>
                <a class="item theme">
                    <span class="material-icons theme-dark-button">dark_mode</span>
                    <span class="material-icons theme-light-button">light_mode</span>
                </a>
            </div>
        </header>

        <div class="info-box">
            <p class="info collision-box">There are <span id='total-unemployed'>...</span> unemployed people in Romania.</p>
            <!-- <p class="info last-info collision-box">
                There are <span id='county-unemployed'>350</span> unemployed people in
                <span id='county-unemployed-name'>Dorohoi</span>.
            </p> -->
            <div class="button-box">
                <!-- <a href="/public/statistics"><button type="button" name="button1" onclick="location.href='/public/statistics';" class="button button-first collision-box"><span>Statistics</span></button></a>
                <a href="/public/api"><button type="button" name="button2" onclick="location.href='/public/api';" class="button collision-box"><span>API</span></button></a> -->
                <a href="/public/statistics" class="button button-first collision-box"><span>Statistics</span></a>
                <a href="/public/api" class="button collision-box"><span>API</span></a>
            </div>
        </div>

        <div class="showcase-hint collision-box">
            <span class="text">showcase</span>
            <div class="line"></div>
        </div>
    </div>
    <div class="showcase-container">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>


    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="/public/css/style.css">

    <script src="/public/js/theme.js"></script>
    <script src="/public/js/script-home.js"></script>
    <script src="/public/js/info.js"></script>
    <script src="/public/js/dot.js"></script>
    <script src="/public/js/box.js"></script>
    <script src="/public/js/animation.js"></script>
</body>

</html>
