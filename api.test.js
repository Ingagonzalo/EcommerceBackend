import { expect } from "chai";
import supertest from "supertest";

let request;
let createdProduct
let getProducts;

const product = {
    title: "motherboard",
    thumbnail: "https://mla-s1-p.mlstatic.com/971557-MLA46012928724_052021-F.jpg",
    price: 72978
}

describe("Test over RESTFULL API", () => {
    before(() => {
        request = supertest("http://localhost:3000");
    });

    describe("- POST /api/test", async () => {

        it("Should response with 201 status code", async () => {
            const response = await request.post("/api/test").send(product);

            createdProduct = response.body;

            expect(response.status).to.eql(201);
        });

        it("Response should have title, price and thumbnail", () => {
            expect(createdProduct).to.keys("title", "price", "thumbnail", "__v", "_id");
        });

        it("Should return created product", () => {
            expect(createdProduct.title).to.eql(product.title);
            expect(createdProduct.thumbnail).to.eql(product.thumbnail);
        });
    });

    describe("- GET /api/test", async () => {
        it("Should return 200 status code", async () => {
            const response = await request
                .get("/api/test")

            getProducts = response.body;

            expect(response.status).to.eql(200);
        });

        it("Response should have an array of objects with title, price and thumbnail", () => {
            expect(Array.isArray(getProducts)).to.be.true;
            expect(getProducts.every(product => "title" in product && "price" in product && "thumbnail" in product)).to.be.true;
        });
    });

    describe("- PUT /api/test", async () => {
        let response
        it("Should response with 200 status code", async () => {
            response = await request.put("/api/test/642dbc0c7a6adc0842ea6b4d").send(product);

            expect(response.status).to.eql(200);
        });

        it("Should response with the text producto actualizado", async () => {

            expect(response.text).to.eql("producto actualizado");
        });
    });

    describe("- DELETE /api/test", async () => {
        let response
        it("Should response with 200 status code", async () => {
            response = await request.delete("/api/test/642dc519fa26755214c108f3");

            expect(response.status).to.eql(200);
        });

        it("Should response with the text producto eliminado", async () => {

            expect(response.text).to.eql("producto eliminado");
        });
    });

    describe("- GET Unknown", () => {
        it("Should return 404 status code", async () => {
            const response = await request.get("/asdasd");

            expect(response.status).to.eql(404);
        });
    });
});