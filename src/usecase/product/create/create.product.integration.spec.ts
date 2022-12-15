import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";

import { CreateProductUseCase } from "./create.product.usecase";
describe("Test create product use case", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);
    const product = new Product("123", "product 1", 15);

    const productCreated = await useCase.execute(product);

    const findProduct = await repository.find(productCreated.id);

    expect({
      id: findProduct.id,
      name: findProduct.name,
      price: findProduct.price,
    }).toEqual({
      id: productCreated.id,
      name: productCreated.name,
      price: productCreated.price,
    });
  });
});
