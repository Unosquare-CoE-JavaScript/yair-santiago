import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";
import { OrderContextProvider } from "./contexts/OrderContext";
import { NavigationContextProvider } from "./contexts/PageNavigation";
import { Routes } from "./navigation/Routes";

function App() {
    return (
        <NavigationContextProvider>
            <OrderContextProvider>
                <Container fluid className="App">
                    <Routes />
                </Container>
            </OrderContextProvider>
        </NavigationContextProvider>
    );
}

export default App;
