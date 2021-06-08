<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unemployment in Romania</title>
    <link rel="shortcut icon" href="/public/unwe.ico">

</head>

<body style="background-color: black;">
<link rel="stylesheet" href="/public/css/hidden.css">

    <div class="container">
        <div class="background"></div>
        <img id="dot" src="/public/dot.svg" alt="">
        <canvas id="canvas"></canvas>
        <header class="header">
            <div class="title collision-box">Un<span>We</span></div>
            <div class="menu-button"><span class="material-icons">menu</span></div>
            <div class="menu collision-box">
                <a class="item" href="/public/home">Home</a>
                <a class="item" href="/public/statistics">Statistics</a>
                <a class="item" href="/public/api">API</a>
                <a class="item item--selected" href="/public/admin">Admin</a>
                <a class="item theme">
                    <span class="material-icons theme-dark-button">dark_mode</span>
                    <span class="material-icons theme-light-button">light_mode</span>
                </a>
            </div>
        </header>

        <form class="login-form" action="/action_page.php" method="post">
            <label class="collision-box" for="uname"><b>Username</b></label>
            <input class="collision-box" type="text" placeholder="Enter Username" name="uname" required>

            <label class="collision-box" for="psw"><b>Password</b></label>
            <input class="collision-box" type="password" placeholder="Enter Password" name="psw" required>

            <button type="submit" class="collision-box" type="button" name="button1" class="button collision-box" onclick="console.log('aaaaaaaaaa')"><span>Login</span></button>

            <label class="collision-box">
                <input type="checkbox" name="remember">
                <span>Remember me</span>
            </label>
        </form>

    </div>


    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&display=swap" rel="stylesheet">
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
