window.addEventListener('DOMContentLoaded', (event) => {

    getNumbersToDisplay();

    setUX();

    setAnimation();

    //testAdminApi();
});

async function getNumbersToDisplay() {
    //o sa luam noi cum trebuia anul si luna... ramane asa pe moment
    var res = await fetch(
        "/api/query?counties=all" +
        "&startingYear=2021" +
        "&startMonth=6" +
        "&endingYear=2021" +
        "&endMonth=6"
    );


    var jsonResponse = await res.json();

    var total = 0;
    var lesser25 = 0;

    console.log(jsonResponse);

    console.log(jsonResponse[0].counties);

    for (const key in jsonResponse[0].counties) {
        if (Object.hasOwnProperty.call(jsonResponse[0].counties, key)) {
            const county = jsonResponse[0].counties[key];
            total += county.total;
            lesser25 += county.age.lesser25;
        }
    }

    document.getElementById('total-unemployed').innerText = total;

    // console.log('here1');

    // document.getElementsByClassName('info')[0].style.fontSize = '3em';


    // res = await fetch('http://ip-api.com/json');

    // jsonResponse = await res.json();



    // document.getElementById('county-unemployed-name').innerText = jsonResponse.regionName;

    // var region = jsonResponse.region

    // res = await fetch(
    //     "/api/query?counties=" + region +
    //     "&startingYear=2021" +
    //     "&startMonth=6" +
    //     "&endingYear=2021" +
    //     "&endMonth=6"
    // );

    // var jsonResponse = await res.json();


    document.getElementById('county-unemployed').innerText = lesser25;


    // document.getElementsByClassName('last-info')[0].style.fontSize = '1.7em';

    // obj.counties.forEach(county => {
    //     total += county['total'];
    // });
    // console.log(total);

}

async function testAdminApi() {
    console.log("ieeeeeei");
    JSON.stringify({
        username: 'Stefan',
        password: '1234'
    });
    var rawResponse = await fetch('/api/admin/login', {
        method: 'POST',
        body:JSON.stringify({
            username: 'Stefan',
            password: '1234'
        })
    });

    var content = await rawResponse.json();
    console.log(content);


    rawResponse = await fetch('/api/admin/logged', {
        method: 'POST',
    });

    content = await rawResponse.json();
    console.log(content);

    fetch('/api/admin/create', {
        method: 'POST',
        body: JSON.stringify({
            username: "Stefan",
            password: "1234"
        })
    }).then(response => response.text())
    .then(json => console.log(json));
    console.log(content);
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
