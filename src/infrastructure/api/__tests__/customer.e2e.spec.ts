import { app, sequelize } from "../express";
import request from "supertest";
describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Gabriel",
        address: {
          street: "Street",
          city: "City",
          zip: "1234567",
          number: 15,
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Gabriel");
    expect(response.body.address.street).toBe("Street");
  });

  it("should return status 500 with customer error", async () => {
    const response = await request(app).post("/customer").send({
      name: "Gabriel",
    });

    expect(response.status).toBe(500);
  });

  it("should lista all customers", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Gabriel",
        address: {
          street: "Street",
          city: "City",
          zip: "1234567",
          number: 15,
        },
      });
    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Monica",
        address: {
          street: "Street 2 ",
          city: "City",
          zip: "1234568",
          number: 18,
        },
      });

    expect(response2.status).toBe(200);
    expect(response.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer = listResponse.body.customers[0];
    const customer2 = listResponse.body.customers[1];

    expect(customer.name).toBe("Gabriel");
    expect(customer2.name).toBe("Monica");
  });
});
