import sendVerificationInfo from "../services/sendVerificationInfo";
import { validateEmail } from "./landingUtils";

/**
 * Controls the sidebar functionality including opening, closing and form validation
 * @returns {Object} Object containing the public methods for sidebar control
 */

// Get DOM elements
const sideBar = document.getElementById("container-sidebar-form");

const buttonCloseSideBar = document.getElementById("button-close-sidebar");

/**
 * Opens the sidebar if email validation passes
 * @returns {void}
 */
export function launchSideBar() {

  const inputReadOnlyEmail = document.getElementById("readonly-email");

  try {
    const firstEmail = validateEmail();

    if (firstEmail) {

      sideBar.classList.add("active");
      inputReadOnlyEmail.value = firstEmail;

    } else {

      return false;
      //console.error("Email validation failed");
    }
  } catch (error) {

    console.error("Error launching sidebar:", error);
  }
}

/**
 * Closes the sidebar and removes event listeners
 * @returns {void}
 */
export function closeSideBar() {

  if (!sideBar || !buttonCloseSideBar) {

    console.error("Required elements not found");
    return;

  }

  try {
    const handleClose = () => {

      if (sideBar.classList.contains("active")) {

        sideBar.classList.remove("active");

      }
    };

    // Add click event listener
    buttonCloseSideBar.addEventListener("click", handleClose);

    // Optional: Add escape key listener
    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        handleClose();
      }
    });
  } catch (error) {

    console.error("Error closing sidebar:", error);

  }
}

/**
 * Initialize sidebar functionality
 * @returns {void}
 */
export function initializeSidebar() {

  if (!sideBar || !buttonCloseSideBar) {

    console.error("Cannot initialize sidebar: Required elements not found");
    return;

  }

  // Set up initial state
  sideBar.classList.remove("active");

  // Initialize close button
  closeSideBar();
}

/**
 * Validate the form data to register
 * @returns {boolean}
 *
 */

document.addEventListener("DOMContentLoaded", function()  {

  //Data
  let email = null;
  let names = null;
  let lastnames = null;
  let idNumber = null;
  let phoneNumber = null;


    document
  .getElementById("submit-form-register-button")

  .addEventListener("click", () => {

    const card = document.querySelector(".card-register:not(.off)");
    const cardId = card.dataset.id;
    
    //console.log("DATA SET");
    //console.log(cardId);


    switch (cardId) {

      case "1":

        email = validateEmails();

        if (email) {

            moveRegisterCards(2);
        };

        break;

      case "2":

        names = validateNames();
        lastnames = validateLastNames();

        if (names && lastnames) {

            moveRegisterCards(3);
        };

        break;

      case "3":

          idNumber = validateIdNumber();
          //console.log(idNumber);

          if(idNumber) {
            moveRegisterCards(4);
          }

          break;

      case "4":

        phoneNumber = validateNumberPhone();

        if (phoneNumber) {
          moveRegisterCards(5);
        }

        /*console.log(email);
        console.log(number);
        console.log(idNumber);
        console.log(lastnames);
        console.log(phoneNumber);*/

        if (email && number && idNumber && lastnames && phoneNumber) {

          sendVerificationInfo(email);
          //redirectVerificationCode();

        } else {

          //console.log("faltan datos");
          return false;

        }
        break;
    }

  });

});

/**
 * This function validates the user email
 * 
 * @returns {email, boolean}
 */

function validateEmails() {

  const inputReadOnlyEmail = document.getElementById("readonly-email").value;
  const confirmEmailElement = document.getElementById("confirm-email"); 
  const inputSecondEmail = confirmEmailElement.value; 

  if (inputReadOnlyEmail === inputSecondEmail) {

      return inputReadOnlyEmail;

  } else {

      displayErrors("Emails do not match");
      confirmEmailElement.value = ''; 

      return false;
  }
}

/**
 * This function validates the names
 * 
 * @returns {boolean, error}
 */

function validateNames () {

  const names = document.getElementById("input-names").value;

  if (/\d/.test(names)) {

    displayErrors("Your name cannot contain numbers");

    return false;

  } else {
      
    return names;

  }

};

/**
 * This function validates the lastnames
 * 
 * @returns {boolean, error}
 */

function validateLastNames () {

  const firstLastname = document.getElementById("first-lastname").value;
  const secondLastName = document.getElementById("second-lastname").value;

  const fullLastname = firstLastname + secondLastName;

  const firstValidation = /\d/.test(firstLastname);
  const secondValidation = /\d/.test(secondLastName);

  if ( firstValidation || secondValidation) {

    displayErrors("Your lastnames cannot contain numbers");
    return false;

  } else {

    return fullLastname;

  }

}

/**
 * This function move the cards with the inputs form
 * @param {} dataId 
 */

function moveRegisterCards (dataId) {

    console.log(dataId);

    const firstCard = document.getElementById("first-card-register-form");
    const secondCard = document.getElementById("second-card-register-form");
    const thirdCard = document.getElementById("third-card-register-form");
    const fourthCard = document.getElementById("fourth-card-register-form");

    switch (dataId) {

        case 2:

          firstCard.classList.toggle('off');

          secondCard.style.display = 'flex';

          break;
        
        case 3:

          secondCard.classList.toggle('off');

          secondCard.style.display = 'none';

          thirdCard.style.display = 'flex';

          break;
        
        case 4:

          thirdCard.classList.toggle('off');

          thirdCard.style.display = 'none';

          fourthCard.style.display = 'flex';

          break;

        case 5: 

          fourthCard.classList.toggle('off')

          fourthCard.style.display = 'none';

          break;

          
      };
    
}


/**
 * This function catch the error and display it to the user
 * @param {string} errorInformation 
 */


function displayErrors (errorInformation) {

    const spanError = document.getElementById("error-space");

    spanError.classList.remove('shake');

    void spanError.offsetWidth;

    spanError.textContent = errorInformation;
    spanError.classList.add('shake');

    setTimeout(() => {
        spanError.textContent = '';
        spanError.classList.remove('shake');
    }, 3000)
}


/**
 * This function validates the identification number
 * 
 */

function validateIdNumber () {

  const idNumber = document.getElementById("id").value;

  const numberValidation = /^[0-9]+$/.test(idNumber);

  const idLength = 10;

  if (numberValidation && idNumber.length === idLength) {

    console.log("VERIFICAD0");

    return idNumber;
    

  } else {

    console.log("fallo la verificacion");
    displayErrors("Please verify your id number");
    return false;

  }
}

/**
 * This function validates the phone number
 */

function validateNumberPhone () {

  const phone = document.getElementById("number").value;

  const phoneValidation = /^[0-9]+$/.test(phone);

  console.log("validando numero");

  const numberLenght = phone.length

  if (phoneValidation && numberLenght === 10) {

      //console.log("NUMERO CORRECTO");

      return phone;

  } else {

    //console.log("NUMERO INCORRECTO");
    displayErrors("Please verify your number");
    return false;

  };

};

function redirectVerificationCode () {

  window.location.href = '/email/verification';
  
}