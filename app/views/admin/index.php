<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="UnEmployment website">
    <title>Unemployment in Romania</title>
    <link rel="shortcut icon" href="/public/unwe.ico">

    <link rel="stylesheet" href="/public/css/style.css">

</head>

<body style="background-color: #1F1E25;">
    <div class="container">
        <div class="background"></div>
        <img id="dot" src="/public/dot.svg" alt="">
        <canvas id="canvas"></canvas>
        <?php include "../app/views/components/header.php" ?>

        <div class="admin-container">
            <label class="add collision-box"><b>Insert</b></label>
            <form class="add-form" onsubmit="addEntry(); return false;">
                <input class="collision-box" type="number" step="1" min="1970" max="2999" placeholder="Year" name="uname" required id='add-year'>
                <input class="collision-box" type="number" step="1" min="1" max="12" placeholder="Month" name="uname" required id='add-month'>
                <input class="collision-box" type="text" placeholder="County" name="uname" required id='county'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="< 25" name="uname" required id='sub25'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="25 - 29" name="uname" required id='25to29'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="30 - 39" name="uname" required id='30to39'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="40 - 49" name="uname" required id='40to49'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="50 - 55" name="uname" required id='50to55'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="55 >" name="uname" required id='over55'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Male" name="uname" required id='add-male'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Female" name="uname" required id='add-female'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="NoEdu" name="uname" required id='noedu'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Primary" name="uname" required id='primary'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Middle" name="uname" required id='middle'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="High" name="uname" required id='high'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Bachelors" name="uname" required id='bachelors'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Post" name="uname" required id='post'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Professional" name="uname" required id='prof'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Urban" name="uname" required id='add-urban'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Rural" name="uname" required id='add-rural'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Comp" name="uname" required id='add-comp'>
                <input class="collision-box" type="number" step="1" min="0" placeholder="Not comp" name="uname" required id='not-comp'>

                <div class="break"></div>

                <button type="submit" class="button collision-box" name="button1"><span>Insert</span></button>
            </form>

            <label class="add collision-box"><b>Remove</b></label>
            <form class="remove-form" onsubmit="deleteEntry(); return false;">
                <input class="collision-box" type="number" step="1" min="1970" max="2999" placeholder="Year" name="uname" required id='remove-year'>
                <input class="collision-box" type="number" step="1" min="1" max="12" placeholder="Month" name="uname" required id='remove-month'>
                <input class="collision-box" type="text" placeholder="County" name="uname" required id='remove-county'>

                <div class="break"></div>

                <button type="submit" class="button collision-box" name="button1"><span>Remove</span></button>
            </form>
        </div>

    </div>


    <link rel="preconnect" href="https://fonts.gstatic.com">
    <!-- <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
    <link href="/public/css/font-roboto.css" rel="stylesheet">
    <link href="/public/css/font-ubuntu.css" rel="stylesheet">
    <link href="/public/css/font-icons.css" rel="stylesheet">

    <script src="/public/js/theme.js"></script>
    <!-- <script src="/public/js/script-home.js"></script> -->
    <script src="/public/js/script-admin.js"></script>
    <script src="/public/js/info.js"></script>
    <script src="/public/js/dot.js"></script>
    <script src="/public/js/box.js"></script>
    <script src="/public/js/animation.js"></script>
</body>

</html>
