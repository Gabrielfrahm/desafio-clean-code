import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";

import { UpdateProductUseCase } from "./update.product.usecase";
describe("Test update product use case", () => {
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

  it("should update a customer", async () => {
    const repository = new ProductRepository();

    const useCase = new UpdateProductUseCase(repository);
    const product = ProductFactory.create("product 1", 15);

    const input = {
      id: product.id,
      name: "Product updated",
      price: 20,
    };

    await repository.create(product);
    const productUpdated = await useCase.execute(input);

    const findProduct = await repository.find(productUpdated.id);

    expect({
      id: findProduct.id,
      name: findProduct.name,
      price: findProduct.price,
    }).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    });
  });
});
