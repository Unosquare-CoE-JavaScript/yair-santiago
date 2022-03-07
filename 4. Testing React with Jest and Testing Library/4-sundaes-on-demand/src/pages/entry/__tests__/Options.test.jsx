import { render, screen } from "@testing-library/react";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Options from "../Options";

describe("Options component for Entry", () => {
    test("display image for each scoop option from the server", async () => {
        render(<Options optionType="scoops" />, { wrapper: OrderContextProvider });

        // find images
        const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
        expect(scoopImages).toHaveLength(2);

        // confirm alt text of images
        const altText = scoopImages.map((el) => el.alt);
        expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
    });

    test("display image for each toppings option from the server", async () => {
        render(<Options optionType="toppings" />, { wrapper: OrderContextProvider });

        // find images
        const toppingImages = await screen.findAllByRole("img", {
            name: /topping$/i,
        });
        expect(toppingImages).toHaveLength(3);

        // confirm alt text of images
        const altText = toppingImages.map((el) => el.alt);
        expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
    });
});
