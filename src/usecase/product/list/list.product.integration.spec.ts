import { Sequelize } from "sequelize-typescript";

import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";

import { ListProductUseCase } from "./list.product.usecase";
describe("Test find product use case", () => {
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

  it("should find a product", async () => {
    const repository = new ProductRepository();
    const useCase = new ListProductUseCase(repository);
    const product = ProductFactory.create("product 1", 15);
    const product2 = ProductFactory.create("product 2", 20);

    await repository.create(product);
    await repository.create(product2);

    const output = [
      {
        id: product.id,
        name: product.name,
        price: product.price,
      },
      {
        id: product2.id,
        name: product2.name,
        price: product2.price,
      },
    ];
    const result = await useCase.execute({});
    expect(result.products).toEqual(output);
  });
});
