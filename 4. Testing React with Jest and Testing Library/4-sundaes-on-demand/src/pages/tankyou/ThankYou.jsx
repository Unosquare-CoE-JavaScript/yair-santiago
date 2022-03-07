import React from "react";
import { Button } from "reactstrap";
import { useOrderContext } from "../../contexts/OrderContext";
import { useNavigationContext } from "../../contexts/PageNavigation";

export default function ThankYou() {
    const { resetAmounts } = useOrderContext();
    const { navigate } = useNavigationContext();
    const resetAndGoToSummary = () => {
        resetAmounts();
        navigate("order-entry");
    };
    return (
        <section role="complementary" aria-label="Thank you page">
            <h1>Essentially, Thank You</h1>
            <p>Your order won't be delivered, but you can always order again</p>

            <Button onClick={resetAndGoToSummary}>Order again</Button>
        </section>
    );
}
