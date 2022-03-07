import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";

import { rest } from "msw";
import { server } from "../../../mocks/server";
import { OrderContextProvider } from "../../../contexts/OrderContext";

describe("OrderEntry component", () => {
    test("Error alert is shown when axios throws", async () => {
        server.resetHandlers(rest.get("http://localhost:3030/scoops"), (req, res, ctx) => {
            res(ctx.status(500));
        });
        server.resetHandlers(rest.get("http://localhost:3030/toppings"), (req, res, ctx) => {
            res(ctx.status(500));
        });

        render(<OrderEntry />, { wrapper: OrderContextProvider });

        const alerts = await screen.findAllByRole("alert", {
            name: /unexpected error/i,
        });
        expect(alerts).toHaveLength(2);
    });
});
