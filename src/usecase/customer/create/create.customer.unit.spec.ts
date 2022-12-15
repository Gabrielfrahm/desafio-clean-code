import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "Gabriel",
  address: {
    street: "rua",
    city: "indaiatuba",
    number: 15,
    zip: "123456",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe("unit test create customer use case ", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await createCustomerUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: input.address,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "name is required"
    );
  });

  it("should thrown an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    input.name = "Gabriel";
    input.address.street = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
