import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 15,
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

describe("unit test create product use case ", () => {
  it("should create a product", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);

    input.name = "";
    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "name is required"
    );
  });
});
