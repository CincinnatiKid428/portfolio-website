(function() {
    console.log('*** Starting IIFE')
    let form = document.querySelector('#contact-form');
    let email = document.querySelector('#user-email');
    let phone = document.querySelector('#user-phone');
    const phoneRegex = /[0-9][0-9][0-9][\-][0-9][0-9][0-9][\-][0-9][0-9][0-9][0-9]/;

    function showErrorMessage(input, message){
        console.log(' > > |showErrorMessage()|: Starting with input: '+input+' |message: '+message);

        //Get the parent of the element throwing the error
        let container = input.parentElement;
        console.log('|showErrorMessage()| input field: '+input+' | parent container: '+container);

        //Remove exisiting error if one is already displayed
        let currentError = container.querySelector('.error-msg');
        console.log('|showErrorMessage()| children of input node parent with class .error-msg :'+JSON.stringify(currentError));
        
        console.log('|showErrorMessage()| currentError is ('+currentError+')');
        if(currentError){
            console.log('|showErrorMessage()|removing current error node :'+currentError);
            container.removeChild(currentError);
        }

        //Add error message if it's not empty
        if(message){
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('error-msg');
            errorDiv.innerText = message;
            container.appendChild(errorDiv);
            console.log('> > > |showErrorMessage()| Adding div with error message to '+input+' :'+message);
        }
    }//end showErrorMessage()


    //Simple validation of email address entered by user
    function validateEmail(){
        console.log('> > |validateEmail()| Started');
        enteredEmail = email.value;

        //If email is null
        if(!enteredEmail){
            showErrorMessage(email, 'Email address is required');
            return false;
        }

        let atSignIndex = enteredEmail.indexOf('@');
        let dotIndex = enteredEmail.lastIndexOf('.');

        //Make sure email has an @ sign that is not the first character or last

        let hasAtSign = ((atSignIndex > 0) && (atSignIndex < enteredEmail.length - 1));
        console.log('|validateEmail()| hasAtSign is :'+hasAtSign);

        if(!hasAtSign) {
            showErrorMessage(email, 'Please enter a valid email address');
            return false;
        }


        //Make sure email has a . after the @ and must be at least the 4th
        //character but not the last character

        let hasDot = ((dotIndex > 2) && (dotIndex < enteredEmail.length - 1));
        console.log('|validateEmail()| hasDot is : '+hasDot);

        if(!hasDot){
            showErrorMessage(email, 'Please enter a valid email address');
            return false;
        }

        //At this point the email should be valid, clear error msg
        showErrorMessage(email, null);
        return true;
    }//end validateEmail()


    //Simple validation of phone number entered by user
    function validatePhone(){
        
        let enteredPhone = phone.value;
        console.log('> >|validatePhone()| Started with phone number entered: '+enteredPhone);

        //If there was no phone entered
        if(!enteredPhone){
            showErrorMessage(phone, 'Phone number is required');
            return false;
        }

        //Test if phone number entered doet not match regular expression
        console.log('|validatePhone()| Phone number matches regular expression:'+phoneRegex.test(enteredPhone));
        if(!phoneRegex.test(enteredPhone)){
            showErrorMessage(phone, 'Phone number is not valid');
            return false;
        }

        //Phone number must be valid at this point, clear error message
        showErrorMessage(phone, null);
        return true;
    }//end validatePhone()


    //Validates form by calling for validation of email and phone individually
    function validateForm(){
        console.log('> > |validateForm()| Starting validation.');
        let isValidEmail = validateEmail();
        let isValidPhone = validatePhone();
        if( isValidEmail && isValidPhone ) {
            console.log('|validateForm()| Both email and phone passed validation.');
            return true;
        } else {
            console.log('|validateForm()| Validations did not pass, isValidEmail = '+isValidEmail+' , isValidPhone = '+isValidPhone);
            return false;
        }
        
    }

    //Prevent default action for submit on form
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let validInput = validateForm();
        if(validInput){
            alert('This would submit email/phone to the server!');
        }
    });

    //Listeners for email/phone field input
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);
    
    console.log('*** Finished IIFE');
})();//end IIFE()