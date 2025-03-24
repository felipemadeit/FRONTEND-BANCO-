
/**
 * 
 */

import Alert from "@/components/alert/Alert.astro";

async function sendVerificationInfo  (email)  {

    const successfullyMessage = "Your verification code was send to " + email;
    const badMessage = "Please check your info";

    console.log("ENVIANDO AL BACK");
    try {



        const response = await fetch("http://localhost:8080/verification/send-code", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        return  {

            success: response.ok,
            message: response.ok ? successfullyMessage : badMessage
        };


    }  catch (error) {

        console.error(error);

        return  {
            success: false,
            message: "Network error"
        };
    }
};


export default  sendVerificationInfo;