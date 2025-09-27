(function () {
    const DEBUG_LOG = false; //controls debug logging

    DEBUG_LOG && console.log('*** Starting IIFE')
    let form = document.querySelector('#contact-form');
    let email = document.querySelector('#user-email');
    //let phone = document.querySelector('#user-phone');
    //const phoneRegex = /[0-9][0-9][0-9][\-][0-9][0-9][0-9][\-][0-9][0-9][0-9][0-9]/;

    function showErrorMessage(input, message) {
        DEBUG_LOG && console.log(' > > |showErrorMessage()|: Starting with input: ' + input + ' |message: ' + message);

        //Get the parent of the element throwing the error
        let container = input.parentElement;
        DEBUG_LOG && console.log('|showErrorMessage()| input field: ' + input + ' | parent container: ' + container);

        //Remove exisiting error if one is already displayed
        let currentError = container.querySelector('.error-msg');
        DEBUG_LOG && console.log('|showErrorMessage()| children of input node parent with class .error-msg :' + JSON.stringify(currentError));

        DEBUG_LOG && console.log('|showErrorMessage()| currentError is (' + currentError + ')');
        if (currentError) {
            DEBUG_LOG && console.log('|showErrorMessage()|removing current error node :' + currentError);
            container.removeChild(currentError);
        }

        //Add error message if it's not empty
        if (message) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('error-msg');
            errorDiv.innerText = message;
            container.appendChild(errorDiv);
            DEBUG_LOG && console.log('> > > |showErrorMessage()| Adding div with error message to ' + input + ' :' + message);
        }
    }//end showErrorMessage()


    //Simple validation of email address entered by user
    function validateEmail() {
        DEBUG_LOG && console.log('> > |validateEmail()| Started');
        enteredEmail = email.value;

        //If email is null
        if (!enteredEmail) {
            showErrorMessage(email, 'Email address is required');
            return false;
        }

        let atSignIndex = enteredEmail.indexOf('@');
        let dotIndex = enteredEmail.lastIndexOf('.');

        //Make sure email has an @ sign that is not the first character or last
        let hasAtSign = ((atSignIndex > 0) && (atSignIndex < enteredEmail.length - 1));
        DEBUG_LOG && console.log('|validateEmail()| hasAtSign is :' + hasAtSign);

        if (!hasAtSign) {
            showErrorMessage(email, 'Please enter a valid email address');
            return false;
        }


        //Make sure email has a . after the @ and must be at least the 4th character but not the last character
        let hasDot = ((dotIndex > 2) && (dotIndex < enteredEmail.length - 1));
        DEBUG_LOG && console.log('|validateEmail()| hasDot is : ' + hasDot);

        if (!hasDot) {
            showErrorMessage(email, 'Please enter a valid email address');
            return false;
        }

        //At this point the email should be valid, clear error msg
        showErrorMessage(email, null);
        return true;
    }//end validateEmail()


    //Simple validation of phone number entered by user
    function validatePhone() {

        let enteredPhone = phone.value;
        DEBUG_LOG && console.log('> >|validatePhone()| Started with phone number entered: ' + enteredPhone);

        //If there was no phone entered
        if (!enteredPhone) {
            showErrorMessage(phone, 'Phone number is required');
            return false;
        }

        //Test if phone number entered doet not match regular expression
        DEBUG_LOG && console.log('|validatePhone()| Phone number matches regular expression:' + phoneRegex.test(enteredPhone));
        if (!phoneRegex.test(enteredPhone)) {
            showErrorMessage(phone, 'Phone number is not valid');
            return false;
        }

        //Phone number must be valid at this point, clear error message
        showErrorMessage(phone, null);
        return true;
    }//end validatePhone()


    //Validates form by calling for validation of email
    function validateForm() {
        DEBUG_LOG && console.log('> > |validateForm()| Starting validation.');
        let isValidEmail = validateEmail();
        //let isValidPhone = validatePhone();
        if (isValidEmail /*&& isValidPhone*/) {
            DEBUG_LOG && console.log('|validateForm()| Email validation.');
            return true;
        } else {
            DEBUG_LOG && console.log('|validateForm()| Validations did not pass, isValidEmail = ' + isValidEmail);
            return false;
        }

    }

    //Prevent default action for submit on form and send message with Lambda function
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("user-name").value.trim();
        const email = document.getElementById("user-email").value.trim();
        const message = document.getElementById("user-message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const response = await fetch("https://ixoirgq7bd.execute-api.us-east-1.amazonaws.com/dev/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Your message has been sent!");
                form.reset();
            } else {
                console.error("Email failed:", data.error);
                alert("There was a problem sending your message. Please try again later.");
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("Network error. Please check your connection and try again.");
        }
    });

    //Listeners for email/phone field input
    email.addEventListener('input', validateEmail);
    //phone.addEventListener('input', validatePhone);

    DEBUG_LOG && console.log('*** Finished IIFE');
})();//end IIFE()