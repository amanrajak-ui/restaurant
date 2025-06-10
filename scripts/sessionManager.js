
//All the session variables editing will be controlled from here


class Session{
    constructor(){
        if(sessionStorage.getItem('userDetails') == null)
            sessionStorage.setItem('userDetails', JSON.stringify({}))
        if(sessionStorage.getItem('cartDetails') == null)
            sessionStorage.setItem('cartDetails', JSON.stringify([]))
    }











    //-------------------- LOADING --------------------------
    fetchQuantityPrice(priceList, quantity){
        if(quantity == 'qtr') 
            return priceList[0];
        if(quantity == 'half'){
            if(priceList.length == 3)
                return priceList[1];
            if(priceList.length == 2)
                return priceList[0];
        }
        if(quantity == 'full'){
            if(priceList.length == 3)
                return priceList[2];
            if(priceList.length == 2)
                return priceList[1];
        }
        if(quantity == 'default')
            return priceList[0];
    }


    load_userDetails(){
        let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        return userDetails;
    }

    load_cartDetails(){
        let cartDetails = JSON.parse(sessionStorage.getItem('cartDetails'));
        return cartDetails;
    }


    load_organizedCart(cartDetails){  //returns an organized list version of cartDetails with quanity all in one object 
        let organisedCart = {};
        for(let index=0; index< cartDetails.length; index++){
            //let cartItem = {}
            let currentItem = cartDetails[index];
            let currentItem_name = currentItem['name'];
            let currentItem_priceList = currentItem['priceList']
            let currentItem_quantity = currentItem['quantity'];
            let currentItem_amount = currentItem['amount'];

            if(!currentItem['deleted']){
                if(!organisedCart.hasOwnProperty(currentItem_name))
                organisedCart[currentItem_name] = {
                    "foodName": currentItem['name'],
                    "imagePath": currentItem['imagePath']
                };
                organisedCart[currentItem_name][currentItem_quantity] = {
                    price: this.fetchQuantityPrice(currentItem_priceList, currentItem_quantity),
                    amount: currentItem_amount
                }
            }
        }
        return organisedCart;
    }


    load_totalCartCount(){
        let totalCartCount = 0;
        let cartDetails = this.load_cartDetails();
        cartDetails.forEach(cartItem => {
            totalCartCount += cartItem['amount']
        });
        return totalCartCount;
    }

















    //-------------------- UPDATING --------------------------
    update_userDetails(userDetails){
        sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    }



    update_cartDetails(cartItem){ //Checks if item is present in cart, if it is then adds amount, else adds item to cart
        let cartDetails = this.load_cartDetails();
        let userDetails = this.load_userDetails();
        let totalAmount = userDetails['totalPrice'];
        if(totalAmount == null)
            totalAmount = 0;
        if(cartDetails.length <= 0){
            cartItem['deleted'] = false;
            cartDetails.push(cartItem)
            totalAmount += this.fetchQuantityPrice(cartItem['priceList'], cartItem['quantity']) 
        }
        else{
            let itemExists = false;
            for(let cartIndex = 0; cartIndex < cartDetails.length; cartIndex++){ 
                if( (cartDetails[cartIndex]['name'] == cartItem['name']) && (cartDetails[cartIndex]['quantity'] == cartItem['quantity']) )  //add item amount if it already exists
                {
                    itemExists = true;
                    cartDetails[cartIndex]['amount']++;
                    cartDetails[cartIndex]['deleted'] = false;
                    totalAmount += this.fetchQuantityPrice(cartDetails[cartIndex]['priceList'], cartDetails[cartIndex]['quantity']) 
                }
            }
            if(!itemExists){ //add item if it doesnt exist
                cartItem['deleted'] = false;
                cartDetails.push(cartItem)
                totalAmount += this.fetchQuantityPrice(cartItem['priceList'], cartItem['quantity']) 
            }  
        }

        userDetails['totalPrice'] = totalAmount;
        this.update_allDetails(userDetails, cartDetails);
    }



    update_allDetails(userDetails, cartDetails){  //updates user and cart details
        sessionStorage.setItem('userDetails', JSON.stringify(userDetails))
        sessionStorage.setItem('cartDetails', JSON.stringify(cartDetails))
    }


















    //-------------------- PRINTING --------------------------
    print_allDetails(){
        console.log(JSON.parse(sessionStorage.getItem('userDetails')));
        console.log(JSON.parse(sessionStorage.getItem('cartDetails')));
    }
}

