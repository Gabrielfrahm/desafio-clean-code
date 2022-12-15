import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import {
  InputFindCustomerDTO,
  OutPutFindCustomerDTO,
} from "./find.customer.dto";

class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepositoryInterface: CustomerRepositoryInterface) {
    this.customerRepository = customerRepositoryInterface;
  }

  async execute(input: InputFindCustomerDTO): Promise<OutPutFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    };
  }
}

export { FindCustomerUseCase };
