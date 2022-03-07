import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../contexts/OrderContext";
import { NavigationContextProvider } from "../contexts/PageNavigation";
import { Routes } from "../navigation/Routes";

const AllProviders = ({ children }) => (
    <NavigationContextProvider>
        <OrderContextProvider>{children}</OrderContextProvider>
    </NavigationContextProvider>
);

describe("Navigation and integration tests", () => {
    test("First route is order entry", async () => {
        render(<Routes />, { wrapper: AllProviders });

        // Get order entry element and check wether it is on the document
        const orderEntrySection = screen.getByRole("complementary", { name: "Order Entry section" });
        expect(orderEntrySection).toBeInTheDocument();
    });

    test("After scoops and toppings are added, a click in the 'Checkout' button changes to summary", async () => {
        render(<Routes />, { wrapper: AllProviders });

        // Get order entry element and check wether it is on the document
        const orderEntrySection = screen.getByRole("complementary", { name: "Order Entry section" });
        expect(orderEntrySection).toBeInTheDocument();

        // Add a hot fudge topping
        const checkboxHotFudge = await screen.findByRole("checkbox", { name: /hot fudge/i });
        userEvent.click(checkboxHotFudge);

        // Add a vanilla scoop
        const inputVanilla = await screen.findByRole("spinbutton", { name: /vanilla/i });
        userEvent.clear(inputVanilla);
        userEvent.type(inputVanilla, "1");

        // Press the checkout button
        const checkoutButton = await screen.findByRole("button", { name: /checkout/i });
        userEvent.click(checkoutButton);

        // Try to find summary screen, which would imply everything went correct
        const orderSummarySection = await screen.findByRole("complementary", { name: "Order Summary" });
        expect(orderSummarySection).toBeInTheDocument();
    });

    test("After going filling an order and confirming, next page should thank the user", async () => {
        render(<Routes />, { wrapper: AllProviders });

        // Get order entry element and check wether it is on the document
        const orderEntrySection = screen.getByRole("complementary", { name: "Order Entry section" });
        expect(orderEntrySection).toBeInTheDocument();

        // Add a hot fudge topping
        const checkboxHotFudge = await screen.findByRole("checkbox", { name: /hot fudge/i });
        userEvent.click(checkboxHotFudge);

        // Press the checkout button
        const checkoutButton = await screen.findByRole("button", { name: /checkout/i });
        userEvent.click(checkoutButton);

        // Try to find summary screen, which would imply everything went correct
        const orderSummarySection = await screen.findByRole("complementary", { name: "Order Summary" });
        expect(orderSummarySection).toBeInTheDocument();

        // Get the terms and conditions accept checkbox
        const tcConfirmCheckbox = screen.getByLabelText(/terms and conditions/i);
        userEvent.click(tcConfirmCheckbox);

        // Get the confirm order button and click it
        const orderConfirmButton = screen.getByRole("button", { name: /confirm order/i });
        expect(orderConfirmButton).toBeEnabled();
        userEvent.click(orderConfirmButton);

        // Try to find thank you screen, which would imply everything went correct
        const thankYouSection = await screen.findByRole("complementary", { name: "Thank you page" });
        expect(thankYouSection).toBeInTheDocument();
    });

    test("After completing a full cycle of order, ordering again should reset the counter", async () => {
        render(<Routes />, { wrapper: AllProviders });

        // Get order entry element and check wether it is on the document
        const orderEntrySection = screen.getByRole("complementary", { name: "Order Entry section" });
        expect(orderEntrySection).toBeInTheDocument();

        // Add a hot fudge topping
        const checkboxHotFudge = await screen.findByRole("checkbox", { name: /hot fudge/i });
        userEvent.click(checkboxHotFudge);

        // Press the checkout button
        const checkoutButton = await screen.findByRole("button", { name: /checkout/i });
        userEvent.click(checkoutButton);

        // Try to find summary screen, which would imply everything went correct
        const orderSummarySection = await screen.findByRole("complementary", { name: "Order Summary" });
        expect(orderSummarySection).toBeInTheDocument();

        // Get the terms and conditions accept checkbox
        const tcConfirmCheckbox = screen.getByLabelText(/terms and conditions/i);
        userEvent.click(tcConfirmCheckbox);

        // Get the confirm order button and click it
        const orderConfirmButton = screen.getByRole("button", { name: /confirm order/i });
        expect(orderConfirmButton).toBeEnabled();
        userEvent.click(orderConfirmButton);

        // Try to find thank you screen, which would imply everything went correct
        const thankYouSection = await screen.findByRole("complementary", { name: "Thank you page" });
        expect(thankYouSection).toBeInTheDocument();

        // Click the "order again" button
        const orderAgainButton = screen.getByRole("button", { name: /order again/i });
        userEvent.click(orderAgainButton);

        // Check if order entry is rendered again
        const retryOrderEntrySection = screen.getByRole("complementary", { name: "Order Entry section" });
        expect(retryOrderEntrySection).toBeInTheDocument();

        const scoopSubtotal = await screen.findByText(/Scoops total:\s+\$/i, { exact: false });
        const toppingsSubtotal = await screen.findByText(/Toppings total:\s+\$/i, { exact: false });
        const grandTotal = await screen.findByText(/Order total:\s+\$/i, { exact: false });

        // review they start out $0.00
        expect(scoopSubtotal).toHaveTextContent("0.00");
        expect(toppingsSubtotal).toHaveTextContent("0.00");
        expect(grandTotal).toHaveTextContent("0.00");
    });
});
