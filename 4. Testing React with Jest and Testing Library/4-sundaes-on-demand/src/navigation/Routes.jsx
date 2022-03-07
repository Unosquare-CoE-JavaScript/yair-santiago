import React from "react";
import { useNavigationContext } from "../contexts/PageNavigation";
import OrderEntry from "../pages/entry/OrderEntry";
import OrderSummary from "../pages/summary/OrderSummary";
import ThankYou from "../pages/tankyou/ThankYou";
export const Routes = () => {
    const { currentRoute } = useNavigationContext();

    return (
        <div>
            {currentRoute === "order-entry" && <OrderEntry />}
            {currentRoute === "order-confirm" && <OrderSummary />}
            {currentRoute === "thank-you" && <ThankYou />}
        </div>
    );
};
