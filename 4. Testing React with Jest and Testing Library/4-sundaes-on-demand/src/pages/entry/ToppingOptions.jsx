import React from "react";
import { Col } from "reactstrap";
import { useOrderContext } from "../../contexts/OrderContext";

export default function ToppingOptions({ name, imagePath, onAmountUpdate }) {
    const value = useOrderContext() ?? {};
    const { itemAmounts } = value;

    const handleCheckbox = ({ target: { checked } }) => onAmountUpdate(name, checked ? 1 : 0);

    return (
        <Col xs={12} md={4} lg={3} style={{ textAlign: "center" }}>
            <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
            <label htmlFor={`${name}-topping`} className="d-block">
                <input
                    id={`${name}-topping`}
                    type="checkbox"
                    name={`${name}-topping`}
                    checked={itemAmounts.toppings[name] === 1}
                    onChange={handleCheckbox}
                />{" "}
                {name}
            </label>
        </Col>
    );
}
