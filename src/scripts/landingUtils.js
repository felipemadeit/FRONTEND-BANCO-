import sendVerificationInfo from "../services/sendVerificationInfo";
import { validateEmail } from "./landingUtils";

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

    buttonCloseSideBar.addEventListener("click", handleClose);

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

  sideBar.classList.remove("active");
  closeSideBar();
}

/**
 * Validates the entire form and returns a boolean
 * @returns {boolean} True if all form fields are valid
 */
export function validateForm() {
  try {
    const email = validateEmails();
    const names = validateNames();
    const lastnames = validateLastNames();
    const idNumber = validateIdNumber();
    const phoneNumber = validateNumberPhone();

    return !!(email && names && lastnames && idNumber && phoneNumber);
  } catch (error) {
    console.error("Error validating form:", error);
    return false;
  }
}

/**
 * Handles form submission and validation
 * @returns {void}
 */
export function handleFormSubmission() {
  const submitButton = document.getElementById("submit-form-register-button");
  if (!submitButton) return;

  submitButton.addEventListener("click", () => {
    const card = document.querySelector(".card-register:not(.off)");
    if (!card) return;
    
    const cardId = card.dataset.id;

    switch (cardId) {
      case "1":
        if (validateEmails()) moveRegisterCards(2);
        break;
      case "2":
        if (validateNames() && validateLastNames()) moveRegisterCards(3);
        break;
      case "3":
        if (validateIdNumber()) moveRegisterCards(4);
        break;
      case "4":
        if (validateNumberPhone()) {
          moveRegisterCards(5);
          if (validateForm()) {
            const email = document.getElementById("readonly-email").value;
            sendVerificationInfo(email);
          }
        }
        break;
    }
  });
}

/**
 * Initialize form submission handler
 * @returns {void}
 */
export function initializeForm() {
  document.addEventListener("DOMContentLoaded", function() {
    handleFormSubmission();
  });
}

// Helper functions (keep them private)

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

function validateNames() {
  const names = document.getElementById("input-names").value;

  if (/\d/.test(names)) {
    displayErrors("Your name cannot contain numbers");
    return false;
  } else {
    return names;
  }
}

function validateLastNames() {
  const firstLastname = document.getElementById("first-lastname").value;
  const secondLastName = document.getElementById("second-lastname").value;
  const fullLastname = firstLastname + secondLastName;

  const firstValidation = /\d/.test(firstLastname);
  const secondValidation = /\d/.test(secondLastName);

  if (firstValidation || secondValidation) {
    displayErrors("Your lastnames cannot contain numbers");
    return false;
  } else {
    return fullLastname;
  }
}

function moveRegisterCards(dataId) {
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
  }
}

function displayErrors(errorInformation) {
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

function validateIdNumber() {
  const idNumber = document.getElementById("id").value;
  const numberValidation = /^[0-9]+$/.test(idNumber);
  const idLength = 10;

  if (numberValidation && idNumber.length === idLength) {
    return idNumber;
  } else {
    displayErrors("Please verify your id number");
    return false;
  }
}

function validateNumberPhone() {
  const phone = document.getElementById("number").value;
  const phoneValidation = /^[0-9]+$/.test(phone);
  const numberLenght = phone.length;

  if (phoneValidation && numberLenght === 10) {
    return phone;
  } else {
    displayErrors("Please verify your number");
    return false;
  }
}

function redirectVerificationCode() {
  window.location.href = '/email/verification';
}

export default validateForm;