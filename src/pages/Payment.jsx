import Container from "../components/shared/Container";
import PageHelmet from "../components/shared/PageHelmet";
import PageTitle from "../components/shared/PageTitle";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/payment/CheckoutFrom";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/shared/PrimaryButton";

const Payment = () => {
  const { currAmount, setCurrAmount, currPlan, setCurrPlan } = useData();
  const { userDetails } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // add publishable key inside loadStripe()
  const pk_key = import.meta.env.VITE_STRIPE_PK;
  const stripePromise = loadStripe(pk_key);

  // handle the payment initiation
  const handlePaymentInitiate = (amount, plan) => {
    if (!userDetails?.userId) {
      return navigate("/login", { state: location.pathname });
    }
    setCurrAmount(amount);
    setCurrPlan(plan);
    setOpenModal(true);
  };

  return (
    <>
      <PageHelmet pageName="Payment" />
      <Container>
        <PageTitle title="Unlock All Our Features" />
        <div className="mx-auto">
          <div className="card w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 shadow-2xl bg-base-100 py-10  px-10">
            <div className="card card-compact bg-base-100 rounded-xl border dark:border-gray-500 border-gray-300 shadow-xl hover:scale-[1.02] duration-500">
              <div className="card-body">
                <div>
                  <h2 className="card-title text-lg text-primary ">Basic</h2>
                </div>
                <div className=" flex-grow">
                  <p>Create interactive forms that connect to your workflow</p>
                </div>
                <div className="text-center my-5">
                  <p className=" text-3xl">
                    <span className="text-prime">25 USD</span>
                    <span className="text-base">/mo</span>
                  </p>
                </div>

                <div
                  onClick={() => handlePaymentInitiate(25, "Basic")}
                  className="w-full flex justify-center gap-2 text-sm mt-2"
                >
                  <PrimaryButton text="Get Basic Yearly" />
                </div>

                <div className="grid grid-cols-2 gap-3 my-5  w-full flex-grow">
                  <ul className="list-disc pl-5  w-full">
                    <li className=" min-w-48">100 responses/mo included</li>
                    <li className=" min-w-48">1 user</li>
                    <li className=" min-w-48">Comment on Surveys</li>

                    <li className=" min-w-48">Unlimited Participation</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Plus Pachage */}
            <div className="card card-compact bg-base-100 rounded-xl border dark:border-gray-500 border-gray-300 shadow-xl hover:scale-[1.02] duration-500">
              <div className="card-body">
                <div className=" flex-grow">
                  <h2 className="card-title text-lg text-primary ">Plus</h2>
                </div>
                <div>
                  <p>Make your forms more beautiful and on-brand</p>
                </div>
                <div className="text-center my-5">
                  <p className=" text-3xl">
                    <span className="text-prime">50 USD</span>
                    <span className="text-base">/mo</span>
                  </p>
                </div>

                <div
                  onClick={() => handlePaymentInitiate(50, "Plus")}
                  className="w-full flex justify-center gap-2 text-sm mt-2"
                >
                  <PrimaryButton text="Get Plus Yearly" />
                </div>

                <div className="grid grid-cols-2 gap-3 my-5  w-full flex-grow">
                  <ul className="list-disc pl-5  w-full">
                    <li className=" min-w-48">1000 responses/mo included</li>
                    <li className=" min-w-48">3 user</li>
                    <li className=" min-w-48">Comment on Surveys</li>

                    <li className=" min-w-48">Basic Included</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Package */}
            <div className="card card-compact bg-base-100 rounded-xl border dark:border-gray-500 border-gray-300 shadow-xl hover:scale-[1.02] duration-500">
              <div className="card-body">
                <div className=" flex-grow">
                  <h2 className="card-title text-lg text-primary ">Business</h2>
                </div>
                <div>
                  <p>Analyze performance and do more with your data</p>
                </div>
                <div className="text-center my-5">
                  <p className=" text-3xl">
                    <span className="text-prime">80 USD</span>
                    <span className="text-base">/mo</span>
                  </p>
                </div>

                <div
                  onClick={() => handlePaymentInitiate(80, "Business")}
                  className="w-full flex justify-center gap-2 text-sm mt-2"
                >
                  <PrimaryButton text="Get Business Yearly" />
                </div>
                <div className="grid grid-cols-2 gap-3 my-5  w-full flex-grow">
                  <ul className="list-disc pl-5  w-full">
                    <li className=" min-w-48">10,000 responses/mo included</li>
                    <li className=" min-w-48">5 user</li>
                    <li className=" min-w-48">Comment on Surveys</li>

                    <li className=" min-w-48">Plus Included</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* modal to update User Role */}
        <dialog className={`modal ${openModal ? "modal-open" : ""} `}>
          <div className="modal-box  bg-base-200 p-0 py-3">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => setOpenModal(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <div className="">
              <h2 className="text-2xl text-center font-semibold mb-5 flex flex-col gap-3">
                <p>Pay With Stripe</p>
                <p className=" ml-3">
                  <span className="text-primary mr-4">{currAmount} USD</span>
                  <span>({currPlan}) Plan</span>
                </p>
              </h2>
            </div>
            <div className="w-[90%]  mx-auto my-10">
              <div className="p-10 bg-base-300">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
          </div>
        </dialog>
      </Container>
    </>
  );
};

export default Payment;
