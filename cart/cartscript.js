window.onload = function(){

    // if the user is trying to access the mycart page but user is not logged in
    if(window.location.pathname=="/cart/" && !sessionStorage.getItem("accessToken")){
        window.location.href = '../login'
    }

    const navLogin = document.getElementById('login')
    const navSignup = document.getElementById('signup')
    const shop = document.getElementById('home')
    const myCart = document.getElementById('mycart')
    const profile = document.getElementById('profile')


    navLogin.addEventListener('click', () =>{
        location.href = '../login'
    })

    navSignup.addEventListener('click', () => {
        location.href = '../signup'
    })

    shop.addEventListener('click', () => {
        location.href = '../shop'
    })

    myCart.addEventListener('click', () => {
        location.href = './index.html'
    })

    profile.addEventListener('click', () =>{
        location.href = '../profile'
    })

    const checkoutBtn = document.getElementById('checkout-btn')

    checkoutBtn.addEventListener('click', () => {
        location.href = '../razorpay'
    })

}