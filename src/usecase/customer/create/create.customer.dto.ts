interface InputCreateCustomerDTO {
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

interface OutputCreateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export { InputCreateCustomerDTO, OutputCreateCustomerDTO };
