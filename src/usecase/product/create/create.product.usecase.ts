import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import {
  InputCreateProductDTO,
  OutPutCreateProductDTO,
} from "./create.product.dto";

class CreateProductUseCase {
  private ProductRepository: ProductRepositoryInterface;

  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(input: InputCreateProductDTO): Promise<OutPutCreateProductDTO> {
    const product = ProductFactory.create(input.name, input.price);
    await this.ProductRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}

export { CreateProductUseCase };
