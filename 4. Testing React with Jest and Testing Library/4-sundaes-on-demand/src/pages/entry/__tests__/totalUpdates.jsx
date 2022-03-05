import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

describe("total amount tests", () => {
    test("subtotal updates when scoops option updates", async () => {
        render(<Options optionType="scoops" label="Scoop" cost={2.0} />, { wrapper: OrderContextProvider });

        // total starts out $0.00
        const scoopSubtotal = await screen.findByText("Scoops total: $", { exact: false });
        expect(scoopSubtotal).toHaveTextContent("0.00");

        // amount sums to $2.00 adding a scoop
        const inputVanilla = await screen.findByRole("spinbutton", { name: /vanilla/i });
        userEvent.clear(inputVanilla);
        userEvent.type(inputVanilla, "1");
        expect(scoopSubtotal).toHaveTextContent("2.00");

        // amount sums to $6.00 adding 2 more scoops
        const inputChocolate = await screen.findByRole("spinbutton", {
            name: /chocolate/i,
        });
        userEvent.clear(inputChocolate);
        userEvent.type(inputChocolate, "2");
        expect(scoopSubtotal).toHaveTextContent("6.00");
    });

    test("subtotal updates when toppings option updates", async () => {
        render(<Options optionType="toppings" label="Toppings" cost={1.5} />, { wrapper: OrderContextProvider });

        // total starts out $0.00
        const toppingsSubtotal = await screen.findByText(/Toppings total:\s+\$/i, { exact: false });
        expect(toppingsSubtotal).toHaveTextContent("0.00");

        // amount sums to $1.50 adding a topping
        const checkboxHotFudge = await screen.findByRole("checkbox", { name: /hot fudge/i });
        userEvent.click(checkboxHotFudge);
        expect(toppingsSubtotal).toHaveTextContent("1.50");

        // amount sums to $3.00 adding 1 more topping
        const inputChocolate = await screen.findByRole("checkbox", { name: /cherries/i });
        userEvent.click(inputChocolate);
        expect(toppingsSubtotal).toHaveTextContent("3.00");
    });

    test("order total updates with both toppings and scoops", async () => {
        render(<OrderEntry />, { wrapper: OrderContextProvider });

        // get subtotals and total
        const scoopSubtotal = await screen.findByText(/Scoops total:\s+\$/i, { exact: false });
        const toppingsSubtotal = await screen.findByText(/Toppings total:\s+\$/i, { exact: false });
        const grandTotal = await screen.findByText(/Order total:\s+\$/i, { exact: false });

        // review they start out $0.00
        expect(scoopSubtotal).toHaveTextContent("0.00");
        expect(toppingsSubtotal).toHaveTextContent("0.00");
        expect(grandTotal).toHaveTextContent("0.00");

        // grand total updates to $1.50 when adding a topping
        const checkboxHotFudge = await screen.findByRole("checkbox", { name: /hot fudge/i });
        userEvent.click(checkboxHotFudge);
        expect(grandTotal).toHaveTextContent("1.50");

        // grand total updates to $3.50 when adding a scoop
        const inputVanilla = await screen.findByRole("spinbutton", { name: /vanilla/i });
        userEvent.clear(inputVanilla);
        userEvent.type(inputVanilla, "1");
        expect(grandTotal).toHaveTextContent("3.50");
    });
});
