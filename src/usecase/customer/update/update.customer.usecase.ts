import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import { Address } from "../../../domain/customer/value-object/address";
import { OutPutFindCustomerDTO } from "../find/find.customer.dto";
import { InputUpdateCustomerDTO } from "./update.customer.dto";

class UpdateCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface;

  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(input: InputUpdateCustomerDTO): Promise<OutPutFindCustomerDTO> {
    const customer = await this.CustomerRepository.find(input.id);
    customer.changeName(input.name);
    customer.Address = new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city
    );
    await this.CustomerRepository.update(customer);
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

export { UpdateCustomerUseCase };
