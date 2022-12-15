import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository-interface";
import { InputListProductDTO, OutPutListProductDTO } from "./list.product.dto";

class ListProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(_: InputListProductDTO): Promise<OutPutListProductDTO> {
    const products = await this.ProductRepository.findAll();
    return {
      products: products.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
        };
      }),
    };
  }
}

export { ListProductUseCase };
