window.onload = function(){

    // if the user is trying to access the mycart page but user is not logged in
    if(window.location.pathname=="/cart/" && !sessionStorage.getItem("accessToken")){
        window.location.href = '../login'
    }

    const items = document.getElementById('items')
    const myCart = document.getElementById('my-cart')
    const itemsListPrice = document.getElementById('items-list-price')
    const checkout = document.getElementById('checkout')

    //Shopping cart API URL
    const apiUrl = 'https://fakestoreapi.com/products';

    let data;
    let totalPrice = 0;
    // Fetch the data from the API URL
    async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            method : 'get'
        })
        data = await response.json();
        // console.log(data)
        createMyCartItem(data);

        } catch (error) {
            console.log('Error', error)
            items.remove();
            const fetchError = document.createElement('div');
            fetchError.setAttribute('class','error-during-fetching')
            fetchError.innerText = 'No Items Founds!'
            myCart.appendChild(fetchError);
        }
    }

    //take the user from the session storage
    //get the cart of the user
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const myProductsInCart = user.userCart;

    //create an array of the all the items in the cart of user
    let myProductForCheckout = [];

    function createMyCartItem(products) {
        myProductsInCart.forEach(product => {
            const currentProduct = products.find(allProduct => {
                return allProduct.id === parseInt(product);
            })
            myProductForCheckout.push(currentProduct);
        });
        // console.log(myProductForCheckout)
        if(myProductForCheckout.length === 0)
        {
            items.remove();
            const fetchError = document.createElement('div');
            fetchError.setAttribute('class','error-during-fetching')
            fetchError.innerText = 'No Items Founds!'
            myCart.appendChild(fetchError);
        }
        else{
            if(myProductForCheckout.length <= 3)
            {
                itemsListPrice.style.height = '15em'
            }
            else{
                itemsListPrice.style.height = 'max-content'
            }
            renderProductInMyCart(myProductForCheckout);
            renderAllPaymentDescForCheckout(myProductForCheckout)
        }
    }

    function renderProductInMyCart(cartProduct) {
        items.innerHTML = '';
        cartProduct.map(productItem => {
            // items.innerHTML = `<div id="${productItem.id}" class="item">
            //                         <img src="${productItem.image}" alt="Item" />
            //                         <div class="info">
            //                             <div class="row">
            //                                 <div class="item-title">Title : ${productItem.title}</div>
            //                                 <div class="price">Price :${productItem.price}</div>
            //                             </div>
            //                             <button id="remove-from-cart-${productItem.id}" class="remove-from-cart"     onclick='removeCartItem(event)'>Remove From Cart</button>
            //                         </div>
            //                     </div>`
            //                     const removeButton = itemElement.querySelector(`#remove-from-cart-${productItem.id}`);
            //                     removeButton.addEventListener('click', () => removeCartItem(productItem.id));
            totalPrice += productItem.price
            const itemElement = document.createElement('div');
            itemElement.id = productItem.id;
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${productItem.image}" alt="Item" />
                <div class="info">
                    <div class="row">
                        <div class="item-title">Title : ${productItem.title}</div>
                        <div class="price">Price : ${productItem.price}</div>
                    </div>
                    <button id="remove-from-cart-${productItem.id}" class="remove-from-cart">Remove From Cart</button>
                </div>
            `;

            const removeButton = itemElement.querySelector(`#remove-from-cart-${productItem.id}`);
            removeButton.addEventListener('click', () => removeCartItem(productItem.id));
            items.appendChild(itemElement);
        })
    }

    //remove the item from the cart
    function removeCartItem(cartProductId) {
        const cartPos = myProductsInCart.indexOf(cartProductId.toString());
        myProductsInCart.splice(cartPos,1);
        console.log(myProductsInCart)
        //delete the item from the users in local storage
        const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))
        const users = JSON.parse(localStorage.getItem('users'))
        const currentUser = users.find(userItem => {
            return userItem.userToken === accessToken;
        })
        console.log(currentUser)
        const currentUserCart = currentUser.userCart;
        console.log(currentUserCart)
        const userCartItemPos = currentUserCart.indexOf(cartProductId.toString());
        currentUserCart.splice(userCartItemPos,1);

        //Again save the user into local storage and session storage
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));


        //Previous product must be removed from the myProductForCheckout
        myProductForCheckout = [];
        totalPrice = 0;
        // location.reload();
        //again create the new cart 
        createMyCartItem(data);
    }

    // let myProductForCheckout = [];
    //Checkout Money for all items in the cart listed here
    function renderAllPaymentDescForCheckout(cartProduct) {
        checkout.innerHTML = '';
        checkout.innerHTML += `<div class="checkout-title">Checkout List</div>`
        itemsListPrice.innerHTML = '';
        cartProduct.map(cartItem =>{
            itemsListPrice.innerHTML += `<div class="item-price">
                                            <div class="item-no-with-title">
                                            <div class="item-no">1.</div>
                                            <div class="item-title">${cartItem.title}</div>
                                            </div>
                                            <div class="price">$${cartItem.price}</div>
                                        </div>
                                         `
        })
        checkout.appendChild(itemsListPrice);
        checkout.innerHTML += ` <div class="item-total-price">
                                    <span class="total">Total</span>
                                    <span class="total-price">$${totalPrice.toFixed(2)}</span>
                                </div>
                                `
        const cartCheckoutBtnDiv = document.createElement('div')
        cartCheckoutBtnDiv.setAttribute('class','click-to-checkout-btn')
        const cartBtnForCheckout = document.createElement('button')
        cartBtnForCheckout.setAttribute('id','checkout-btn')
        cartBtnForCheckout.setAttribute('class','checkout-btn')
        cartBtnForCheckout.innerText = 'Click To Checkout'
        cartCheckoutBtnDiv.appendChild(cartBtnForCheckout);
        checkout.appendChild(cartCheckoutBtnDiv);

        cartBtnForCheckout.addEventListener('click', (e) => paymentThroughRazorpay(e))

    }


    // Redirect to razoray for transaction when i click on checkout button
    
    // checkoutBtn.addEventListener('click', () => {
    //     console.log('clicked')
    //     sessionStorage.setItem('TotalAmount', JSON.stringify(totalPrice))
    //     location.href = '../razorpay'
    // })

    function paymentThroughRazorpay(e) {
        sessionStorage.setItem('TotalAmount', JSON.stringify(totalPrice))
        location.href = '../razorpay'
    }


    fetchData();
}