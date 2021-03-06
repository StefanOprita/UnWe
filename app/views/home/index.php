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
    <link rel="stylesheet" href="/public/css/style.css">

</head>

<body style="background-color: #1F1E25;">
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
            <p class="info">There are <span id='total-unemployed'></span> unemployed people in Romania.</p>
            <p class="info last-info">
                Of which <span id='county-unemployed'></span> are younger than 25.
                <!-- <span id='county-unemployed-name'>Dorohoi</span>. -->
            </p>
            <div class="button-box">
                <a href="/public/statistics" class="button button-first"><span>Statistics</span></a>
                <a href="/public/api" class="button"><span>API</span></a>
            </div>
        </div>

        <div class="showcase-hint collision-box">
            <span class="text">Authors</span>
            <div class="line"></div>
        </div>
    </div>
    <div class="showcase-container">

        <a class="author-container">
            <div class="div1"><div class="div2">
                <img src="/public/livi.svg" alt="Avatar">
            </div></div>
            <span>Cristea Liviu Andrei</span>
        </a>

        <a class="author-container">
            <div class="div1"><div class="div2">
                <img src="/public/stefi.svg" alt="Avatar">
            </div></div>
            <span>Opri???? ??tefan-Simion</span>
        </a>

        <a class="author-container">
            <div class="div1"><div class="div2">
                <img src="/public/iulian.svg" alt="Avatar">
            </div></div>
            <span>Vultur Iulian</span>
        </a>

        <!-- <a href="https://github.com/LiviuC-glitch"><span>Cristea Liviu Andrei</span></a>
        <a href="https://github.com/StefanOprita"><span>Opri???? ??tefan-Simion</span></a>
        <a href="https://github.com/iulyus01"><span>Vultur Iulian</span></a> -->

    </div>


    <link rel="preconnect" href="https://fonts.gstatic.com">
    <!-- <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
    <link href="/public/css/font-roboto.css" rel="stylesheet">
    <link href="/public/css/font-ubuntu.css" rel="stylesheet">
    <link href="/public/css/font-icons.css" rel="stylesheet">


    <script src="/public/js/theme.js"></script>
    <script src="/public/js/script-home.js"></script>
    <script src="/public/js/info.js"></script>
    <script src="/public/js/dot.js"></script>
    <script src="/public/js/box.js"></script>
    <script src="/public/js/animation.js"></script>
</body>

</html>
