import React from "react";
import { Col } from "reactstrap";
import { useOrderContext } from "../../contexts/OrderContext";

export default function ScoopOptions({ name, imagePath, onAmountUpdate }) {
    const value = useOrderContext() ?? {};
    const { itemAmounts } = value;

    const handleValueChange = ({ target: { value } }) => onAmountUpdate(name, value);

    return (
        <Col xs={12} md={4} lg={3} style={{ textAlign: "center" }}>
            <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
            <input
                role="spinbutton"
                type="number"
                value={itemAmounts.scoops[name] ?? "0"}
                onChange={handleValueChange}
                min={0}
                max={10}
                aria-label={name}
            />
        </Col>
    );
}
