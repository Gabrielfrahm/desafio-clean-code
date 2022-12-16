import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { ListCustomerUseCase } from "../../../usecase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";

const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDTO = {
      name: req.body.name,
      address: req.body.address,
    };

    const output = await useCase.execute(customerDTO);
    res.send(output).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await useCase.execute({});

    res.send(output).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { customerRoute };
