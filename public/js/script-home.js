window.addEventListener('DOMContentLoaded', (event) => {
    setUX();

    setAnimation();

    getNumbersToDisplay();
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
    console.log(jsonResponse);

    console.log(jsonResponse[0].counties);    

    for (const key in jsonResponse[0].counties) {
        if (Object.hasOwnProperty.call(jsonResponse[0].counties, key)) {
            const county = jsonResponse[0].counties[key];
            total += county.total;
        }
    }

    console.log(total);
    document.getElementById('total-unemployed').innerText = total;
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
