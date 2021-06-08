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
    if(!content.ok) {
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
    console.log('merge adaugarea');
}

function setUX() {
    menuBtn = document.getElementsByClassName('menu-button')[0];
    nav = document.getElementsByClassName('menu')[0];

    menuBtn.addEventListener('click', function() {
        nav.classList.add('menu--opened');
        menuBtn.classList.add('menu-button--opened');
    });

    document.body.addEventListener('click', function(e) {
        if(menuBtn.contains(e.target) || nav.contains(e.target)) {
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
