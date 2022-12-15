class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this.validate();
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("id is required");
    }
    if (this._name.length === 0) {
      throw new Error("name is required");
    }
    if (this._productId.length === 0) {
      throw new Error("productId is required");
    }
    if (this._price <= 0) {
      throw new Error("price must be more than 0");
    }
    if (this._quantity <= 0) {
      throw new Error("quantity must be less or equal than 0");
    }
    return true;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}

export { OrderItem };
