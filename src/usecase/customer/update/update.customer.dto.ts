interface InputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    city: string;
    zip: string;
    street: string;
    number: number;
  };
}

interface OutputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    city: string;
    zip: string;
    street: string;
    number: number;
  };
}

export { InputUpdateCustomerDTO, OutputUpdateCustomerDTO };
