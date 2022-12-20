import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import { ProductInterface } from "./product.interface";

class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validator();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }

  validator() {
    ProductValidatorFactory.create().validate(this);
  }

  changeName(name: string): void {
    this._name = name;
    this.validator();
  }
  changePrice(price: number): void {
    this._price = price;
    this.validator();
  }
}

export { Product };
