import React from "react";
import { useOrderContext } from "../../contexts/OrderContext";
import { useNavigationContext } from "../../contexts/PageNavigation";
import { formatCurrency } from "../../helpers/currency";
import SummaryForm from "./SummaryForm";

export default function OrderSummary() {
    const orders = useOrderContext() ?? {};
    const navigation = useNavigationContext() ?? {};

    const { navigate } = navigation;
    const { itemAmounts, getSubtotal, getTotal } = orders;
    const categories = Object.keys(itemAmounts);

    return (
        <section role="complementary" aria-label="Order Summary">
            <h1>Order Summary</h1>
            <ul className="list-unstyled p-0">
                {categories.map((singleCategory) => (
                    <li key={singleCategory}>
                        <div className="h4">
                            {singleCategory} ({formatCurrency(getSubtotal(singleCategory))})
                        </div>
                        <ul className="list-unstyled">
                            {Object.keys(itemAmounts[singleCategory]).map(
                                (itemName) =>
                                    itemAmounts[singleCategory][itemName] > 0 && (
                                        <li>
                                            {itemAmounts[singleCategory][itemName]}x {itemName}
                                        </li>
                                    )
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Order total: {formatCurrency(getTotal())}</h2>
            </div>
            <SummaryForm onSubmit={navigate.bind(this, "thank-you")} />
        </section>
    );
}
