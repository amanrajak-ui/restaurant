let userDetails = {}
let cartDetails = []


function findUserCoordinates(sessionObj){
    const success = (position) =>{
        let longt = position.coords.longitude;
        let latt = position.coords.latitude;
        let addressValue = `${longt} ${latt}`;

        userDetails['location'] = addressValue;
        sessionObj.update_userDetails(userDetails);
        locate_userLocation(addressValue, sessionObj);
    }
    const error = () =>{
        alert('Make sure you have a proper internet connection to detect location!')
    }
    navigator.geolocation.getCurrentPosition(success, error);
}


function locate_userLocation(addressCoords, sessionObj){
    let apiKey = 'd0e6bda9f31d47cda3da00d1a3c703da';
    let userLongitude = addressCoords.split(' ')[0];
    let userLatitude = addressCoords.split(' ')[1];
    let query = `https://api.geoapify.com/v1/geocode/reverse?lat=${userLatitude}&lon=${userLongitude}&format=json&apiKey=${apiKey}`;
    fetch(query).then(response => response.json()).then(result =>{ 
        //main code here(code block after lat and long are retrieved)
        let fetchedResult = result['results']
        let resultsCount = fetchedResult.length
        //address details
        let streetName = fetchedResult[resultsCount - 1]['street']
        let district = fetchedResult[resultsCount - 1]['state_district']
        let state = fetchedResult[resultsCount - 1]['state']
        let userLocationDetails = `${streetName}, ${district}, ${state}`;

        userDetails['address'] = userLocationDetails;
        sessionObj.update_userDetails(userDetails)
        $('#location-input').val(userDetails['address'])
    })
}


function loadOrder_Modes(){
    $('#order-totalAmount').text(`Total: ₹${userDetails['totalPrice']}`);
    if(userDetails['orderMode'] != 'delivery')
        $('#location-details').hide();   

    if(userDetails['payMode'] == 'online'){
        $('#order-container').css({"height": "600px"})
        $('#submit-row').css({"margin-top": "10%"})
    }else if(userDetails['payMode'] == 'offline'){
        $('#order-container').css({"height": "450px"})
        $('#scanner-image-col').hide();
        $('#submit-row').css({"margin-top": "10%"})
    }
}


$(document).ready(function(){
    let session = new Session();
    userDetails = session.load_userDetails();
    cartDetails = session.load_cartDetails();

    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    header_changeCartCount(session)
    loadOrder_Modes()

    load_overlaySpinner('body', randomNumberGenerator(200, 600), {
        image: './assets/icons/logo.png'
    })


    $('#cancel-btn').click(function(){
        window.location.href = './delivery.html';
    });


    $('#location-findCoords, #location-pin').click(function(){
        findUserCoordinates(session)
    })
})