window.onload = function(){

    // if the user is trying to access the signup page but user is logged in
    if(window.location.pathname=="/signup/" && sessionStorage.getItem("accessToken")){
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

    //****/ singup form start from here ------------------------------------------------------------------------------>

    const formContainer = document.getElementById('signup-form')
    const signup = document.getElementById("signup-form-submit-btn")
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');


    const alertMessage = document.createElement('p')
    alertMessage.setAttribute('class', 'alert-msg')


    function generateReferenceToken() {

        /*-------------------------------First way to Create Token Manually---------------------------------------------- */
        // let token = '';
        // const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ@#$&';
        // const tokenLength = 16;
    
        // do {
        //     // Generate a new token
        //     token = '';
        //     for (let i = 0; i < tokenLength; i++) {
        //       const randomIndex = Math.floor(Math.random() * characters.length);
        //       token += characters.charAt(randomIndex);
        //     }
        //     // Check if the token already exists in session storage
        //   } while (sessionStorage.getItem(token) !== null);
      
        //   return token;

        /*-------------------------------Second way to Create Token Automatically------------------------------------- */

        let array=new Uint8Array(16);
        // This line creates a new array of 16 random numbers,
        //  Each number can be anything from 0 to 255
        console.log("step 1",array);
        window.crypto.getRandomValues(array);
        // This line user inbuilt system to generate 16 random numbers
        // making sure they are really random
        //We then add these random numbers in the array
        // 0 to 255
        console.log("step 2",array);
        let accessToken=Array.from(array,b=>b.toString(16).padStart(2,"0")).join("");
        //b.toString(16)-> changes each number in the array into a string with base 16 (a-z and 0-9)
        // padStart(2,"0"))-> add a zero at the start of the number if it is a single digit
        // join("") converts array to concatenated string
        console.log("Step 3",accessToken);

        return accessToken
    }

    signup.addEventListener('click', (event) => {
        event.preventDefault();

        //ensure all field must be filled
        if(fname.value.trim() === '' || 
            lname.value.trim() === '' ||
            email.value.trim() ==='' || 
            password.value.trim() === '' || 
            confirmPassword.value.trim() === '')
        {
            alertMessage.innerHTML = 'Error: All fields are mandatory!'
            formContainer.appendChild(alertMessage);
        }
        else
        {
            //check password or confirm password is matching or not --------->
            if(password.value.trim() !== confirmPassword.value.trim())
            {
                alertMessage.innerHTML = 'OOPS!, Passord does not match.'
                formContainer.appendChild(alertMessage);
                confirmPassword.value = ''
            }
            else
            {
                // check whether user present or not
                // if present do this --------------->
                if(localStorage.getItem('users'))
                {
                    //two condition
                    // 1. if the user is not present with the email id
                    // 2. if the user is already with the email
                    if(checkIfEmailAlreadyExist(email.value))
                    {
                        alertMessage.innerHTML = 'Already a user with this Email!'
                        formContainer.appendChild(alertMessage);
                        formContainer.reset();
                    }
                    else{
                        saveUser(fname.value, lname.value, email.value, password.value, confirmPassword.value);
                    }
                }
                else{
                    // not present do this ---------------->
                    saveUser(fname.value, lname.value, email.value, password.value, confirmPassword.value);
                }

            }
        }
    })

    function checkIfEmailAlreadyExist(emailid) {
        let users = JSON.parse(localStorage.getItem('users'))
        //users containes the user in the form of array
        const obj = users.find(userObj=>{
            return userObj.userEmail === emailid;
            // if obj with email is exist ----> return true or otherwise false
        })

        if(obj)
            return true;
        else
            return false;
    }



    function saveUser(userfirstname, userlastname, useremail, userpassword, userconfirmpassword) {

        const referenceToken = generateReferenceToken();

        let userObj = {
            userToken : referenceToken,
            userFirstName : userfirstname,
            userLastName : userlastname,
            userEmail : useremail,
            userPassword : userpassword,
            userConfirmPassword : userconfirmpassword
        }

        let users = JSON.parse(localStorage.getItem('users'));
        //ensure that user is not null
        if(users === null)
        {
            users=[];
        }

        //push the new userObj into the users
        users.push(userObj);

        localStorage.setItem('users', JSON.stringify(users))


         // logic that this user is signed in
        // session storage will delete data after tab is closed
        // sessionStorage.setItem('loggedInUser',JSON.stringify(userObj));
        // sessionStorage.setItem('accessToken',JSON.stringify(referenceToken));

        fname.value='';
        lname.value='';
        email.value='';
        password.value='';
        confirmPassword.value='';

        alertMessage.innerHTML = 'Your are Successfully Sign up. Thank You!'
        formContainer.appendChild(alertMessage);

        // this is how we handle multiple pages
        // this will redirect to login folder
        setTimeout(() => {
            window.location.href='../login';
        }, 1000);
    }
}