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
      </div>

      <div class="examples">
         <h2>Introduction</h2>
         <div class="text">
            If you wish to use our data in your application, we've got you covered!
         </div>
         <div class="text">
            All you have to do it's to send an HTTP request using the <code class="language-http">GET</code> method and with the data parameter set to
            your search parameters. We'll process your request and send you the response in a the form of a <code class="language-http">JSON</code> file.
            <br><br>
            For example, if you are using <code class="language-http">javascript</code> and you want to send the request to get data about <b>Iasi</b> (all the available information about the unemployment in that county):
            <div class="snippet">
               <pre class="line-numbers">
                        <code class="language-javascript">
                            url = "https://unwe2021.herokuapp.com/api/query/is";
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url, true);
                            xhr.responseType = 'json';
                            xhr.onload = function() {
                                var status = xhr.status;
                                if (status === 200) {
                                    callback(null, xhr.response);
                                } else {
                                    callback(status, xhr.response);
                                }
                            };
                            xhr.send();
                        </code>
                    </pre>
            </div>

         </div>

         <h2>Usage</h2>
         <div class="text">
            There are four routes you can use in order to get acces to our data:
            <ul>
               <li>
                  <code class="language-http">https://unwe2021.herokuapp.com/api/query/desired_city</code>
                  <br>
                  Example: <code class="language-http">https://unwe2021.herokuapp.com/api/query/is</code>
                  <div class="snippet">
                     <pre class="line-numbers">
                              <code class="language-json">
                              [
   {
      "name":"IASI",
      "id":"IS",
      "total":8446,
      "gender":{
         "male":4536,
         "female":3910
      },
      "compensation":{
         "compensated":1513,
         "nonCompensated":6933
      },
      "education":{
         "noEducation":572,
         "primary":1569,
         "middleschool":2778,
         "highschool":786,
         "postHighschool":64,
         "professional":2236,
         "bachelors":441
      },
      "rate":{
         "total":2.85,
         "male":2.84,
         "female":2.87
      },
      "environment":{
         "urban":1577,
         "rural":6869
      },
      "age":{
         "lesser25":477,
         "from25to29":248,
         "from30to39":1248,
         "from40to49":2441,
         "from50to55":1788,
         "greater55":2244
      }
   }
]
                              </code>
                           </pre>
                  </div>
               </li>
               <li>
                  <code class="language-http">https://unwe2021.herokuapp.com/api/query/desired_city/desired_year</code>
                  Example: <code class="language-http">https://unwe2021.herokuapp.com/api/query/is/2021</code>
                  <div class="snippet">
                     <pre class="line-numbers">
                              <code class="language-json">
                              [
   {
      "january":{
         "name":"IASI",
         "id":"IS",
         "total":9708,
         "gender":{
            "male":5233,
            "female":4475
         },
         "compensation":{
            "compensated":2144,
            "nonCompensated":7564
         },
         "education":{
            "noEducation":595,
            "primary":1818,
            "middleschool":3014,
            "highschool":1141,
            "postHighschool":92,
            "professional":2499,
            "bachelors":549
         },
         "rate":{
            "total":3.27,
            "male":3.31,
            "female":3.21
         },
         "environment":{
            "urban":2028,
            "rural":7680
         },
         "age":{
            "lesser25":932,
            "from25to29":265,
            "from30to39":1429,
            "from40to49":2736,
            "from50to55":1994,
            "greater55":2352
         }
      },
      "february":{
         "name":"IASI",
         "id":"IS",
         "total":9810,
         "gender":{
            "male":5329,
            "female":4481
         },
         "compensation":{
            "compensated":2153,
            "nonCompensated":7657
         },
         "education":{
            "noEducation":607,
            "primary":1854,
            "middleschool":3082,
            "highschool":1061,
            "postHighschool":96,
            "professional":2562,
            "bachelors":548
         },
         "rate":{
            "total":3.3,
            "male":3.37,
            "female":3.21
         },
         "environment":{
            "urban":2024,
            "rural":7786
         },
         "age":{
            "lesser25":854,
            "from25to29":276,
            "from30to39":1430,
            "from40to49":2805,
            "from50to55":2057,
            "greater55":2388
         }
      }
   }
]
                              </code>
                           </pre>
                  </div>
               </li>
               <li>
                  <code class="language-http">https://unwe2021.herokuapp.com/api/query/desired_city/desired_year/desired_month</code>
                  Example: <code class="language-http">https://unwe2021.herokuapp.com/api/query/is/2021/1</code>
                  <div class="snippet">
                     <pre class="line-numbers">
                              <code class="language-json">
                              [
   {
      "name":"IASI",
      "id":"IS",
      "total":9708,
      "gender":{
         "male":5233,
         "female":4475
      },
      "compensation":{
         "compensated":2144,
         "nonCompensated":7564
      },
      "education":{
         "noEducation":595,
         "primary":1818,
         "middleschool":3014,
         "highschool":1141,
         "postHighschool":92,
         "professional":2499,
         "bachelors":549
      },
      "rate":{
         "total":3.27,
         "male":3.31,
         "female":3.21
      },
      "environment":{
         "urban":2028,
         "rural":7680
      },
      "age":{
         "lesser25":932,
         "from25to29":265,
         "from30to39":1429,
         "from40to49":2736,
         "from50to55":1994,
         "greater55":2352
      }
   }
]
                              </code>
                           </pre>
                  </div>
               </li>
               <li>
                  <code class="language-http">https://unwe2021.herokuapp.com/api/query/?counties=list_of_counties</code>
               </li>
            </ul>
            The first three URIs shall be used when you only need information about only one county, one year only or one month only, and they all come with
            the option of using <code class="language-http">?categories=desired_categories</code>.<br><br>
            The categories you can use (in place of <code class="language-http">desired_categories</code>) are as follows:
            <code class="language-json">"gender"</code>,
            <code class="language-json">"compensation"</code>,
            <code class="language-json">"education"</code>,
            <code class="language-json">"rate"</code>,
            <code class="language-json">"environment"</code> and
            <code class="language-json">"age"</code>.

            <br><br>

            The fourth one shall be used when you need specific data over a period of time. In order to achieve this, you should use,
            besides <code class="language-html">categories</code> the following parameters:
            <ul>
               <li>
                  <code class="language-http">startingYear</code> - by default, is equal with 2019;
               </li>
               <li>
                  <code class="language-http">endingYear</code> - by default, is equal with 2021;
               </li>
               <li>
                  <code class="language-http">startMonth</code> - by default, is equal with 1;
               </li>
               <li>
                  <code class="language-http">endMonth</code> - by default, is equal with 12, and because our data span is updated until February 2021, by default for 2021 is equal with 2;
               </li>
            </ul>
            <br>
            For example, if we need data about different counties (Iasi and Galati),
            between <i>2019 December</i> and <i>2020 March</i>, and only the <i>gender</i> we'd use
            <code class="language-http"> counties=gl+is&startingYear=2019&startMonth=12&endingYear=2020&endMonth=3&categories=gender </code>, and the <code class="language-http">JSON</code> will look like this:
            <div class="snippet">
               <pre class="line-numbers">
                        <code class="language-json">
                        [
   {
      "year":"2019",
      "month":"12",
      "counties":{
         "gl":{
            "name":"GALATI",
            "id":"GL",
            "total":10578,
            "gender":{
               "male":6054,
               "female":4524
            }
         },
         "is":{
            "name":"IASI",
            "id":"IS",
            "total":8035,
            "gender":{
               "male":4403,
               "female":3632
            }
         }
      }
   },
   {
      "year":2020,
      "month":1,
      "counties":{
         "gl":{
            "name":"GALATI",
            "id":"GL",
            "total":10414,
            "gender":{
               "male":6017,
               "female":4397
            }
         },
         "is":{
            "name":"IASI",
            "id":"IS",
            "total":8011,
            "gender":{
               "male":4441,
               "female":3570
            }
         }
      }
   },
   {
      "year":2020,
      "month":2,
      "counties":{
         "gl":{
            "name":"GALATI",
            "id":"GL",
            "total":10323,
            "gender":{
               "male":5960,
               "female":4363
            }
         },
         "is":{
            "name":"IASI",
            "id":"IS",
            "total":8106,
            "gender":{
               "male":4552,
               "female":3554
            }
         }
      }
   },
   {
      "year":2020,
      "month":3,
      "counties":{
         "gl":{
            "name":"GALATI",
            "id":"GL",
            "total":10247,
            "gender":{
               "male":5880,
               "female":4367
            }
         },
         "is":{
            "name":"IASI",
            "id":"IS",
            "total":7613,
            "gender":{
               "male":4232,
               "female":3381
            }
         }
      }
   }
]
                        </code>
                    </pre>
            </div>
            <b>ATENTION!</b>
            The parameter "counties" <b>must not</b> be missing from the request, otherwise you won't get any information about any county, only the status:
            <code class="language-json">{"status":404,"message":"No counties given!"}</code>, so please pay attention!
            <br><br>
            In case you need data about <b>ALL</b> the counties at once, you can use the value <code class="language-json">"all"</code> instead of a county or list of counties.

         </div>
         <h2>Examples</h2>
         <div class="text">
            Let's see some examples!
         </div>

         <h3>Simple search</h3>
         <div class="text">
            If you want all the information about <code class="language-json">"Botoșani"</code> from <i>March 2020</i>,
            you'll send a request to <code class="language-html">https://unwe2021.herokuapp.com/api/query/bt/2020/3</code>.
            The <code class="language-http">JSON</code> file you'll receive will look like this:
         </div>
         <div class="snippet">
            <pre class="line-numbers">
                    <code class="language-json">
                    [
   {
      "name":"BOTOSANI",
      "id":"BT",
      "total":3132,
      "gender":{
         "male":1742,
         "female":1390
      },
      "compensation":{
         "compensated":779,
         "nonCompensated":2353
      },
      "education":{
         "noEducation":170,
         "primary":1070,
         "middleschool":774,
         "highschool":507,
         "postHighschool":51,
         "professional":485,
         "bachelors":75
      },
      "rate":{
         "total":2.3,
         "male":2.46,
         "female":2.12
      },
      "environment":{
         "urban":1122,
         "rural":2010
      },
      "age":{
         "lesser25":199,
         "from25to29":100,
         "from30to39":461,
         "from40to49":925,
         "from50to55":633,
         "greater55":814
      }
   }
]
                    </code>
                </pre>
         </div>


         <div class="text">
            Now, let's use the example with the 4th URI used. As you can see, it's an array of objects, each object representing a combination of year and month. The
            <code class="language-json">"counties"</code> contains the objects that contain information about required counties.
            Inside each county object you have all the categories, which themselves are objects that contain keys representing the way they are split up.
         </div>
         <br>
         <h3>Choose categories</h3>
         <div class="text">
            But maybe you don't want <b>ALL</b> of this information. Maybe you only want the total number of unemployed people, divided only into ages:
            <code class="language-html">https://unwe2021.herokuapp.com/api/query/?counties=gl+is&categories=age</code>
         </div>

         <div class="snippet">
            <pre class="line-numbers">
                    <code class="language-json">
                        [
       {
          "year":2019,
          "month":1,
          "counties":{
             "is":{
                "name":"IASI",
                "id":"IS",
                "total":8961,
                "age":{
                   "lesser25":427,
                   "from25to29":215,
                   "from30to39":875,
                   "from40to49":1598,
                   "from50to55":998,
                   "greater55":1135
                }
             }
          }
       },
       {
          "year":2019,
          "month":2,
          "counties":{
             "is":{
                "name":"IASI",
                "id":"IS",
                "total":8860,
                "age":{
                   "lesser25":694,
                   "from25to29":228,
                   "from30to39":1322,
                   "from40to49":2544,
                   "from50to55":1753,
                   "greater55":2319
                }
             }
          }
       },
       {
          "year":2019,
          "month":3,
          "counties":{
             "is":{
                "name":"IASI",
                "id":"IS",
                "total":8690,
                "age":{
                   "lesser25":642,
                   "from25to29":226,
                   "from30to39":1293,
                   "from40to49":2524,
                   "from50to55":1737,
                   "greater55":2268
                }
             }
          }
       }
    ]
                    </code>
                </pre>
         </div>
         <h3>Filter Years</h3>
         <div class="text">
            What if you want statistics about <code class="language-json">"Galati"</code> and <code class="language-json">"Iasi"</code>, but for the years <code class="language-html">2020-2021</code>?
         </div>
         <br>
         <div class="text">
            Then you'll use: <code class="language-html"> https://unwe2021.herokuapp.com/api/query/?counties=gl+is&categories=age&startingYear=2020&endingYear=2021&startMonth=12&endMonth=1 </code>
         </div>

         <div class="text">
            And the result would look kinda like this:
         </div>
         <div class="snippet">
            <pre class="line-numbers">
                    <code class="language-json">
                        [
       {
          "year":"2020",
          "month":"12",
          "counties":{
             "gl":{
                "name":"GALATI",
                "id":"GL",
                "total":12190,
                "age":{
                   "lesser25":1506,
                   "from25to29":430,
                   "from30to39":1728,
                   "from40to49":3511,
                   "from50to55":2485,
                   "greater55":2530
                }
             },
             "is":{
                "name":"IASI",
                "id":"IS",
                "total":9356,
                "age":{
                   "lesser25":881,
                   "from25to29":254,
                   "from30to39":1375,
                   "from40to49":2658,
                   "from50to55":1911,
                   "greater55":2277
                }
             }
          }
       },
       {
          "year":2021,
          "month":1,
          "counties":{
             "gl":{
                "name":"GALATI",
                "id":"GL",
                "total":11856,
                "age":{
                   "lesser25":1039,
                   "from25to29":435,
                   "from30to39":1719,
                   "from40to49":3565,
                   "from50to55":2550,
                   "greater55":2548
                }
             },
             "is":{
                "name":"IASI",
                "id":"IS",
                "total":9708,
                "age":{
                   "lesser25":932,
                   "from25to29":265,
                   "from30to39":1429,
                   "from40to49":2736,
                   "from50to55":1994,
                   "greater55":2352
                }
             }
          }
       }
    ]
                    </code>
                </pre>
         </div>
      </div>
   </div>

   <link rel="preconnect" href="https://fonts.gstatic.com">
   <!-- <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
   <link href="/public/css/font-roboto.css" rel="stylesheet">
   <link href="/public/css/font-ubuntu.css" rel="stylesheet">
   <link href="/public/css/font-icons.css" rel="stylesheet">
   <link id="prismCss" rel="stylesheet" href="/public/prism-dark.css">


   <script src="/public/js/theme.js"></script>
   <script src="/public/js/script-api.js"></script>
   <script id="prismJs" src="/public/prism-dark.js"></script>
   <script src="/public/js/info.js"></script>
   <script src="/public/js/dot.js"></script>
   <script src="/public/js/box.js"></script>
   <script src="/public/js/animation.js"></script>
</body>

</html>