interface InputListCustomerDTO {}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
};

interface OutputListCustomerDTO {
  customers: Customer[];
}

export { InputListCustomerDTO, OutputListCustomerDTO };
