function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme(apiPage=false) {
    console.log('test theme change')
    if(localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        // document.getElementById('theme-icon').innerHTML = 'light_mode';
        document.getElementsByClassName('theme-dark-button')[0].style.opacity = 0;
        document.getElementsByClassName('theme-light-button')[0].style.opacity = 1;

        if(apiPage) {
            document.getElementById("prismCss").href="../../../public/prism-light.css";
            document.getElementById("prismJs").href="../../../public/prism-light.js";
        }
        //light_mode
    } else {
        setTheme('theme-dark');
        // document.getElementById('theme-icon').innerHTML = 'dark_mode';
        document.getElementsByClassName('theme-dark-button')[0].style.opacity = 1;
        document.getElementsByClassName('theme-light-button')[0].style.opacity = 0;

        if(apiPage) {
            document.getElementById("prismCss").href="../../../public/prism-dark.css";
            document.getElementById("prismJs").href="../../../public/prism-dark.js";
        }
        //dark_mode
    }
}

