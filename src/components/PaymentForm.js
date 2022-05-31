import React, {useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import './paymentform.css'

const CARD_OPTION = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {color: "#fce883"},
            "::placeholder" : {color: "#87bbfd"}
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    },
    hidePostalCode: true
};


export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe()
    const elements = useElements()

    const _handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
    

    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/payment/", {
                amount: 1000,
                id: id
            })

            if(response.data.success) {
                console.log('Successful payment')
                setSuccess(true)
            }
        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return(
        <>
            {!success ?
                <form onSubmit={_handleSubmit}>
                    <fieldset>
                        <div>
                            <CardElement options={CARD_OPTION}/>
                        </div>
                    </fieldset>
                    <button className="pay">Pay</button>
                    <p style={{"font-weight": "bold"}}>Payment Coming Soon!</p>
                    
                </form>
                                
                :
                <div>
                    <h2>Your Payment is Successful</h2>
                </div>
            }
        </>
    )   
}