<header class="header">
    <div class="title collision-box">Un<span>We</span></div>
    <div class="menu-button"><span class="material-icons">menu</span></div>
    <div class="menu collision-box">
        <a class="item <?= $data['pageId'] == 'home' ? 'item--selected' : '' ?>" href="/public/home">Home</a>
        <a class="item <?= $data['pageId'] == 'statistics' ? 'item--selected' : '' ?>" href="/public/statistics">Statistics</a>
        <a class="item <?= $data['pageId'] == 'api' ? 'item--selected' : '' ?>" href="/public/api">API</a>
        <a class="item <?= $data['pageId'] == 'admin' ? 'item--selected' : '' ?>" href="/public/admin">Admin</a>
        <a class="item theme">
            <span class="material-icons theme-dark-button">dark_mode</span>
            <span class="material-icons theme-light-button">light_mode</span>
        </a>
    </div>
</header>
