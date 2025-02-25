import { closeSideBar, launchSideBar } from "../scripts/sideBar";

export function validateEmail () {

    const inputEmail = document.getElementById("inputEmail");
    const userEmail = inputEmail.value;

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (validEmail.test(userEmail)) {
        console.log("Email is valid");
        inputEmail.style.border = "3px solid green";
        return userEmail;
    } else {
        console.log("Email is invalid");
        inputEmail.style.border = "3px solid red";
        return false;
    }
}

const buttonCTA = document.getElementById("button-cta").addEventListener("click", () => {
    launchSideBar();
    closeSideBar();
});




const text = document.getElementById("animate-text");
const lines = [
    "Protect your money,",
    "Invest in your future,",
    "Achieve your goals."
];
text.innerHTML = "";

const speed = 50;
let currentLine = 0;
let currentChar = 0;

const typeWritter = () => {
    if (currentLine < lines.length) {
        if (currentChar < lines[currentLine].length) {
            text.innerHTML += lines[currentLine][currentChar];
            currentChar++;
            setTimeout(typeWritter, speed);
        } else {
            if (currentLine < lines.length - 1) {
                text.innerHTML += "<br>";
            }
            currentLine++;
            currentChar = 0;
            setTimeout(typeWritter, speed);
        }
    }
};

setTimeout(typeWritter, speed);