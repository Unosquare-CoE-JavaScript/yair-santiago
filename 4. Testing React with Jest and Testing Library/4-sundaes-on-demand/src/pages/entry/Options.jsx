import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import AlertBanner from "../../components/AlertBanner";
import { useOrderContext } from "../../contexts/OrderContext";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import { formatCurrency } from "../../helpers/currency";

export default function Options({ optionType, label, cost }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const context = useOrderContext();
    const { getSubtotal, updateItem } = context ?? {};

    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((res) => setItems(res.data))
            .catch((err) => {
                setError(err);
            });
    }, [optionType]);

    if (error) {
        return <AlertBanner />;
    }

    const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;

    const optionsItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            onAmountUpdate={updateItem.bind(this, optionType)}
        />
    ));

    const subTotal = formatCurrency(getSubtotal?.(optionType) ?? -1);

    return (
        <div>
            <Row>
                <Col>
                    <h2>{label}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    {optionType === "scoops" ? "Scoops" : "Toppings"} total: {subTotal}
                </Col>
            </Row>

            <Row>{optionsItems}</Row>
        </div>
    );
}
