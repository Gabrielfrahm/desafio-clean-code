import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "john",
  new Address("Street", 15, "123", "city")
);

const input = {
  id: customer.id,
  name: "john updated ",
  address: {
    city: "city updated",
    zip: "123 updated",
    street: "Street updated",
    number: 16,
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe("unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
    const output = await updateCustomerUseCase.execute(input);
    expect(output).toEqual(input);
  });
});
