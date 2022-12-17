import { app, sequelize } from "../express";
import request from "supertest";
describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 15,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(15);
  });

  it("should return status 500 with product error", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });

    expect(response.status).toBe(500);
  });

  it("should lista all product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 20,
    });
    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 30,
    });

    expect(response2.status).toBe(200);
    expect(response.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product = listResponse.body.products[0];
    const product2 = listResponse.body.products[1];

    expect(product.name).toBe("Product 1");
    expect(product2.name).toBe("Product 2");
  });

  it("should update a product", async () => {
    const product = await request(app).post("/product").send({
      name: "Product 1",
      price: 15,
    });

    const response = await request(app).put("/product").send({
      id: product.body.id,
      name: "Product updated",
      price: 20,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product updated");
    expect(response.body.price).toBe(20);
  });

  it("should find a product", async () => {
    const product = await request(app).post("/product").send({
      name: "Product 1",
      price: 15,
    });

    const response = await request(app)
      .get(`/product/${product.body.id}`)
      .send({});

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(15);
  });
});
