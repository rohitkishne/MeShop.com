window.onload = function(){
    
    // if the user is trying to access the login page but user is already logged in
    if(window.location.pathname=="/login/" && sessionStorage.getItem("accessToken")){
        window.location.href="../profile";
    }

    const navLogin = document.getElementById('login')
    const navSignup = document.getElementById('signup')
    const shop = document.getElementById('home')
    const myCart = document.getElementById('mycart')


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
        location.href = '../cart'
    })

    const formContainer = document.getElementById('login-form')
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const loginBtn = document.getElementById('login-form-submit-btn');

    const alertMessage = document.createElement('p')
    alertMessage.setAttribute('class', 'alert-msg')

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (email.value.trim() === '' || password.value.trim() === '') {
            alertMessage.innerHTML = 'Error: All fields are mandatory!'
            formContainer.appendChild(alertMessage);
        }
        else {
            let users = JSON.parse(localStorage.getItem('users'));
            if (users) {
                let currentUser = users.find(user => {
                    return user.userEmail === email.value.trim();
                });
                if (currentUser) {
                    if(password.value.trim()===currentUser.userPassword){
                        sessionStorage.setItem('loggedInUser',JSON.stringify(currentUser));
                        sessionStorage.setItem('accessToken',JSON.stringify(currentUser.userToken));

                        setTimeout(() => {
                            window.location.href='../profile';
                        }, 1000);

                        alertMessage.innerHTML = 'You have Successfully Logged In!'
                        formContainer.appendChild(alertMessage);
                    }
                    else{
                        alertMessage.innerHTML = 'Password does not match, Please try again!'
                        formContainer.appendChild(alertMessage);
                    }
                }
                else {
                    alertMessage.innerHTML = 'You have not signed up, Please do sign up!'
                    formContainer.appendChild(alertMessage);
                }
            }
            else {
                alertMessage.innerHTML = 'You have not signed up, Please do sign up!'
                formContainer.appendChild(alertMessage);
            }
        }
    })
}