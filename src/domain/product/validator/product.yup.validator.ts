import { ValidatorInterface } from "../../@shared/validation/validator.interface";

import * as yup from "yup";
import { Product } from "../entity/product";

class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("id is required"),
          name: yup.string().required("name is required"),
          price: yup
            .number()
            .moreThan(0)
            .required("price must be greater than zero"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (err) {
      const e = err as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}

export { ProductYupValidator };
