//Set up materialize components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});

document.addEventListener('DOMContentLoaded', function() {
    //Nav Menu
    const menu = document.querySelector('.side-menu');
    M.Sidenav.init(menu, {edge: 'right'})
});

