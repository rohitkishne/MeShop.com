// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

const navLogin = document.getElementById('login')
const navSignup = document.getElementById('signup')
const login = document.getElementById('login-btn')
const signup = document.getElementById('signup-btn')
const shop = document.getElementById('home')
const profile = document.getElementById('profile')
const myCart = document.getElementById('mycart')


navLogin.addEventListener('click', () =>{
    location.href = '../login'
})

navSignup.addEventListener('click', () => {
    location.href = '../signup'
})

login.addEventListener('click', () =>{
    location.href = '../login'
})

signup.addEventListener('click', () => {
    location.href = '../signup'
})

shop.addEventListener('click', () => {
    location.href = '../shop'
})

profile.addEventListener('click', () => {
    location.href = '../profile'
})

myCart.addEventListener('click', () => {
    location.href = '../cart'
})