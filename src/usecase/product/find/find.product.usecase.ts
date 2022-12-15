import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { InputFindProductDTO, OutPutFindProductDTO } from "./find.product.dto";

class FindProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(input: InputFindProductDTO): Promise<OutPutFindProductDTO> {
    const product = await this.ProductRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}

export { FindProductUseCase };
