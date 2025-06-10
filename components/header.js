let menubarOpen = false;
let menuIcons = {
    "hamburger": "assets/icons/svgs/bars.svg",
    "xmark": "assets/icons/svgs/xmark-solid.png"
}
let pathTo_rootDirectory = './';


function loadHeaderComponent(rootPath){
    pathTo_rootDirectory = rootPath;
    return `
    <div class='container-fluid'>
        <div class='row'>
            <div class='col-1'></div>
            <div class='col-2'>
                <img src='./assets/icons/logo.png' id='logo-image' class='animate__animated animate__bounceInDown'>
            </div>
            <div class='col-3 animate__animated animate__bounceInDown' id='header-title'>
                Vivek's Restaurant
            </div>
            <div class='col-2'></div>
            <div class='col-1 navigation-link' id='index'> <img src='./assets/icons/home/home.svg' class='navigation-link-image'><br /> Home </div>
            <div class='col-1 navigation-link' id='menu'> <img src='./assets/icons/home/menu.svg' class='navigation-link-image'><br /> Menu </div>
            <div class='col-1 navigation-link' id='delivery'> 
                <img src='./assets/icons/home/cart-trolley-ui-5-svgrepo-com.png' class='navigation-link-image'> 
                <span id='cart-items-count-indicator'> 0 </span> <br /> My Cart </div>
            <div class='col-1 navigation-link' id='about'> <img src='./assets/icons/home/profile.svg' class='navigation-link-image'><br /> About Us </div>
        </div>
    </div>`;
}


function header_changeCartCount(sessionObj){
    let cartCount = sessionObj.load_totalCartCount();
    $('#cart-items-count-indicator').text(cartCount);
}



$(document).ready(function(){

    $('header').on('click', '#header-title, #logo-image', function(){
        window.location.href = './index.html';
    })

    $('header').on('click', '.navigation-link', function(){ 
        let pageName = $(this).attr('id');
        window.location.href = `./${pageName}.html`;
    })
})