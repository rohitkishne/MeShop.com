// Write your script here
if(window.location.pathname=="/profile/" && !sessionStorage.getItem("accessToken")){
    window.location.pathname="../signup";
}


const profileform = document.getElementById('profile-form')
const editform = document.getElementById('edit-form')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const saveInfoBtn = document.getElementById('saveInfo-form-submit-btn')
const changePasswordBtn = document.getElementById('edit-password-form-submit-btn')
const oldPassword = document.getElementById('old-password')
const newPassword = document.getElementById('new-password')
const confirmNewPassword = document.getElementById('confirm-new-password')
const logoutBtn = document.getElementById('logout-btn')


const alertMessage = document.createElement('p')
alertMessage.setAttribute('class', 'alert-msg')

// get the access token from session storage
const userAccessToken = JSON.parse(sessionStorage.getItem('accessToken'))
console.log(userAccessToken)
const users = JSON.parse(localStorage.getItem('users'));

//find the user with access token inside the users in local storage
const currentUser = users.find(user => {
    return user.userToken === userAccessToken;
})
console.log(currentUser)

saveInfoBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //just change the info into the local storage
    currentUser.userFirstName = fname.value.trim();
    currentUser.userLastName = lname.value.trim();

    // again convert to string and save the info into local storage and session storage

    localStorage.setItem('users', JSON.stringify(users))
    sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser))

    alertMessage.innerHTML = 'You have Successfully Change the Information. Thank You!'
    profileform.appendChild(alertMessage);

    setTimeout(() => {
        alertMessage.remove();
    }, 2000);

    fname.value = '';
    lname.value = ''

})

changePasswordBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if(oldPassword.value.trim()==='' ||
        newPassword.value.trim() === '' ||
        confirmNewPassword.value.trim() === '')
        {
            alertMessage.innerHTML = 'Error: All fields are mandatory!'
            editform.appendChild(alertMessage);
        }
    else{
        if(currentUser.userPassword !== oldPassword.value)
        {
            alertMessage.innerHTML = 'Old Password You entered is Wrong, Please try Again!'
            editform.appendChild(alertMessage);
        }
        else if(newPassword.value !== confirmNewPassword.value)
        {
            alertMessage.innerHTML = 'Your Password does not match with Confirm password. Try Again!'
            editform.appendChild(alertMessage);
        }
        else
        {
            currentUser.userPassword = newPassword.value;
            currentUser.userConfirmPassword = confirmNewPassword.value;

            localStorage.setItem('users', JSON.stringify(users))
            sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser))
            
            alertMessage.innerHTML = 'You have Successfully Change the password. Thank You!'
            editform.appendChild(alertMessage);

            setTimeout(() => {
                alertMessage.remove();
            }, 2000);

            editform.reset();
        }
    }
    
})

logoutBtn.addEventListener('click', () =>{
    sessionStorage.clear();
    window.location.href = '../shop'
})