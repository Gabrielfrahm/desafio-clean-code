interface InputFindCustomerDTO {
  id: string;
}

interface OutPutFindCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export { InputFindCustomerDTO, OutPutFindCustomerDTO };
