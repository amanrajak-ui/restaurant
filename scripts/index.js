let userCart = [];
let userDetails = {};
let currentSliderIndex = 0;


function findUserCoordinates(sessionObj){
    const success = (position) =>{
        let longt = position.coords.longitude;
        let latt = position.coords.latitude;
        let addressValue = `${longt} ${latt}`;

        userDetails['location'] = addressValue;
        sessionObj.update_userDetails(userDetails)

        stop_overlaySpinner('body')
        locate_userLocation(addressValue, sessionObj);
    }
    const error = () =>{
        alert('Make sure you have a proper internet connection to detect location!')
        stop_overlaySpinner('body')
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
        let streetName = (fetchedResult[resultsCount - 1]['street'] == undefined) ? " " : fetchedResult[resultsCount - 1]['street'] 
        let district = (fetchedResult[resultsCount - 1]['state_district'] == undefined) ? "Dehradun" : fetchedResult[resultsCount - 1]['state_district']
        let state = (fetchedResult[resultsCount - 1]['state'] == undefined) ? "Uttarakhand" : fetchedResult[resultsCount - 1]['state']
        let userLocationDetails = `${streetName}, ${district}, ${state}`;

        userDetails['address'] = userLocationDetails;
        sessionObj.update_userDetails(userDetails)
        $('#delivery-input').val(userDetails['address'])
    })
}



function handleSelectionOptions(selectedOption){
    let selectionContainer_HTML = '';
    if(selectedOption == 'delivery'){
        selectionContainer_HTML = `  
            <div class='row'>
                <div class='col-7'>
                    <input class='form-control' placeholder='Enter your delivery address' id='delivery-input'>
                </div>
                <div class='col-3 gray-text' id='locate-btn'> 
                    <img src='./assets/icons/svgs/locatorPin.svg' id='locator-icon'>
                    <span id='locate-text'> Locate me  </span>
                </div>
                <div class='col-2'> <button class='btn menu-btn' id='find-food-btn'> Find Food </button> </div>
            </div>
        `;
    }else if(selectedOption == 'dine'){
        selectionContainer_HTML = `
            <em style='color: gray'> Select from our varieties of food available here </em> &nbsp; &nbsp; &nbsp;
            <button class='btn btn-outline-success menu-btn'> View Menu </button>
        `;
    }
    $('#selection-container').html(selectionContainer_HTML)
}


function fadingSliderAnimator(){
    let sliderImages = [ 'chicken_tikka.jpg', 'chicken_pakora.jpg', 'cold_drink.webp', 'paneer_pakora.jpg', 'paneer_tikka.webp', 'tandoori_chicken.jpg'] 
    while(true){
        let newSliderIndex = randomNumberGenerator(0, sliderImages.length - 1);
        if(newSliderIndex != currentSliderIndex){
            currentSliderIndex = newSliderIndex;
            break;
        }
    }
    $('#slider-img').addClass('animate__animated animate__fadeOut');
    setTimeout(()=>{
        $('#slider-img').removeClass('animate__animated animate__fadeOut');
        $('#slider-img').attr('src', `./assets/slider/${sliderImages[currentSliderIndex]}`)
        $('#slider-img').addClass('animate__animated animate__fadeIn');
    }, 700)
    
    setTimeout(fadingSliderAnimator, randomNumberGenerator(7000, 10000))
}



function redirect_aboutSection(aboutUs_section, sessionObj){
    userDetails = sessionObj.load_userDetails();
    userDetails['redirect_aboutSection'] = aboutUs_section;
    sessionObj.update_userDetails(userDetails);
    window.location.href = './about.html';
}




$(document).ready(function(){
    let session = new Session();
    userDetails = session.load_userDetails();
    cartDetails = session.load_cartDetails();
    
    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    header_changeCartCount(session);
    handleSelectionOptions('delivery')

    load_overlaySpinner('body', randomNumberGenerator(200, 600), {
        image: './assets/icons/logo.png'
    })

    setTimeout(fadingSliderAnimator, randomNumberGenerator(5000, 7000))
    

    $('#selection-manager').change(function(){
        handleSelectionOptions($(this).val());
    })

    $('#selection-container').on('click','.menu-btn',function(){
        window.location.href = './menu.html';
    });

    $('#locate-btn').click(function(){
        load_overlaySpinner('body', false, { text: "Fetching Location Details" })
        findUserCoordinates(session);
    })


    $('.custom-card-btn').click(function(){
        let aboutUs_section = $(this).attr('id')
        redirect_aboutSection(aboutUs_section, session);
    })

})

