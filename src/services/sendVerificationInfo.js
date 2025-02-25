
/**
 * 
 */

async function sendVerificationInfo  (email)  {


    console.log("ENVIANDO AL BACK");
    try {



        const response = await fetch("http://localhost:8080/verification/send-code", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        console.log("SERVER REQUEST", response);

        if (response.ok) {

            alert("Your verification code was send to " + email);
        } else {

            alert("Something went wrong, please try again");
        }
    }  catch (error) {

        console.error(error);
    }
};


export default  sendVerificationInfo;