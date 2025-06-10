let userDetails = {}
let cartDetails = []



function redirect_learnMore_sections(sessionObj){
    userDetails = sessionObj.load_userDetails();
    if( userDetails['redirect_aboutSection'] != null ){
        window.location.href = `#${userDetails['redirect_aboutSection']}-section`;
        userDetails['redirect_aboutSection'] = null;
        sessionObj.update_userDetails(userDetails);
    }       
}



$(document).ready(function(){
    let session = new Session();
    userDetails = session.load_userDetails();
    cartDetails = session.load_cartDetails();
    
    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    header_changeCartCount(session);
    redirect_learnMore_sections(session);


    load_overlaySpinner('body', randomNumberGenerator(200, 600), {
        image: './assets/icons/logo.png'
    })  


})