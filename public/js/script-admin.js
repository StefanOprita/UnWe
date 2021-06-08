window.addEventListener('DOMContentLoaded', (event) => {
    //verifyLogOn();
    setUX();

    setAnimation();
    //testAdminApi();
});

async function verifyLogOn() {
    console.log(' oaihsdoiajdoijaoisd');
    rawResponse = await fetch('/api/admin/logged', {
        method: 'POST',
    });

    content = await rawResponse.json();
    console.log(content);
    if (!content.ok) {
        console.log('nu e bine:(');
    }
}


async function testAdminApi() {
    // console.log("ieeeeeei");
    // JSON.stringify({
    //     username: 'Stefan',
    //     password: '1234'
    // });
    // var rawResponse = await fetch('/api/admin/login', {
    //     method: 'POST',
    //     body:JSON.stringify({
    //         username: 'Stefan',
    //         password: '1234'
    //     })
    // });

    // var content = await rawResponse.json();
    // console.log(content);


    // rawResponse = await fetch('/api/admin/logged', {
    //     method: 'POST',
    // });

    // content = await rawResponse.json();
    // console.log(content);

    // fetch('/api/admin/create', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         username: "Stefan",
    //         password: "1234"
    //     })
    // }).then(response => response.text())
    // .then(json => console.log(json));
    //console.log(content);
}

/*

Valorea pt Harghita 22
HUNEDOARA
6423
3212
3211
3243
3180
3.64
3.89
3.42
4374
2190
2184
2049
1022
1027
502
497
1544
1870
128
1336
546
855
418
1300
1509
798
829
1
2019
*/

async function deleteEntry() {
    var year = document.getElementById('remove-year').value;
    var month = document.getElementById('remove-month').value;
    var county = document.getElementById('remove-county').value;

    var uri = '/api/admin/' + county + '/' + year + '/' + month;



    var rawResponse = await fetch(uri, {
        method: 'DELETE'
    });

    var json = await rawResponse.text();

    console.log(json);

}

async function addEntry() {
    var year = document.getElementById('add-year').value;
    var month = document.getElementById('add-month').value;
    var county = document.getElementById('county').value;
    var sub25 = document.getElementById('sub25').value;
    var from25to29 = document.getElementById('25to29').value;
    var from30to39 = document.getElementById('30to39').value;
    var from40to49 = document.getElementById('40to49').value;
    var from50to55 = document.getElementById('50to55').value;
    var over55 = document.getElementById('over55').value;
    var male = document.getElementById('add-male').value;
    var female = document.getElementById('add-female').value;
    var noedu = document.getElementById('noedu').value;
    var primary = document.getElementById('primary').value;
    var middle = document.getElementById('middle').value;
    var high = document.getElementById('high').value;
    var bachelors = document.getElementById('bachelors').value;
    var post = document.getElementById('post').value;
    var prof = document.getElementById('prof').value;
    var urban = document.getElementById('add-urban').value;
    var rural = document.getElementById('add-rural').value;
    var comp = document.getElementById('add-comp').value;
    var nonComp = document.getElementById('not-comp').value;

    console.log(year + " " + month + " " + county + " " + sub25 + " " + from25to29 + " " + from30to39 + " " + from40to49 + " "
        + from50to55 + " " + over55 + " " + male + " " + female + " " + noedu + " " + primary + " " + middle + " " + high + " " + bachelors + " " + post + " " + prof + " " + urban + " "
        + rural + " " + comp + " " + nonComp);

    console.log('merge adaugarea');

    var uri = '/api/admin/info';
    var rawResponse = await fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            year: year,
            month: month,
            county: county,
            sub25: sub25,
            from25to29: from25to29,
            from30to39: from30to39,
            from40to49: from40to49,
            from50to55: from50to55,
            over55: over55,
            male: male,
            female: female,
            noedu: noedu,
            primary: primary,
            middle: middle,
            high: high,
            bachelors: bachelors,
            post: post,
            prof: prof,
            urban: urban,
            rural: rural,
            comp: comp,
            nonComp: nonComp
        })
    });
    // var content = await rawResponse.json();
    var json = await rawResponse.text();

    console.log(json);
}

function setUX() {
    menuBtn = document.getElementsByClassName('menu-button')[0];
    nav = document.getElementsByClassName('menu')[0];

    menuBtn.addEventListener('click', function () {
        nav.classList.add('menu--opened');
        menuBtn.classList.add('menu-button--opened');
    });

    document.body.addEventListener('click', function (e) {
        if (menuBtn.contains(e.target) || nav.contains(e.target)) {
            return;
        }
        nav.classList.remove('menu--opened');
        menuBtn.classList.remove('menu-button--opened');

    });

    document.getElementsByClassName('theme')[0].addEventListener('click', toggleTheme);
}

function setAnimation() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    screenWidth = canvas.width;
    screenHeight = canvas.height;

    Animation(ctx);
}
