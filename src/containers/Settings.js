import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import "./Settings.css";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null); // Added state for Stripe instance

  useEffect(() => {
    // Initialize the Stripe instance when the component mounts
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  function billUser(details) {
    return API.post("notes", "/billing", {
      body: details
    });
  }
  asyncfunction handleFormSubmit(storage,{ token, error}) {
    if(error){
    onError(error);
    return;
    }
    setIsLoading(true);
    try{
    awaitbillUser({
    storage,
    source: token.id
    });
    alert("Yourcardhasbeencharged successfully!");
    history.push("/");
    } catch(e) {
    onError(e);
    setIsLoading(false);
    }
    }
    return(
    <divclassName="Settings">
    <StripeProvider stripe={stripe}>
    <Elements
    fonts={[
        {
            cssSrc:
            ↪
            },
            ]}
            >
            );
            "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800",
            <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
            </Elements>
            </StripeProvider>
            </div>

}
