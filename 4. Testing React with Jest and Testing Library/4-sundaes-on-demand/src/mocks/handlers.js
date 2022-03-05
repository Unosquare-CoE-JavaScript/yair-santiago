import { rest } from "msw";

export const handlers = [
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: "Chocolate",
                    imagePath: "/images/chocolate.jpg",
                },
                {
                    name: "Vanilla",
                    imagePath: "/images/Vanilla.jpg",
                },
            ])
        );
    }),

    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: "Cherries",
                    imagePath: "/images/cherries.png",
                },
                {
                    name: "M&Ms",
                    imagePath: "/images/m-and-ms.png",
                },
                {
                    name: "Hot fudge",
                    imagePath: "/images/hot-fudge.png",
                },
            ])
        );
    }),
];
