window.addEventListener('DOMContentLoaded', (event) => {
    console.log("heeeeeeei");

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
        //nu, nu le-am logat
        //o sa afisam ceva mesaj aici
    }

   
    
}   