import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigationContext = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        console.warn("No <NavigationContext.Provider> was found, this might cause errors");
    }

    return context;
};

export const NavigationContextProvider = ({ children, defaultRoute = "order-entry" }) => {
    const [currentRoute, setCurrentRoute] = useState(defaultRoute);

    const navigate = (routeName) => currentRoute !== routeName && setCurrentRoute(routeName);

    return <NavigationContext.Provider value={{ currentRoute, navigate }}>{children}</NavigationContext.Provider>;
};
