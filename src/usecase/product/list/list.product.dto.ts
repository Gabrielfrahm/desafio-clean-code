interface InputListProductDTO {}

type Product = {
  id: string;
  name: string;
  price: number;
};

interface OutPutListProductDTO {
  products: Product[];
}

export { InputListProductDTO, OutPutListProductDTO };
