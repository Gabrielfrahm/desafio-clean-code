import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create("product 1", 15);

const input = {
  id: product.id,
  name: "product 1",
  price: 15,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe("unit test update product use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(repository);
    const output = await updateProductUseCase.execute(input);
    expect(output).toEqual(input);
  });
});
