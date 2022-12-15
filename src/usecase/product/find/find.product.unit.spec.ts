import { Product } from "../../../domain/product/entity/product";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("123", "Product 1", 15);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe("unit test Product use case", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product 1",
      price: 15,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not found a product", async () => {
    const repository = MockRepository();
    repository.find.mockImplementation(() => {
      throw new Error("product not found");
    });
    const useCase = new FindProductUseCase(repository);

    const input = {
      id: "123",
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("product not found");
  });
});
