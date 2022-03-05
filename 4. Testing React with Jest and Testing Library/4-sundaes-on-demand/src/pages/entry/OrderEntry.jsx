import React from "react";
import { useOrderContext } from "../../contexts/OrderContext";
import { formatCurrency } from "../../helpers/currency";
import Options from "./Options";

export default function OrderEntry() {
    const context = useOrderContext() ?? {};
    const { getTotal } = context;
    return (
        <div>
            <h1>Custom your sundae</h1>
            <Options optionType="scoops" label="Scoops" cost={2.0} />
            <Options optionType="toppings" label="Toppings" cost={1.5} />
            <h5>Order total: {formatCurrency(getTotal?.()) ?? 0}</h5>
        </div>
    );
}
