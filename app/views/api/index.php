<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unemployment in Romania</title>
    <link rel="shortcut icon" href="/public/unwe.ico">

    <link rel="stylesheet" href="/public/css/hidden.css">
</head>

<body style="background-color: black;">
    <div class="api-container">
        <div class="background"></div>
        <img id="dot" src="/public/dot.svg" alt="">
        <canvas id="api-canvas"></canvas>
        <header class="header">
            <div class="title collision-box">Un<span>We</span></div>
            <div class="menu-button"><span class="material-icons">menu</span></div>
            <div class="menu collision-box">
                <a class="item" href="/public/home">Home</a>
                <a class="item" href="/public/statistics">Statistics</a>
                <a class="item item--selected" href="/public/api">API</a>
                <a class="item" href="/public/admin">Admin</a>
                <a class="item theme">
                    <span class="material-icons theme-dark-button">dark_mode</span>
                    <span class="material-icons theme-light-button">light_mode</span>
                </a>
            </div>
        </header>

        <div class="info-box">
            <p class="info collision-box">API documentation</p>
            <p class="info last-info collision-box">(WIP, for we haven't made the server yet)</p>
        </div>

        <div class="examples">
            <h2>Introduction</h2>
            <div class="text">
                If you wish to use our data in your application, we've got you covered!
            </div>
            <div class="text">
                All you have to do it's to send an HTTP request using the <code class="language-http">GET</code> method and with the data parameter set to
                your search parameters in a <code class="language-http">JSON</code> file. We'll process your request and send you the response in a the form of a <code class="language-http">JSON</code> file

                For example, if you are using <code class="language-http">javascript</code> and you want to send the request with <code class="language-http">AJAX</code>:
            </div>
            <div class="snippet">
                <pre class="line-numbers">
                    <code class="language-javascript">
                        var xhr = new XMLHttpRequest();
                        var url = "ourUrl?data=" + encodeURIComponent(JSON.stringify({"yourRequestAsAJSONHere": 0}));
                        xhr.open("GET", url, true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                var json = JSON.parse(xhr.responseText);
                                console.log(json.email + ", " + json.password);
                            }
                        };
                        xhr.send();
                    </code>
                </pre>
            </div>
            <h2>Structure of the JSON file</h2>
            <div class="text">
                The json object you send can have this keys:
                <ul>
                    <li>
                        <code class="language-json">"counties":["countyName1",(...)]</code> - this field <b>CANNOT</b> be missing. It represents the counties
                        you want information about. Each <code class="language-json">"countyNameX"</code> can either be in full form
                        (<code class="language-json">"Botoșani"</code>) or their short-form (<code class="language-json">"BT"</code>)
                    </li>
                    <li>
                        <code class="language-json">"category":["category1",(...)]</code> - if you only want only some information, you can specify it's category
                        in this field. The possible values for <code class="language-json">"categoryX"</code> are:
                            <code class="language-json">"total"</code>,
                            <code class="language-json">"gender"</code>,
                            <code class="language-json">"compensation"</code>,
                            <code class="language-json">"education"</code> and
                            <code class="language-json">"age"</code>
                    </li>
                    <li>
                        <code class="language-json">"years":["year1",(...)]</code> - if you want the statistics from specific years. If this key it's not present in your
                        request, we'll send information from the curent month of the curent year.
                    </li>
                    <li>
                        <code class="language-json">"start": "startingYear" </code> - if you want a range of years, instead of the  <code class="language-json">"years"</code> (or use it in conjunction) field you can use
                        this one. We'll send information starting from <code class="language-json">"startingYear"</code>
                    </li>
                    <li>
                        <code class="language-json">"end": "endYear" </code> - if you want a range of years, instead of the  <code class="language-json">"years"</code> (or use it in conjunction) field you can use
                        this one. We'll send information up until the year <code class="language-json">"endYear"</code>
                    </li>

                </ul>

            </div>
            <h2>Examples</h2>
            <div class="text">
                Let's see some examples!
            </div>

            <h3>Simple search</h3>
            <div class="text">
                If you want all the information about <code class="language-json">"Botoșani"</code> and <code class="language-json">"Suceava"</code>  from the curent month and year,
                you'll send this:
            </div>
            <div class="snippet">
                <pre class="line-numbers">
                    <code class="language-json">
                        {
                            "counties": ["SV", "Botoșani"]
                        }
                    </code>
                </pre>
            </div>
            <div class="text">
                The <code class="language-http">JSON</code> file you'll receive would look something like this:
            </div>
            <div class="snippet">
                <pre class="line-numbers">
                    <code class="language-json">
                        [
                        {
                            "name": "Botoșani",
                            "id" : "BT",
                            "total" : 2000,
                            "gender" : {
                                "male": 1200,
                                "female": 800
                            },
                            "compensation": {
                                "compensated": 900,
                                "not-compensated": 1100
                            },
                            "education": {
                                "no education": 100,
                                "primary": 400,
                                "middleschool": 500,
                                "highschool": 200,
                                "bachelors": 800
                            },
                            "environment": {
                                "urban": 1300,
                                "rural": 700
                            },
                            "age": {
                                "&lt;25": 20,
                                "25-29": 100,
                                "30-39": 120,
                                "40-49": 500,
                                "50-55": 800,
                                ">55": 460
                            }



                        },
                        {
                            "name": "Suceava",
                            "id": "SV",
                            "total" : 2000,
                            "gender" : {
                                "male": 1200,
                                "female": 800
                            },
                            "compensation": {
                                "compensated": 900,
                                "not-compensated": 1100
                            },
                            "education": {
                                "no education": 100,
                                "primary": 400,
                                "middleschool": 500,
                                "highschool": 200,
                                "bachelors": 800
                            },
                            "environment": {
                                "urban": 1300,
                                "rural": 700
                            },
                            "age": {
                                "&lt;25": 20,
                                "25-29": 100,
                                "30-39": 120,
                                "40-49": 500,
                                "50-55": 800,
                                ">55": 460
                            }
                        }
                    ]
                    </code>
                </pre>
            </div>
            <div class="text">
                As you can see, it's an array of objects, each object representing a county.
                Inside each county object you have all the categories, which themselves are objects that contain keys representing the way they are split up.
            </div>
            <br>
            <h3>Choose categories</h3>
            <div class="text">
                But maybe you don't want <b>ALL</b> of this information. Maybe you only want the total number of unemployed people:
            </div>

            <div class="snippet">
                <pre class="line-numbers">
                    <code class="language-json">
                        {
                            "counties": ["Botoșani", "Suceava"],
                            "categories": ["total"]
                        }
                    </code>
                </pre>
            </div>

            <div class="snippet">
                <pre class="line-numbers">
                    <code class="language-json">
                        [
                        {
                            "name": "Botoșani",
                            "id" : "BT",
                            "total" : 2000
                        },
                        {
                            "name": "Suceava",
                            "id": "SV",
                            "total" : 2000,
                        }
                        ]
                    </code>
                </pre>
            </div>
            <h3>Filter Years</h3>
            <div class="text">
                What if you want statistics about <code class="language-json">"Botoșani"</code>, but for the years <code class="language-html">2017-2019</code>?
            </div>
            <br>
            <div class="text">
                Then you'll send this file
            </div>
            <div class="snippet">
                <pre class="line-numbers">
                    <code class="language-json">
                        {
                            "counties": ["Botoșani"],
                            "start": "2017",
                            "end": "2019"
                        }
                    </code>
                </pre>
            </div>

            <div class="text">
                And the result would look kinda like this:
            </div>
            <div class="snippet">
                <pre class="line-numbers">
                    <code class="language-json">
                        {
                            "2017": {
                                "january":[
                                    {
                                        "name": "Botoșani",
                                        "id": "BT",
                                        "total": 2000
                                    }
                                ],
                                "february":["..."],
                                "allTheMonthsOfTheYear":"Array of counties for each month"
                            },
                            "2018": "Same structure as 2017",
                            "2019": "Same structure as 2018"
                        }
                    </code>
                </pre>
            </div>

            <div class="text">
                As you can see, the <code class="language-html">JSON</code> file would represent an object with a field for each
                year that you want, each year consisting of an object that has fields for every month.
                For enery month, there is an array of objects representing the counties and their statistics (or the statistics you've requested).
            </div>

        </div>
    </div>

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link id="prismCss" rel="stylesheet" href="/public/prism-dark.css">
    <link rel="stylesheet" href="/public/css/style.css">


    <script src="/public/js/theme.js"></script>
    <script src="/public/js/script-api.js"></script>
    <script id ="prismJs" src="/public/prism-dark.js"></script>
    <script src="/public/js/info.js"></script>
    <script src="/public/js/dot.js"></script>
    <script src="/public/js/box.js"></script>
    <script src="/public/js/animation.js"></script>
</body>

</html>