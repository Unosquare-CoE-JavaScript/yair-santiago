import React, { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const initialAmounts = { scoops: {}, toppings: {} };

const OrderContext = createContext();

export const useOrderContext = () => {
    const context = useContext(OrderContext);

    /* if (!context) {
        throw new Error("OrderContext must be used inside a <OrderContext.Provider>");
    } */

    return context;
};

export const OrderContextProvider = ({ children }) => {
    const [itemAmounts, setItemAmounts] = useState({ ...initialAmounts });
    const [itemCosts, setItemCosts] = useState({ ...pricePerItem });

    const updateCosts = (costs) => setItemCosts(costs);

    const updateItem = (type, itemName, amount) =>
        setItemAmounts((prev) => ({
            ...prev,
            [type]: {
                ...prev[type],
                [itemName]: amount,
            },
        }));

    const getSubtotal = (type) => {
        return Object.keys(itemAmounts[type]).reduce((acc, key) => {
            const cost = itemCosts[type];
            const amount = itemAmounts[type][key];
            return acc + cost * amount;
        }, 0);
    };

    const resetAmounts = () => setItemAmounts({ ...initialAmounts });

    const getTotal = () => {
        return Object.keys(itemAmounts).reduce((acc, type) => acc + getSubtotal(type), 0);
    };

    return (
        <OrderContext.Provider value={{ itemAmounts, updateItem, getSubtotal, getTotal, updateCosts, resetAmounts }}>
            {children}
        </OrderContext.Provider>
    );
};
