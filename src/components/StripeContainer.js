import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";


const PUBLIC_KEY= "pk_test_51L3xBVFnQPKdotwLXuj5MeM9CM4m9OwGCKfxxli2puOWLhmzBelGHmpx690euhYWytpIO5Icb4sAcOxMRNozDPNC006anMboWx"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

