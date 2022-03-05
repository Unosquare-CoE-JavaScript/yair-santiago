import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import { OrderContextProvider } from "./contexts/OrderContext";
import OrderEntry from "./pages/entry/OrderEntry";
import { Container } from "reactstrap";

function App() {
    return (
        <OrderContextProvider>
            <Container fluid className="App">
                <OrderEntry />
            </Container>
        </OrderContextProvider>
    );
}

export default App;
