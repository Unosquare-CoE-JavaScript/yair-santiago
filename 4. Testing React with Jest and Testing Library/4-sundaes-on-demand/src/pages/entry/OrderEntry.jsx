import React from "react";
import { Button, Row } from "reactstrap";
import { useOrderContext } from "../../contexts/OrderContext";
import { useNavigationContext } from "../../contexts/PageNavigation";
import { formatCurrency } from "../../helpers/currency";
import Options from "./Options";

export default function OrderEntry() {
    const navigation = useNavigationContext() ?? {};
    const context = useOrderContext() ?? {};
    const { getTotal } = context;
    const { navigate } = navigation;

    const total = getTotal?.() ?? 0;
    const valid = total <= 0;

    const handleSubmit = () => {
        navigate("order-confirm");
    };

    return (
        <section id="order-entry" role="complementary" aria-label="Order Entry section">
            <h1>Custom your sundae</h1>
            <Options optionType="scoops" label="Scoops" cost={2.0} />
            <Options optionType="toppings" label="Toppings" cost={1.5} />
            <h5>Order total: {formatCurrency(total)}</h5>

            <Row className="justify-content-center">
                <Button type="button" onClick={handleSubmit} disabled={valid}>
                    Checkout
                </Button>
            </Row>
        </section>
    );
}
