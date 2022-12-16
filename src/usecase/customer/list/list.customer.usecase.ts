import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository-interface";
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from "./list.customer.dto";

class ListCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface;

  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(_: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.CustomerRepository.findAll();
    return {
      customers: customers.map((item) => {
        return {
          id: item.id,
          name: item.name,
          address: item.address,
        };
      }),
    };
  }
}

export { ListCustomerUseCase };
