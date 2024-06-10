import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";
import useAuth from "../../hooks/useAuth";
import ActionButton from "../shared/ActionButton";
import usePostData from "../../hooks/usePostData";
import "./CheckFormStayles.css";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const { userDetails, getTokenAndUserDetils } = useAuth();
  const { setActnBtnLoading, currPlan, setCurrPlan, setCurrAmount } = useData();
  const createPaymentIntent = usePostData();
  const createPaymentDetails = usePostData();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const { currAmount } = useData();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setActnBtnLoading(true);
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
      console.log(error);
      setActnBtnLoading(false);
    } else {
      // console.log("Payment Method:", paymentMethod);
      setErrorMessage("");
      setActnBtnLoading(false);
    }

    //  Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: userDetails?.email || "anonymous",
            name: userDetails?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm Error:", confirmError);
      setActnBtnLoading(false);
    } else {
      // console.log("Payment Intent:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("Pyment success with tx Id:", paymentIntent.id);

        // save the paymenet details in the server
        handleCreatePaymentDetils(paymentIntent.id);
      }
      setActnBtnLoading(false);
    }
  };

  // Create paymetn intent
  useEffect(() => {
    const createAPaymentIntent = async () => {
      const postData = {
        price: currAmount,
      };
      const data = await createPaymentIntent(
        "Payment Intent",
        "create-payment-intent",
        postData,
        "allSkip",
        ["surveyor-surveys"] //will be change after manage-payment page
      );
      setClientSecret(data.clientSecret);
    };

    if (userDetails && currAmount > 0) createAPaymentIntent();
  }, [currAmount]);

  // Create payment details on successful payment
  const handleCreatePaymentDetils = async (txId) => {
    const postData = {
      userId: userDetails._id,
      paidAmount: currAmount,
      txId: txId,
      packageName: currPlan,
    };
    const data = await createPaymentDetails(
      "Payment Details",
      "create-payment-details",
      postData,
      "allSkip",
      ["surveyor-surveys"] //will be change after manage-payment page
    );
    if (data) {
      console.log(data);
      setCurrPlan("");
      setCurrAmount(0);
      getTokenAndUserDetils();
      navigate("/dashboard");
    }
    // setClientSecret(data.clientSecret);
  };

  return (
    <div>
      <div>
        <p className="text-red-400 text-center mb-10">{errorMessage}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },

                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div className="mt-5">
          <ActionButton
            isDisable={!stripe || !clientSecret}
            buttonText={`Pay $${currAmount} Now`}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
