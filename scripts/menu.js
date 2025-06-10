let selectedMenu = 'starters';
let selectedCategory = 'veg';
let currentMenuItems = []; 
let currentMenuHasCategory = true;

let userDetails = {}
let cartDetails = []





function quantitySelector_HTML(itemPrice){
    let quantitySelector = ''; 
    let slashCount = countSubString(itemPrice, '/')
    let itemPrices = parseIntegersFromString(itemPrice, "/")
    if(slashCount == 1){
        quantitySelector = `
            <select class='form-select quantity-select'>
                <option value='select-half' selected>Half @ ${itemPrices[0]}</option>
                <option value='select-full'>Full @ ${itemPrices[1]} </option>
            </select>
        `;
    }else if(slashCount == 2){
        quantitySelector += `
            <select class='form-select quantity-select'>
                <option value='select-qtr' selected>Qtr @ ${itemPrices[0]} </option>
                <option value='select-half'>Half @ ${itemPrices[1]}</option>
                <option value='select-full'>Full @ ${itemPrices[2]} </option>
            </select>
        `;
    }
    return quantitySelector;
}


function quantitySelectorManager(sessionObj, quantityID, defaultCase = false){
    if(defaultCase){ //set lowest quantity by default
        for(let itemIndex = 0; itemIndex < currentMenuItems.length; itemIndex++){
            currentMenuItems[itemIndex]['priceList'] = parseIntegersFromString(currentMenuItems[itemIndex]['price'],'/')
            let pricesCategory = currentMenuItems[itemIndex]['priceList'].length;
            if(pricesCategory == 1) currentMenuItems[itemIndex]['quantity'] = 'default'
            else if(pricesCategory == 2) currentMenuItems[itemIndex]['quantity'] = 'half'
            else if(pricesCategory == 3) currentMenuItems[itemIndex]['quantity'] = 'qtr'   
        }
    }else{
        let selectedVal = $(`#${quantityID} > .quantity-select`).val().split('-')[1]
        let itemIndex = parseInt(quantityID.split('-')[1])
        currentMenuItems[itemIndex]['quantity'] = selectedVal;
    }
}



function addImageSource_toItem(itemName, imageSource, sessionObj){
    cartDetails = sessionObj.load_cartDetails();
    let userDetails = sessionObj.load_userDetails();
    for(let index=0; index< cartDetails.length; index++){
        //console.log(cartDetails[index]['name'])
        if(cartDetails[index]['name'] == itemName)
            cartDetails[index]['imagePath'] = imageSource
    }
    sessionObj.update_allDetails(userDetails, cartDetails)
}





//change body of menuItems after filtering from updateSelectedmenu
function update_menuBody(sessionObj){
    let menu_itemsList_HTML = ``;
    for(let index=0; index < currentMenuItems.length; index++){
        let item_imagePath = parse_menuImageSource(currentMenuItems[index])
        let itemName = `${currentMenuItems[index]['name']} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (x${currentMenuItems[index]['amount']})`;
        if(currentMenuItems[index]['amount'] <= 1)
            itemName = `${currentMenuItems[index]['name']}`;

        let itemPrices = parse_menuItemPrices(currentMenuItems[index]['price'])
        let menuItem_quantitySelect = quantitySelector_HTML(currentMenuItems[index]['price'])
        
        menu_itemsList_HTML += `
            <div class='col-5 menu-item-card g-5'>
                <div class="card">
                    <img src="${item_imagePath}" class="card-img-top menuItem-image" alt="Image Not Available...">
                    <div class="card-body">
                        <h3 class="card-title"> ${itemName} </h3> 
                        <p class="card-text">
                            ${itemPrices}
                        </p> <br /> 
                        <div class='row'>
                            <div class='col-4'>
                                <button class="btn cart-btn" id="cart-${index}">
                                    Add To Cart
                                </button>
                            </div>
                            <div class='col-1'></div>
                            <div class='col-5' id='quantity-${index}'>
                                ${menuItem_quantitySelect}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='col-1'></div>
        `;
    }
    $('#menu-itemsList').html(menu_itemsList_HTML);
}


//filter menuItemsArray content depending on what has been selected
function updateSelectedMenu(sessionObj){
    currentMenuHasCategory = menuList[selectedMenu]['hasCategory']
    if(menuList[selectedMenu]['hasCategory']){  
        $('#category-container').html(menuCategorySelectorHTML)
        $(`#category-${selectedCategory}`).addClass('selected-category')
        currentMenuItems = menuList[selectedMenu]['items'][selectedCategory]
    }
    else{
        let categoryParsed = selectedMenu[0].toUpperCase() + selectedMenu.slice(1, selectedMenu.length)
        $('#category-container').html(`<br /> <br /> <br /> ${categoryParsed} has no Categories to choose from!`)
        currentMenuItems = menuList[selectedMenu]['items']['itemList']
    }
    update_menuBody(sessionObj);
}


//control events for selection of items in the selection-menu header
function controlMenuSelection(clickedMenu){
    $(`#${selectedMenu}-box`).removeClass('selected-menu')
    $(`#${clickedMenu}-box`).addClass('selected-menu')
    selectedMenu = clickedMenu;
    $('#category-menu input').attr('placeholder',`Search in ${selectedMenu}..`)
}

function controlMenuCategory(clickedCategory){
    $(`#category-${selectedCategory}`).removeClass('selected-category')
    $(`#category-${clickedCategory}`).addClass('selected-category')
    selectedCategory = clickedCategory;
    //console.log(currentMenuItems)
}




//parses image source from itemName : example: Chicken Soup => chicken_soup and returns a path to that image source
function parse_menuImageSource(itemObject){
    let itemNameArray = itemObject['name'].split(' ');
    let parsedItemName = itemNameArray.map((itemName)=> itemName[0].toLowerCase() + itemName.slice(1, itemName.length)).join('_')
    if(currentMenuHasCategory)
        return `./assets/menu/${selectedMenu}/${selectedCategory}/${parsedItemName}.${itemObject['ext']}`;
    return `./assets/menu/${selectedMenu}/${parsedItemName}.${itemObject['ext']}`;
}


function parse_menuItemPrices(itemPrice){
    let itemPriceRanges = itemPrice.split('/').length; 
    switch(itemPriceRanges) {
        case 1:
            return `<h4> Price:  <span class='float-end item-price'>${itemPrice} </span> </h4>`;
        case 2:
            return `<h4> Price: <span class='float-end item-price'> ${itemPrice} </span> </h4>`;
        case 3:
            return `<h4> Price: <span class='float-end item-price'> ${itemPrice} </span> </h4>`;
      }
}




function addItemToCart(sessionObj, orderID){
    let orderIndex = parseInt(orderID.split('-')[1]);
    sessionObj.update_cartDetails(currentMenuItems[orderIndex]);

    for(let itemIndex = 0; itemIndex < currentMenuItems.length; itemIndex++){ //update items image path
        let currentItem_name = currentMenuItems[itemIndex]['name'];
        let item_imagePath = parse_menuImageSource(currentMenuItems[itemIndex])
        addImageSource_toItem(currentItem_name, item_imagePath, sessionObj)
    }

    cartDetails = sessionObj.load_cartDetails();
    userDetails = sessionObj.load_userDetails();
    alertItemAddedToCart()
    header_changeCartCount(sessionObj)
}



function alertItemAddedToCart(end = false){
    if(end){
        $('#item-added-alerter').removeClass('animate__animated animate__slideInDown')
        $('#item-added-alerter').hide();
    }
    else{
        $('#item-added-alerter').show();
        $('#item-added-alerter').text('Your Item has been Successfully added to your cart!');
        $('#item-added-alerter').addClass('animate__animated animate__slideInDown')
        setTimeout(()=>{
            alertItemAddedToCart(true)
        }, 500)
    }
}




$(document).ready(function(){
    let session = new Session();
    userDetails = session.load_userDetails();
    cartDetails = session.load_cartDetails();

    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    $('#item-added-alerter').hide()
    header_changeCartCount(session)
    controlMenuSelection('starters');
    controlMenuCategory('veg');
    updateSelectedMenu(session);
    quantitySelectorManager(session, '', true)

    load_overlaySpinner('body', randomNumberGenerator(200, 600), {
        image: './assets/icons/logo.png'
    })
    


    $('.menu-header-box').click(function(){
        let clickedMenu = $(this).attr('id').split('-')[0]
        controlMenuSelection(clickedMenu);
        updateSelectedMenu(session)
        quantitySelectorManager(session, '', true)
    })


    $('#category-container').on('click', '.category-item',function(){
        let clickedCategory = $(this).attr('id').split('-')[1]
        controlMenuCategory(clickedCategory);
        updateSelectedMenu(session)
        quantitySelectorManager(session, '', true);
    })



    $('#menu-itemsList').on('click', '.cart-btn', function(){
        addItemToCart(session, $(this).attr('id'));
    })

    $('#menu-itemsList').on('change', '.quantity-select', function(){
        quantitySelectorManager(session, $(this).parent().attr('id'))
    })




    $('#goto-cart-btn').click(function(){
        window.location.href = './delivery.html'
    })
})