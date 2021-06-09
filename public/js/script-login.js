window.addEventListener('DOMContentLoaded', (event) => {

        setUX();

        setAnimation();
});


async function submitLoginForm() {
    var username = document.getElementById('uname').value;
    var password = document.getElementById('psw').value;

    var rawResponse = await fetch('/api/admin/login', {
        method: 'POST',
        body:JSON.stringify({
            username: username,
            password: password
        })
    });

    var content = await rawResponse.json();
    if(content.code == 200) {
        window.location.replace("/public/admin");
    } else {
        var failedMessage = document.querySelectorAll('.login-form .failed-message')[0];
        failedMessage.classList.add('show');

        window.setTimeout(() => {
            failedMessage.classList.remove('show');
        }, 3000);

        //nu, nu le-am logat
        //o sa afisam ceva mesaj aici
    }



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
